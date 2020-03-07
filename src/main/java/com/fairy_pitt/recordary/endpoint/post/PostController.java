package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("post")
public class PostController {
    @Autowired private PostService postService;
    @Autowired private HttpSession session;
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private GroupRepository groupRepository;

    @PostMapping("/write")
    public Map<String, Boolean> write(@RequestParam Map<String, Object> paramMap){
        String userId = (String) paramMap.get("user_id");
        Long groupCd = (Long) paramMap.get("group_cd");

        UserEntity userEntity = userRepository.findByUserId(userId);
        GroupEntity groupEntity = groupRepository.findByGroupCd(groupCd);

        Map<String, Object> postMap = (Map)paramMap.get("inputPost");
        Boolean writeState = postService.create(userEntity, groupEntity, postMap);

        Map<String, Boolean> map = new HashMap<>();
        map.put("isWrite", writeState);
        return map;
    }

    @PostMapping("/share")
    public  Map<String, Boolean> share(@RequestParam Map<String, Object> paramMap){
        String  userId = (String) paramMap.get("user_id");
        Long groupCd = (Long) paramMap.get("group_cd");

        UserEntity userEntity = userRepository.findByUserId(userId);
        GroupEntity groupEntity = groupRepository.findByGroupCd(groupCd);

        Map<String, Object> postMap = (Map)paramMap.get("sharePost");
        Boolean writeState = postService.share(userEntity, groupEntity, postMap);

        Map<String, Boolean> map = new HashMap<>();
        map.put("isShare", writeState);
        return map;
    }

    @PostMapping("/update")
    public Map<String, Boolean> update(@RequestParam Map<String, Object> paramMap){
        PostEntity postEntity = new PostEntity();
        postEntity.setPostCd((Long)paramMap.get("post_cd"));
        postEntity.setPostEx((String)paramMap.get("post_ex"));
        postEntity.setPostPublicState((int)paramMap.get("post_pb_st"));

        Boolean updateState = postService.update(postEntity);
        Map<String, Boolean> map = new HashMap<>();
        map.put("isUpdate", updateState);
        return map;
    }

    @GetMapping("/")
    public Map<String, Object> userPost(@RequestParam Map<String, Object> paramMap){
        String  userId = (String)paramMap.get("user_id");
        UserEntity userEntity = userRepository.findByUserId(userId);
        List<PostEntity> postList;

        Long groupCd = (Long)paramMap.get("group_cd");
        if (groupCd != null){
            GroupEntity groupEntity = groupRepository.findByGroupCd(groupCd);
            postList = postService.groupPost(groupEntity);
        }
        else postList = postService.userPost(userEntity);


        Map<String, Object> map = new HashMap<>();
        List postMapList = new ArrayList();
        for (PostEntity postEntity : postList){
            Map<String, Object> postDetailMap = new HashMap<>();
            postDetailMap.put("post_cd", postEntity.getPostCd());
            postDetailMap.put("post_group_fk", postEntity.getGroupFK().getGroupCd());
            postDetailMap.put("post_origin_fk", postEntity.getPostOriginFK().getPostCd());
            postDetailMap.put("post_ex", postEntity.getPostEx());
            postDetailMap.put("post_pb_st", postEntity.getPostPublicState());
            postDetailMap.put("post_str_ymd", postEntity.getPostStrYMD());
            postDetailMap.put("post_end_ymd", postEntity.getPostEndYMD());
            postDetailMap.put("post_created_dt", postEntity.getCreatedDate());
            postDetailMap.put("post_updated_dt", postEntity.getUpdatedDate());
            postMapList.add(postDetailMap);
        }
        map.put("userPost", postMapList);
        return map;
    }

    @PostMapping("/delete")
    public Map<String, Boolean> delete(@RequestParam Map<String, Object> paramMap){
        Boolean deleteState = postService.delete((Long) paramMap.get("post_cd"));
        Map<String, Boolean> map = new HashMap<>();
        map.put("isDelete", deleteState);
        return map;
    }

    @GetMapping("/search")
    public Map<String, Object> search(@RequestParam Map<String, Object> paramMap){
        String searchContent = (String)paramMap.get("searchContent");
        String userId = (String) paramMap.get("user_id");
        UserEntity userEntity = userRepository.findByUserId(userId);
        List<PostEntity> postList;

        Long groupCd = (Long)paramMap.get("group_cd");
        if (groupCd != null){
            GroupEntity groupEntity = groupRepository.findByGroupCd(groupCd);
            postList = postService.groupPostSearch(searchContent, groupEntity);
        }
        else postList = postService.userPostSearch(searchContent, userEntity);

        Map<String, Object> map = new HashMap<>();
        List postMapList = new ArrayList();
        for (PostEntity postEntity : postList){
            Map<String, Object> postDetailMap = new HashMap<>();
            postDetailMap.put("post_cd", postEntity.getPostCd());
            postDetailMap.put("post_group_fk", postEntity.getGroupFK().getGroupCd());
            postDetailMap.put("post_origin_fk", postEntity.getPostOriginFK().getPostCd());
            postDetailMap.put("post_ex", postEntity.getPostEx());
            postDetailMap.put("post_pb_st", postEntity.getPostPublicState());
            postDetailMap.put("post_str_ymd", postEntity.getPostStrYMD());
            postDetailMap.put("post_end_ymd", postEntity.getPostEndYMD());
            postDetailMap.put("post_created_dt", postEntity.getCreatedDate());
            postDetailMap.put("post_updated_dt", postEntity.getUpdatedDate());
            postMapList.add(postDetailMap);
        }
        map.put("searchedPost", postMapList);
        return map;
    }
}
