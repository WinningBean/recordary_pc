package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.endpoint.follower.dto.FollowerStateResponseDto;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@RestController
public class FollowerController {
    private final FollowerService followerService;

    @GetMapping("/follow/{targetCd}")
    public Boolean follow(@PathVariable("targetCd") Long targetCd){
        return followerService.save(targetCd);
    }

    @DeleteMapping("/unFollow/{targetCd}")
    public Boolean unFollow(@PathVariable("targetCd") Long targetCd){
        return followerService.delete(targetCd);
    }

    @GetMapping("/follower/{userCd}")
    public List<UserResponseDto> followerList(@PathVariable("userCd") Long userCd){
        return followerService.followerList(userCd);
    }

    @GetMapping("/following/{userCd}")
    public List<UserResponseDto> followingList(@PathVariable("userCd") Long userCd){
        return followerService.followingList(userCd);
    }

    @GetMapping("/friends/{userCd}")
    public List<UserResponseDto> friends(@PathVariable("userCd") Long userCd){
        return followerService.friends(userCd);
    }

    @GetMapping("followEachOther/{userCd}/{targetCd}")
    public Boolean followEachOther(@PathVariable("userCd") Long userCd, @PathVariable("targetCd") Long targetCd){
        return followerService.followEachOther(userCd, targetCd);
    }

    @GetMapping("followState/search/{inputNm}")
    public List<FollowerStateResponseDto> findNmUser(@PathVariable("inputNm") String inputNm){
        return followerService.followState(inputNm);
    }
}