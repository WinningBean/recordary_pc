package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class FollowerController {
    @Autowired private HttpSession session;
    @Autowired private UserRepository userRepository;
    @Autowired private FollowerService followerService;

    @Transactional
    @GetMapping("/{targetId}/follow")
    public Map<String, Boolean> follow(@PathVariable("targetId") String targetId){
        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        Map<String, Boolean> map = new HashMap<>();
        map.put("isFollow", followerService.create(currentUser, targetId));
        return map;
    }

    @Transactional
    @GetMapping("/{targetId}/unFollow")
    public Map<String, Boolean> unFollow(@PathVariable("targetId") String targetId){
        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        Map<String, Boolean> map = new HashMap<>();
        map.put("isUnFollow", followerService.delete(currentUser, targetId));
        return map;
    }
}
