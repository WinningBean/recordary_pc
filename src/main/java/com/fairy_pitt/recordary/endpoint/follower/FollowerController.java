package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@RestController
@Transactional
public class FollowerController {
    @Autowired private HttpSession session;
    @Autowired private FollowerService followerService;

    @GetMapping("/{targetId}/follow")
    public Map<String, Boolean> follow(@PathVariable("targetId") String targetId){
        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        Map<String, Boolean> map = new HashMap<>();
        map.put("is_follow", followerService.create(currentUser, targetId));
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
