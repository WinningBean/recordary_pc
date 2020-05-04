package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostTagService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostTagController {

    private final PostTagService postTagService;

    @GetMapping("/{postCd}/tag/{userId}")
    public Boolean postTag(@PathVariable Long postCd, @PathVariable String userId){
        return postTagService.save(postCd, userId);
    }

    @DeleteMapping("/{postCd}/unTag/{userId}")
    public String postUnTag(@PathVariable Long postCd, @PathVariable String userId){
        postTagService.delete(postCd, userId);
        return userId;
    }

    @GetMapping("/{postCd}/tagUser")
    public List<UserResponseDto> postTagUser(@PathVariable Long postCd){
        return postTagService.postTagUser(postCd);
    }

    @GetMapping("/tag/{userId}")
    public List<PostResponseDto> userTagPost(@PathVariable String userId){
        return postTagService.userTagPost(userId);
    }
}
