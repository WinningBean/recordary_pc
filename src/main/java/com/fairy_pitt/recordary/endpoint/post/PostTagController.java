package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostTagService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostTagController {

    private final PostTagService postTagService;
    private final UserService userService;

    @PostMapping("/{postCd}/tag")
    public Boolean postTag(@PathVariable Long postCd, @RequestBody Long userCd){
        userService.checkSessionLogout();
        return postTagService.save(postCd, userCd);
    }

    @DeleteMapping("/{postCd}/unTag")
    public Boolean postUnTag(@PathVariable Long postCd, @RequestParam Long userCd){
        userService.checkSessionLogout();
        return postTagService.delete(postCd, userCd);
    }

    @GetMapping("/{postCd}/tagUser")
    public List<UserResponseDto> postTagUser(@PathVariable Long postCd){
        userService.checkSessionLogout();
        return postTagService.postTagUser(postCd);
    }

    @GetMapping("/{userCd}/tagPost")
    public List<PostResponseDto> userTagPost(@PathVariable Long userCd){
        userService.checkSessionLogout();
        return postTagService.userTagPost(userCd);
    }
}
