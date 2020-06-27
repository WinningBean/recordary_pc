package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @PostMapping("/")
    public Long save(@RequestBody PostSaveRequestDto requestDto){
        userService.checkSessionLogout();
        return postService.save(requestDto);
    }

    @PutMapping("/{postCd}")
    public Long update(@PathVariable Long postCd, @RequestBody PostUpdateRequestDto requestDto) {
        userService.checkSessionLogout();
        return postService.update(postCd, requestDto);
    }

    @DeleteMapping("/{postCd}")
    public Boolean delete(@PathVariable Long postCd) {
        userService.checkSessionLogout();
        return postService.delete(postCd);
    }

    @GetMapping("/{postCd}")
    public PostResponseDto findByCd(@PathVariable Long postCd) {
        userService.checkSessionLogout();
        return postService.findByCd(postCd);
    }

    @GetMapping("/user/{userCd}")
    public List<PostResponseDto> userPost(@PathVariable Long userCd){
        userService.checkSessionLogout();
        return postService.userPost(userCd);
    }

    @GetMapping("/paging/user/{userCd}")
    public List<PostResponseDto> pagingUserPost(@PathVariable Long userCd, @RequestParam(value = "lastCd", required = false) Long lastPostCd){
        userService.checkSessionLogout();
        return postService.pagingUserPost(userCd, lastPostCd);
    }

    @GetMapping("/group/{groupCd}")
    public List<PostResponseDto> groupPost(@PathVariable Long groupCd){
        userService.checkSessionLogout();
        return postService.groupPost(groupCd);
    }

    @GetMapping("/paging/group/{groupCd}")
    public List<PostResponseDto> pagingGroupPost(@PathVariable Long groupCd, @RequestParam(value = "lastCd", required = false) Long lastPostCd){
        userService.checkSessionLogout();
        return postService.pagingGroupPost(groupCd, lastPostCd);
    }

    @GetMapping("/user/{userCd}/search")
    public List<PostResponseDto> userPostSearch(@PathVariable Long userCd, @RequestParam(value = "input") String searchContent){
        userService.checkSessionLogout();
        return postService.userPostSearch(searchContent, userCd);
    }

    @GetMapping("/group/{groupCd}/search")
    public List<PostResponseDto> groupPostSearch(@PathVariable Long groupCd, @RequestParam(value = "input") String searchContent){
        userService.checkSessionLogout();
        return postService.groupPostSearch(searchContent, groupCd);
    }

    @GetMapping("/timeLine/{userCd}")
    public List<PostResponseDto> timeLinePostList(@PathVariable Long userCd){
        userService.checkSessionLogout();
        return postService.timeLinePostList(userCd);
    }

    @GetMapping("/pagingTimeLine/{userCd}")
    public List<PostResponseDto> pagingTimeLinePostList(@PathVariable Long userCd, @RequestParam(value = "lastCd", required = false) Long lastPostCd){
        userService.checkSessionLogout();
        return postService.pagingTimeLinePostList(userCd, lastPostCd);
    }
}

