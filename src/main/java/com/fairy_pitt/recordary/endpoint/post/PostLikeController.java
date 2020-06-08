package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostLikeService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostLikeController {

    private final PostLikeService postLikeService;

    @PostMapping("/{postCd}/like")
    public Boolean postLike(@PathVariable Long postCd, @RequestBody Long userCd){
        return postLikeService.save(postCd, userCd);
    }

    @DeleteMapping("/{postCd}/unLike")
    public Long postUnLike(@PathVariable Long postCd, @RequestParam Long userCd){
        postLikeService.delete(postCd, userCd);
        return postCd;
    }

    @GetMapping("/{postCd}/likeUser")
    public List<UserResponseDto> postLikeUser(@PathVariable Long postCd){
        return postLikeService.postLikeUser(postCd);
    }

    @GetMapping("/{userCd}/likePost")
    public List<PostResponseDto> userLikePost(@PathVariable Long userCd){
        return postLikeService.userLikePost(userCd);
    }
}
