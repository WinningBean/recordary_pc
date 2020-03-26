package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public String update(String userId, UserUpdateRequestDto requestDto){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserId(userId))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id = " + userId));

        String hashedPassword = userPasswordHashService.getSHA256(requestDto.getUserPw());
        userEntity.update(hashedPassword, requestDto.getUserNm(), requestDto.getUserEx());
        return userId;
    }

    @Transactional
    public void delete(String userId){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserId(userId))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id = " + userId));

        userRepository.delete(userEntity);
    }

    @Transactional(readOnly = true)
    public Boolean possibleId(String inputId){
        return !Optional.ofNullable(userRepository.findByUserId(inputId)).isPresent();
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
            httpSession.setAttribute("loginUser", userEntity.getUserId());
            log.info("set userId = {}", httpSession.getAttribute("loginUser"));
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
    public String currentUserId(){
        return String.valueOf(httpSession.getAttribute("loginUser"));
    }

    @Transactional(readOnly = true)
    public UserEntity findEntity(String userId){
        return userRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public UserResponseDto findById(String userId){
        UserEntity userEntity = Optional.ofNullable(userRepository.findByUserId(userId))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id = " + userId));

        return new UserResponseDto(userEntity);
    }

    @Transactional(readOnly = true)
    public List<UserListResponseDto> findNmUser(String findNm){
        return userRepository.findAllByUserNmLike("%"+findNm+"%").stream()
                .map(UserListResponseDto::new)
                .collect(Collectors.toList());
    }
}
