package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.domain.PostEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.*;
import com.fairy_pitt.recordary.endpoint.main.S3UploadComponent;
import com.fairy_pitt.recordary.endpoint.user.dto.*;
import com.fairy_pitt.recordary.handler.WebSocketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserPasswordHashService userPasswordHashService;
    private final HttpSession httpSession;
    private final S3UploadComponent s3UploadComponent;

    private final FollowerRepository followerRepository;
    private final PostRepository postRepository;
    private final MediaRepository mediaRepository;
    private final ScheduleRepository scheduleRepository;

    private final WebSocketHandler webSocketHandler;

    @Transactional
    public Boolean save(UserSaveRequestDto requestDto){
        UserSaveRequestDto userSaveRequestDto = UserSaveRequestDto.builder()
                .userId(requestDto.getUserId())
                .userPw(userPasswordHashService.getSHA256(requestDto.getUserPw()))
                .userNm(requestDto.getUserNm())
                .build();
        return Optional.ofNullable(userRepository.save(userSaveRequestDto.toEntity())).isPresent();
    }

    @Transactional
    public Long update(Long userCd, UserUpdateRequestDto requestDto){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserCd(userCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. cd = " + userCd));

        String hashedPassword;
        if (requestDto.getUserPw() == null) hashedPassword = null;
        else hashedPassword = userPasswordHashService.getSHA256(requestDto.getUserPw());

        userEntity.update(hashedPassword, requestDto.getUserNm(), requestDto.getUserEx());
        return userCd;
    }

    @Transactional
    public String profileUpload(Long userCd, MultipartFile userPic) throws IOException {
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserCd(userCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. cd = " + userCd));
        String imgPath;

        if (userPic.isEmpty()) imgPath = null;
        else {
            if (!userEntity.getUserPic().equals("user/basic.png")) {
                s3UploadComponent.delete(userEntity.getUserPic());
            }
            imgPath = s3UploadComponent.profileUpload(userPic, "user", userCd);
        }

        userEntity.updateProfile(imgPath);
        return userEntity.getProfilePath();
    }

    private void deleteOnlyUserPossession(UserEntity user){
        s3UploadComponent.profileDelete("user", user.getUserPic()); // 사용자 프로필

        List<PostEntity> onlyUserPostList = user.getPostList().stream()
                .filter(p -> p.getGroupFK() == null)
                .collect(Collectors.toList());
        for (PostEntity postEntity : onlyUserPostList) {
            mediaRepository.delete(postEntity.getMediaFK()); // 오직 사용자의 미디어
            postRepository.delete(postEntity); // 오직 사용자의 포스트
        }

        List<ScheduleEntity> onlyUserScheduleList = user.getScheduleList().stream()
                .filter(s -> s.getGroupFK() == null)
                .collect(Collectors.toList());
        for (ScheduleEntity scheduleEntity : onlyUserScheduleList){
            scheduleRepository.delete(scheduleEntity); // 오직 사용자의 일정
        }
    }

    @Transactional
    public Boolean delete(Long userCd){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserCd(userCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. cd = " + userCd));

        deleteOnlyUserPossession(userEntity);
        userRepository.delete(userEntity);
        return !Optional.ofNullable(this.findEntity(userCd)).isPresent();
    }

    @Transactional(readOnly = true)
    public UserProfileResponseDto getProfile(String userId){
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) return null;

        UserProfileResponseDto userProfileResponseDto = new UserProfileResponseDto(userEntity);
        if (followerRepository.findByUserFKAndTargetFK(currentUser(), userEntity) != null) {
            userProfileResponseDto.setTrueUserFollowTarget(true);
        }
        if (followerRepository.findByUserFKAndTargetFK(userEntity, currentUser()) != null) {
            userProfileResponseDto.setTrueTargetFollowUser(true);
        }
        return userProfileResponseDto;
    }

    @Transactional(readOnly = true)
    public Boolean existId(String inputId){
        return Optional.ofNullable(userRepository.findByUserId(inputId)).isPresent();
    }

    @Transactional(readOnly = true)
    public Boolean checkPw(UserLoginRequestDto requestDto){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserId(requestDto.getUserId()))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id = " + requestDto.getUserId()));

        String hashedPassword = userPasswordHashService.getSHA256(requestDto.getUserPw());
        return userEntity.getUserPw().equals(hashedPassword);
    }

    @Transactional(readOnly = true)
    public UserResponseDto login(UserLoginRequestDto requestDto){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserId(requestDto.getUserId()))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id = " + requestDto.getUserId()));

        if (checkPw(requestDto)){
            if (!webSocketHandler.checkLoginUser(userEntity.getUserCd())) {
                webSocketHandler.addLoginUser(userEntity.getUserCd(), httpSession.getId());
            }
            else {
                webSocketHandler.replaceLoginUser(userEntity.getUserCd(), httpSession.getId());
                webSocketHandler.notice_TRY_SOMEONE_LOGIN(userEntity.getUserCd());
            }
            httpSession.setAttribute("loginUser", userEntity.getUserCd());
            log.info("set userCd = {}", httpSession.getAttribute("loginUser"));
            return new UserResponseDto(userEntity);
        }else return null;
    }

    @Transactional(readOnly = true)
    public Boolean logout(Long userCd){
        httpSession.removeAttribute("loginUser");
        httpSession.invalidate();
        webSocketHandler.removeLoginUser(userCd);
        return (httpSession.getAttribute("loginUser") == null);
    }

    @Transactional(readOnly = true)
    public Long currentUserCd(){
        if (httpSession.getAttribute("loginUser") != null) return Long.parseLong(String.valueOf(httpSession.getAttribute("loginUser")));
        return null;
    }

    @Transactional(readOnly = true)
    public UserEntity currentUser(){
        return findEntity(currentUserCd());
    }

    @Transactional(readOnly = true)
    public UserResponseDto currentUserInfo(){
        UserEntity userEntity = currentUser();
        if (userEntity != null) return new UserResponseDto(userEntity);
        return null;
    }

    @Transactional(readOnly = true)
    public Boolean checkSessionLogout(){
        if (currentUserCd() == null) {
            if (webSocketHandler.checkLoginUser(httpSession.getId())){
                webSocketHandler.notice_AUTO_LOGOUT(webSocketHandler.checkSessionId(httpSession.getId()));
                return false;
            }
        }
        return true;
    }

    @Transactional(readOnly = true)
    public UserEntity findEntity(String userId){
        return userRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public UserResponseDto findByCd(Long userCd){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserCd(userCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. cd = " + userCd));

        if (userEntity == null) return null;
        return new UserResponseDto(userEntity);
    }

    @Transactional(readOnly = true)
    public UserResponseDto findById(String userId){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserId(userId))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id = " + userId));

        if (userEntity == null) return null;
        return new UserResponseDto(userEntity);
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> findNmUser(String findNm){
        return userRepository.findAllByUserNmLike("%"+findNm+"%").stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserEntity findEntity(Long userCd) {
        return userRepository.findByUserCd(userCd);
    }
}

