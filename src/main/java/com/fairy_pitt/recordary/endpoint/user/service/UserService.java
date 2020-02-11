package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//@RequiredArgsConstructor
@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private UserPasswordHashService userPasswordHashService;

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
//        if (user == null) return;
        userRepository.delete(user);
    }

    public List<UserEntity> search(String userSearch){
       return userRepository.findByUserNmLike("%"+userSearch+"%");
    }
}
