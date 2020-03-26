package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.post.dto.PostListResponseDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostTagService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<UserListResponseDto> postTagUser(@PathVariable Long postCd){
        return postTagService.postTagUser(postCd);
    }

    @GetMapping("/tag/{userId}")
    public List<PostListResponseDto> userTagPost(@PathVariable String userId){
        return postTagService.userTagPost(userId);
    }
}
