package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.endpoint.follower.dto.FollowerRequestDto;
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

    @PostMapping("/follow")
    public Boolean follow(@RequestBody FollowerRequestDto requestDto){
        return followerService.save(requestDto);
    }

    @DeleteMapping("/unFollow")
    public Boolean unFollow(@RequestBody FollowerRequestDto requestDto){
        return followerService.delete(requestDto);
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

    @GetMapping("/followEachOther/{userCd}/{targetCd}")
    public Boolean followEachOther(@PathVariable("userCd") Long userCd, @PathVariable("targetCd") Long targetCd){
        return followerService.followEachOther(userCd, targetCd);
    }

    @GetMapping("/followState/search")
    public List<FollowerStateResponseDto> findNmUser(@RequestParam(value = "input") String inputNm){
        return followerService.followState(inputNm);
    }
}