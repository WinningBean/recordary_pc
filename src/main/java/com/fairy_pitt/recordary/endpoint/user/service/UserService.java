package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@RequiredArgsConstructor
@Slf4j
@Transactional
@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private UserPasswordHashService userPasswordHashService;
    @Autowired private HttpSession session;

    public Boolean joinUser(String userId, String userPw, String userNm){

        if (userId.equals("") || userPw.equals("") || userNm.equals("")) return false;

        UserEntity user = new UserEntity();
        user.setUserId(userId);
        user.setUserPw(userPasswordHashService.getSHA256(userPw));
        user.setUserNm(userNm);

        userRepository.save(user);
        return true;
    }

    public Boolean possibleId(String input_id){
        if (userRepository.findByUserId(input_id) == null) return true;
        return false;
    }

    public Boolean login(String userId, String userPw){
        if (userId.equals("") || userPw.equals("")) return false;

        String hashedPassword = userPasswordHashService.getSHA256(userPw);
        UserEntity user = userRepository.findByUserIdAndUserPw(userId, hashedPassword);
        if (user == null) return false;

        session.setAttribute("loginUser", user);
        log.info("set userId = {}", user.getUserId());

        return true;
    }

    public Map<String, Object> userInfo(String userId){
        UserEntity user = userRepository.findByUserId(userId);
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("user_id", user.getUserId());
        userMap.put("user_nm", user.getUserNm());
        userMap.put("user_pic", null);
        userMap.put("user_ex", user.getUserEx());
        return userMap;
    }

    public Boolean checkPw(UserEntity user, String userPw){
        UserEntity checkUser = userRepository.findByUserPw(userPasswordHashService.getSHA256(userPw));
        return user.getUserCd().equals(checkUser.getUserCd());
    }

    public void updateNm(UserEntity user, String userNm) {
        user.setUserNm(userNm);
        userRepository.save(user);
    }

    public void updatePw(UserEntity user, String userPw){
        user.setUserPw(userPasswordHashService.getSHA256(userPw));
        userRepository.save(user);
    }

    public void updateEx(UserEntity user, String useEx){
        user.setUserEx(useEx);
        userRepository.save(user);
    }

    public void delete(UserEntity user) {
        userRepository.delete(user);
    }

    public List<UserEntity> search(String userSearch){
       return userRepository.findAllByUserNmLike("%"+userSearch+"%");
    }

    public UserEntity find(Long cd){
        return userRepository.findByUserCd(cd);
    }

    public UserEntity findById(String userId){return  userRepository.findByUserId(userId);}
}
