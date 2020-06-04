package com.fairy_pitt.recordary.endpoint.comment;

import com.fairy_pitt.recordary.endpoint.comment.dto.CommentRequestDto;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentResponseDto;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("comment")
@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/")
    public Long save(@RequestBody CommentRequestDto requestDto)
    {
        return commentService.save(requestDto);
    }

    @PutMapping("/{commentCd}")
    public Long update(@PathVariable Long commentCd, @RequestBody CommentUpdateRequestDto requestDto)
    {
        return  commentService.update(commentCd,requestDto);
    }

    @DeleteMapping("/{commentCd}")
    public void delete(@PathVariable Long commentCd)
    {
        commentService.delete(commentCd);
    }

    @GetMapping("/{commentCd}")
    public List<CommentResponseDto> findChildComment(@PathVariable Long commentCd)
    {
        return commentService.findChildComment(commentCd);
    }

}
