package com.fairy_pitt.recordary.service.User;

import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Service
public class JoinService {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserPasswordHashService userPasswordHashService;

    public Boolean joinUser(String userId, String userPw, String userNm){

        if (userId.equals("") || userPw.equals("") || userNm.equals("")) return false;

        Users user = new Users();
        user.setUserId(userId);
        user.setUserPw(userPasswordHashService.getSHA256(userPw));
        user.setUserNm(userNm);

        usersRepository.save(user);
        return true;
    }

    public Boolean possibleId(String input_id){
        if (usersRepository.findByUserId(input_id) == null) return true;
        return false;
    }
}
