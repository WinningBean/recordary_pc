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

    @PostMapping("/post/tag/delete")
    public Map<String, Boolean> delete(@RequestParam Map<String, Object> paramMap){
        Long postCd = (Long)paramMap.get("post_cd");
        Long userCd = (Long)paramMap.get("user_cd");
        Map<String, Boolean> map = new HashMap<>();
        map.put("isDelete", postTagService.delete(postCd, userCd));
        return map;
    }

    @GetMapping("/post/tagList")
    public Map<String, Object> postTagList(@RequestParam Map<String, Object> paramMap){
        Long postCd = (Long)paramMap.get("post_cd");
        List<UserEntity> tagUserList = postTagService.postTagUser(postCd);

        Map<String, Object> map = new HashMap<>();
        List userMapList = new ArrayList();
        for (UserEntity userEntity : tagUserList){
            Map<String, Object> userDetailMap = new HashMap<>();
            userDetailMap.put("user_cd", userEntity.getUserCd());
            userDetailMap.put("user_nm", userEntity.getUserNm());
            userDetailMap.put("user_pic", null);
            userDetailMap.put("user_ex", userEntity.getUserEx());
            userMapList.add(userDetailMap);
        }
        map.put("postTagUserList", userMapList);
        return map;
    }

    @GetMapping("/{userId}/post")
    public Map<String, Object> userPostTagList(@PathVariable("userId") String userId){
        UserEntity user = userRepository.findByUserId(userId);
        List<PostEntity> tagPostList = postTagService.userTagPost(user.getUserCd());

        Map<String, Object> map = new HashMap<>();
        List postMapList = new ArrayList();
        for (PostEntity postEntity : tagPostList){
            Map<String, Object> postDetailMap = new HashMap<>();
            postDetailMap.put("post_cd", postEntity.getPostCd());
            postDetailMap.put("post_group_fk", postEntity.getGroupFK().getGroupCd());
            postDetailMap.put("post_ex", postEntity.getPostEx());
            postDetailMap.put("post_pb_st", postEntity.getPostPublicState());
            postDetailMap.put("post_str_ymd", postEntity.getPostStrYMD());
            postDetailMap.put("post_end_ymd", postEntity.getPostEndYMD());
            postDetailMap.put("post_created_dt", postEntity.getCreatedDate());
            postDetailMap.put("post_updated_dt", postEntity.getUpdatedDate());
            postMapList.add(postDetailMap);
        }
        map.put("userTagPostList", postMapList);
        return map;
    }
}
