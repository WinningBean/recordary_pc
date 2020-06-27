package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostLikeService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostLikeController {

    private final PostLikeService postLikeService;
    private final UserService userService;

    @PostMapping("/{postCd}/like")
    public Boolean postLike(@PathVariable Long postCd, @RequestBody Long userCd){
        userService.checkSessionLogout();
        return postLikeService.save(postCd, userCd);
    }

    @DeleteMapping("/{postCd}/unLike")
    public Boolean postUnLike(@PathVariable Long postCd, @RequestParam Long userCd){
        userService.checkSessionLogout();
        return postLikeService.delete(postCd, userCd);
    }

    @GetMapping("/{postCd}/likeUser")
    public List<UserResponseDto> postLikeUser(@PathVariable Long postCd){
        userService.checkSessionLogout();
        return postLikeService.postLikeUser(postCd);
    }

    @GetMapping("/{userCd}/likePost")
    public List<PostResponseDto> userLikePost(@PathVariable Long userCd){
        userService.checkSessionLogout();
        return postLikeService.userLikePost(userCd);
    }
}
