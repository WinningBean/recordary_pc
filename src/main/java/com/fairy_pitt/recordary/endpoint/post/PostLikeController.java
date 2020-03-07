package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.service.PostLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("post")
public class PostLikeController {
    @Autowired PostLikeService postLikeService;

    @GetMapping("/like")
    public Map<String, Boolean> like(@RequestParam Map<String, Object> paramMap){
        Long postCd = (Long) paramMap.get("post_cd");
        String userId = (String) paramMap.get("user_id");

        Boolean likeState = postLikeService.create(postCd, userId);
        Map<String, Boolean> map = new HashMap<>();
        map.put("isLike", likeState);
        return map;
    }

    @GetMapping("/unLike")
    public Map<String, Boolean> unLike(@RequestParam Map<String, Object> paramMap){
        Long postCd = (Long) paramMap.get("post_cd");
        String userId = (String) paramMap.get("user_id");

        Boolean unLikeState = postLikeService.delete(postCd, userId);
        Map<String, Boolean> map = new HashMap<>();
        map.put("isUnLike", unLikeState);
        return map;
    }
}
