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

    @GetMapping("/{postCd}/like")
    public Boolean postLike(@PathVariable Long postCd){
        return postLikeService.save(postCd);
    }

    @DeleteMapping("/{postCd}/unLike")
    public Long postUnLike(@PathVariable Long postCd){
        postLikeService.delete(postCd);
        return postCd;
    }

    @GetMapping("/{postCd}/likeUser")
    public List<UserResponseDto> postLikeUser(@PathVariable Long postCd){
        return postLikeService.postLikeUser(postCd);
    }

    @GetMapping("/like/{userId}")
    public List<PostResponseDto> userLikePost(@PathVariable String userId){
        return postLikeService.userLikePost(userId);
    }
}
