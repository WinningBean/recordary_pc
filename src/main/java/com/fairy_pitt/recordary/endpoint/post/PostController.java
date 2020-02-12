package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("post")
public class PostController {
    @Autowired private PostService postService;
    @Autowired private UserRepository userRepository;
    @Autowired private GroupRepository groupRepository;

    @PostMapping("/write")
    public Map<String, Boolean> write(@RequestParam Map<String, Object> paramMap){
        Long userCd = (Long)paramMap.get("user_cd");
        Long groupCd = (Long) paramMap.get("group_cd");

        UserEntity userEntity = userRepository.findByUserCd(userCd);
        GroupEntity groupEntity = groupRepository.findByGroupCd(groupCd);

        Map<String, Object> postMap = (Map)paramMap.get("input_post");
        Boolean writeState = postService.create(userEntity, groupEntity, postMap);

        Map<String, Boolean> map = new HashMap<>();
        map.put("is_write", writeState);
        return map;
    }
}
