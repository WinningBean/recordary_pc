package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//@RequiredArgsConstructor
@Service
public class UserInfoService {
    @Autowired private UserRepository userRepository;
    @Autowired private UserPasswordHashService userPasswordHashService;

    public void update(Long userCd, String userNm, String userPw, String userEx) {
        UserEntity user = userRepository.findByUserCd(userCd);

        if (user == null) return;

        user.setUserNm(userNm);
        user.setUserPw(userPasswordHashService.getSHA256(userPw));
        user.setUserEx(userEx);
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
