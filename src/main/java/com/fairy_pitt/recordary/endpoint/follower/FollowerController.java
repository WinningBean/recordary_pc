package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserListResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@RequiredArgsConstructor
@RestController
public class FollowerController {
    private final FollowerService followerService;

    @GetMapping("/{targetId}/follow")
    public Boolean follow(@PathVariable("targetId") String targetId){
        return followerService.save(targetId);
    }

    @DeleteMapping("/{targetId}/unFollow")
    public String unFollow(@PathVariable("targetId") String targetId){
        followerService.delete(targetId);
        return targetId;
    }

    @GetMapping("/{userId}/follower")
    public List<UserListResponseDto> followerList(@PathVariable("userId") String userId){
        return followerService.followerList(userId);
    }

    @GetMapping("/{userId}/following")
    public List<UserListResponseDto> followingList(@PathVariable("userId") String userId){
        return followerService.followingList(userId);
    }

    @GetMapping("/{userId}/friends")
    public List<UserResponseDto> friends(@PathVariable("userId") String userId){
        return followerService.friends(userId);
    }
}