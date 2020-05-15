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

    @GetMapping("/{postCd}/tag/{userCd}")
    public Boolean postTag(@PathVariable Long postCd, @PathVariable Long userCd){
        return postTagService.save(postCd, userCd);
    }

    @DeleteMapping("/{postCd}/unTag/{userCd}")
    public Long postUnTag(@PathVariable Long postCd, @PathVariable Long userCd){
        postTagService.delete(postCd, userCd);
        return userCd;
    }

    @GetMapping("/{postCd}/tagUser")
    public List<UserResponseDto> postTagUser(@PathVariable Long postCd){
        return postTagService.postTagUser(postCd);
    }

    @GetMapping("/tag/{userCd}")
    public List<PostResponseDto> userTagPost(@PathVariable Long userCd){
        return postTagService.userTagPost(userCd);
    }
}
