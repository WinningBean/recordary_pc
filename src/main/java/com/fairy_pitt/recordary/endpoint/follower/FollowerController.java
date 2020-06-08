package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.endpoint.follower.dto.FollowerStateResponseDto;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
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

    @PostMapping("/follow/{userCd}")
    public Boolean follow(@PathVariable Long userCd, @RequestBody Long targetCd){
        return followerService.save(userCd, targetCd);
    }

    @DeleteMapping("/unFollow/{userCd}")
    public Boolean unFollow(@PathVariable Long userCd, @RequestParam Long targetCd){
        return followerService.delete(userCd, targetCd);
    }

    @GetMapping("/follower/{userCd}")
    public List<UserResponseDto> followerList(@PathVariable Long userCd){
        return followerService.followerList(userCd);
    }

    @GetMapping("/following/{userCd}")
    public List<UserResponseDto> followingList(@PathVariable Long userCd){
        return followerService.followingList(userCd);
    }

    @GetMapping("/friends/{userCd}")
    public List<UserResponseDto> friends(@PathVariable Long userCd){
        return followerService.friends(userCd);
    }

    @GetMapping("/followEachOther/{userCd}/{targetCd}")
    public Boolean followEachOther(@PathVariable Long userCd, @PathVariable Long targetCd){
        return followerService.followEachOther(userCd, targetCd);
    }

    @GetMapping("/followState/search")
    public List<FollowerStateResponseDto> findNmUser(@RequestParam(value = "input") String inputNm){
        return followerService.followState(inputNm);
    }
}