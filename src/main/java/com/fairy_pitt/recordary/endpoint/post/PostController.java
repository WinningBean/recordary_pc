package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.post.dto.PostListResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    @PostMapping("/")
    public Boolean save(@RequestBody PostSaveRequestDto requestDto){
        return postService.save(requestDto);
    }

    @PutMapping("/{postCd}")
    public Long update(@PathVariable Long postCd, @RequestBody PostUpdateRequestDto requestDto) {
        return postService.update(postCd, requestDto);
    }

    @DeleteMapping("/{postCd}")
    public Long delete(@PathVariable Long postCd) {
        postService.delete(postCd);
        return postCd;
    }

    @GetMapping("/{postCd}")
    public PostResponseDto findByCd(@PathVariable Long postCd) {
        return postService.findByCd(postCd);
    }

    @GetMapping("/")
    public List<PostListResponseDto> findAllDesc(){
        return postService.findAllDesc();
    }

    @GetMapping("/user/{userId}")
    public List<PostListResponseDto> userPost(@PathVariable String userId){
        return postService.userPost(userId);
    }

    @GetMapping("/group/{groupCd}")
    public List<PostListResponseDto> groupPost(@PathVariable Long groupCd){
        return postService.groupPost(groupCd);
    }

    @GetMapping("/user/{userId}/search")
    public List<PostListResponseDto> userPostSearch(@PathVariable String userId, @RequestParam(value = "input")String searchContent){
        return postService.userPostSearch(searchContent, userId);
    }

    @GetMapping("/group/{groupCd}/search")
    public List<PostListResponseDto> groupPostSearch(@PathVariable Long groupCd, @RequestParam(value = "input")String searchContent){
        return postService.groupPostSearch(searchContent, groupCd);
    }
}

