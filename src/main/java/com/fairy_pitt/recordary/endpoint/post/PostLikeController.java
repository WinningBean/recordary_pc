package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostListResponseDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostLikeService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.MappedSuperclass;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<UserListResponseDto> postLikeUser(@PathVariable Long postCd){
        return postLikeService.postLikeUser(postCd);
    }

    @GetMapping("/like/{userId}")
    public List<PostListResponseDto> userLikePost(@PathVariable String userId){
        return postLikeService.userLikePost(userId);
    }
}
