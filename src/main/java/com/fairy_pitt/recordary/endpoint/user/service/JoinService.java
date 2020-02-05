package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JoinService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPasswordHashService userPasswordHashService;

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
}
