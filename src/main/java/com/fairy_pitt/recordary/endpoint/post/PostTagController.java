package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.PostTagRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.post.service.PostTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//@RequestMapping("post")
public class PostTagController {
    @Autowired private PostTagService postTagService;
    @Autowired private UserRepository userRepository;

    @PostMapping("/post/tagList/create")
    public Map<String, Boolean> createTagList(@RequestParam Map<String,Object> paramMap){
        Long postCd = (Long)paramMap.get("post_cd");
        Map<String, Boolean> map = new HashMap<>();

        for (int i = 0; i < paramMap.size() - 1; i++){
            Long userCd = (Long)paramMap.get("user_cd" + (i+1));
            map.put("isCreate" + (i+1), postTagService.create(postCd, userCd));
        }
        return map;
    }

    @PostMapping("/post/tag/create")
    public Map<String, Boolean> createTag(@RequestParam Map<String,Object> paramMap){
        Long postCd = (Long)paramMap.get("post_cd");
        Long userCd = (Long)paramMap.get("user_cd");
        Map<String, Boolean> map = new HashMap<>();
        map.put("isCreate", postTagService.create(postCd, userCd));
        return map;
    }
