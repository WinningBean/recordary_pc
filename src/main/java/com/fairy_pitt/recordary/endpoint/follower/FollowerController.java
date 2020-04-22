package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserListResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@RestController
public class FollowerController {
    private final FollowerService followerService;

    @GetMapping("/follow/{targetId}")
    public Boolean follow(@PathVariable("targetId") String targetId){
        return followerService.save(targetId);
    }

    @DeleteMapping("/unFollow/{targetId}")
    public Boolean unFollow(@PathVariable("targetId") String targetId){
        return followerService.delete(targetId);
    }

    @GetMapping("/follower/{userId}")
    public List<UserListResponseDto> followerList(@PathVariable("userId") String userId){
        return followerService.followerList(userId);
    }

    @GetMapping("/following/{userId}")
    public List<UserListResponseDto> followingList(@PathVariable("userId") String userId){
        return followerService.followingList(userId);
    }

    @GetMapping("/friends/{userId}")
    public List<UserResponseDto> friends(@PathVariable("userId") String userId){
        return followerService.friends(userId);
    }

    @GetMapping("followEachOther/{userId}/{targetId}")
    public Boolean followEachOther(@PathVariable("userId") String userId, @PathVariable("targetId") String targetId){
        return followerService.followEachOther(userId, targetId);
    }
}