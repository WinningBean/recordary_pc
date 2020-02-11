package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
public class FollowerController {
    @Autowired private HttpSession session;
    @Autowired private FollowerService followerService;

    @GetMapping("/{targetFK}/follow")
    public Map<String, Boolean> follow(@PathVariable("targetFK") Long targetFK){
        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        Map<String, Boolean> map = new HashMap<>();
        map.put("is_follow", followerService.create(currentUser, targetFK));
        return map;
    }

    @GetMapping("/{targetFK}/unFollow")
    public Map<String, Boolean> unFollow(@PathVariable("targetFK") Long targetFK){
        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        Map<String, Boolean> map = new HashMap<>();
        map.put("is_unFollow", followerService.delete(currentUser, targetFK));
        return map;
    }
}
