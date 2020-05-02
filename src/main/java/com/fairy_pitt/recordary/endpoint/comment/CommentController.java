package com.fairy_pitt.recordary.endpoint.comment;

import com.fairy_pitt.recordary.endpoint.comment.dto.CommentRequestDto;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentResponseDto;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/")
    public Long save(@RequestBody CommentRequestDto requestDto)
    {
        return commentService.save(requestDto);
    }

    @PostMapping("{id}")
    public Long update(@PathVariable Long id, @RequestBody CommentUpdateRequestDto requestDto)
    {
        return  commentService.update(id,requestDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id)
    {
        commentService.delete(id);
    }

    @GetMapping("{id}")
    public List<CommentResponseDto> findChildComment(@PathVariable Long id)
    {
        return commentService.findChildComment(id);
    }

}
