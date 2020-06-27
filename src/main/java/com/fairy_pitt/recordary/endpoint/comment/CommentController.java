package com.fairy_pitt.recordary.endpoint.comment;

import com.fairy_pitt.recordary.endpoint.comment.dto.CommentRequestDto;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentResponseDto;
import com.fairy_pitt.recordary.endpoint.comment.service.CommentService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("comment")
@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;
    private final UserService userService;

    @PostMapping("/")
    public Long save(@RequestBody CommentRequestDto requestDto)
    {
        userService.checkSessionLogout();
        return commentService.save(requestDto);
    }

    @PutMapping("/{commentCd}")
    public Long update(@PathVariable Long commentCd, @RequestBody String commentContent)
    {
        userService.checkSessionLogout();
        return  commentService.update(commentCd, commentContent);
    }

    @DeleteMapping("/{commentCd}")
    public Boolean delete(@PathVariable Long commentCd)
    {
        userService.checkSessionLogout();
        return commentService.delete(commentCd);
    }

    @GetMapping("{commentCd}")
    public CommentResponseDto findByCommentCd(@PathVariable Long commentCd){
        userService.checkSessionLogout();
        return new CommentResponseDto(commentService.findEntity(commentCd));
    }

    @GetMapping("/sub/{commentCd}")
    public List<CommentResponseDto> findChildComment(@PathVariable Long commentCd)
    {
        userService.checkSessionLogout();
        return commentService.findChildComment(commentCd);
    }

}
