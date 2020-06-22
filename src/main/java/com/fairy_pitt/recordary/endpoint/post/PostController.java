package com.fairy_pitt.recordary.endpoint.post;

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
    public Long save(@RequestBody PostSaveRequestDto requestDto){
        return postService.save(requestDto);
    }

    @PutMapping("/{postCd}")
    public Long update(@PathVariable Long postCd, @RequestBody PostUpdateRequestDto requestDto) {
        return postService.update(postCd, requestDto);
    }

    @DeleteMapping("/{postCd}")
    public Boolean delete(@PathVariable Long postCd) {
        return postService.delete(postCd);
    }

    @GetMapping("/{postCd}")
    public PostResponseDto findByCd(@PathVariable Long postCd) {
        return postService.findByCd(postCd);
    }

    @GetMapping("/user/{userCd}")
    public List<PostResponseDto> userPost(@PathVariable Long userCd){
        return postService.userPost(userCd);
    }

    @GetMapping("/paging/user/{userCd}")
    public List<PostResponseDto> pagingUserPost(@PathVariable Long userCd, @RequestParam(value = "lastCd", required = false) Long lastPostCd){
        return postService.pagingUserPost(userCd, lastPostCd);
    }

    @GetMapping("/group/{groupCd}")
    public List<PostResponseDto> groupPost(@PathVariable Long groupCd){
        return postService.groupPost(groupCd);
    }

    @GetMapping("/paging/group/{groupCd}")
    public List<PostResponseDto> pagingGroupPost(@PathVariable Long groupCd, @RequestParam(value = "lastCd", required = false) Long lastPostCd){
        return postService.pagingGroupPost(groupCd, lastPostCd);
    }

    @GetMapping("/user/{userCd}/search")
    public List<PostResponseDto> userPostSearch(@PathVariable Long userCd, @RequestParam(value = "input") String searchContent){
        return postService.userPostSearch(searchContent, userCd);
    }

    @GetMapping("/group/{groupCd}/search")
    public List<PostResponseDto> groupPostSearch(@PathVariable Long groupCd, @RequestParam(value = "input") String searchContent){
        return postService.groupPostSearch(searchContent, groupCd);
    }

    @GetMapping("/timeLine/{userCd}")
    public List<PostResponseDto> timeLinePostList(@PathVariable Long userCd){
        return postService.timeLinePostList(userCd);
    }

    @GetMapping("/pagingTimeLine/{userCd}")
    public List<PostResponseDto> pagingTimeLinePostList(@PathVariable Long userCd, @RequestParam(value = "lastCd", required = false) Long lastPostCd){
        return postService.pagingTimeLinePostList(userCd, lastPostCd);
    }
}

