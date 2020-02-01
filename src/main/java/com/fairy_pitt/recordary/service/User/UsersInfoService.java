package com.fairy_pitt.recordary.service.User;

import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersInfoService {
    @Autowired private UsersRepository usersRepository;
    @Autowired private UserPasswordHashService userPasswordHashService;
    public Users search(String userSearch){
        Users user = usersRepository.findByUserNm(userSearch);
        return user;
    }
}
