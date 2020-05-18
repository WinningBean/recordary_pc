package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleResponseDto;
import com.fairy_pitt.recordary.endpoint.main.S3UploadComponent;
import com.fairy_pitt.recordary.endpoint.user.dto.UserLoginRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserUpdateRequestDto;
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

        userEntity.update(hashedPassword, requestDto.getUserNm(), requestDto.getUserPic(), requestDto.getUserEx());
        return userCd;
    }

    @Transactional
    public String profileUpload(Long userCd, MultipartFile userPic) throws IOException {
        String imgPath;

        if (userPic.isEmpty()) imgPath = null;
        else imgPath = s3UploadComponent.profileUpload(userPic, "user", userCd);

        log.info(imgPath);

        return imgPath;
    }

    @Transactional
    public void delete(Long userCd){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserCd(userCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. cd = " + userCd));

        userRepository.delete(userEntity);
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

        Boolean userState = checkPw(requestDto);
        if (userState){
            httpSession.setAttribute("loginUser", userEntity.getUserCd());
            log.info("set userCd = {}", httpSession.getAttribute("loginUser"));
            return new UserResponseDto(userEntity);
        }else return null;
    }

    @Transactional(readOnly = true)
    public Boolean logout(){
        httpSession.removeAttribute("loginUser");
        return (httpSession.getAttribute("loginUser") == null);
    }

    @Transactional(readOnly = true)
    public UserEntity currentUser(){
        return findEntity(String.valueOf(httpSession.getAttribute("loginUser")));
    }

    @Transactional(readOnly = true)
    public Long currentUserCd(){
        return Long.parseLong(String.valueOf(httpSession.getAttribute("loginUser")));
    }

    @Transactional(readOnly = true)
    public UserEntity findEntity(String userId){
        return userRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public UserResponseDto findById(String userId){
        UserEntity userEntity = userRepository.findByUserId(userId);
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

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findUserSchedules(Long userCd)
    {
        return userRepository.findByUserCd(userCd).getUserScheduleList().stream()
                .map(ScheduleResponseDto::new)
                .collect(Collectors.toList());
    }
}

