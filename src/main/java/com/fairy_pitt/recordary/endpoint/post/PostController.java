package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<PostResponseDto> findAllDesc(){
        return postService.findAllDesc();
    }

    @GetMapping("/user/{userId}")
    public List<PostResponseDto> userPost(@PathVariable String userId){
        return postService.userPost(userId);
    }

    @GetMapping("/group/{groupCd}")
    public List<PostResponseDto> groupPost(@PathVariable Long groupCd){
        return postService.groupPost(groupCd);
    }

    @GetMapping("/user/{userId}/search")
    public List<PostResponseDto> userPostSearch(@PathVariable String userId, @RequestParam(value = "input")String searchContent){
        return postService.userPostSearch(searchContent, userId);
    }

    @GetMapping("/group/{groupCd}/search")
    public List<PostResponseDto> groupPostSearch(@PathVariable Long groupCd, @RequestParam(value = "input")String searchContent){
        return postService.groupPostSearch(searchContent, groupCd);
    }

    @GetMapping("/timeLine/{userCd}")
    public List<PostEntity> timeLinePostList(@PathVariable Long userCd){
        return postService.timeLinePostList(userCd);
    }
}

