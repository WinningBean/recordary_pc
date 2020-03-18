package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@Transactional
@RequiredArgsConstructor
@RequestMapping("group")
@Controller
public class GroupController {

    private final GroupService groupService;
    private final UserService userService;

    @PostMapping("create")
    public @ResponseBody Long groupCreate(@RequestBody GroupSaveRequestDto requestDto)
    {
        return groupService.save(requestDto);
    }


    @PostMapping("update/{id}")
    public @ResponseBody Long update(@PathVariable Long id,
                                     @RequestBody GroupUpdateRequestDto requestDto) {
        return groupService.updateGroupInfo(id, requestDto);
    }

    @PostMapping("changeMaster/{groupCd}")
    public @ResponseBody Long updateMaster(@PathVariable Long groupCd,
                                           @RequestBody String userId) {

        return groupService.changGroupMaster(userId,groupCd);
    }



//    public @ResponseBody GroupDto groupShow()
}

/*  @Autowired
    private HttpSession session;

    @Autowired
    private  GroupService groupService ;

    @Autowired
    private GroupMemberService groupMemberService ;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @PostMapping("create") // 그룹 생성
    public Map<String,Boolean> CreateGroup(@RequestParam Map<String, Object> groupInfo) {
        //UserEntity currUser = (UserEntity) session.getAttribute("loginUser");

*//*        GroupEntity groupEntity = new GroupEntity();
        GroupMemberEntity groupMemberEntity = new GroupMemberEntity();

        groupEntity.setGName((String)groupInfo.get("group_nm"));
        groupEntity.setGEx((String) groupInfo.get("group_ex"));

        groupEntity.setGMstUserFK((UserEntity) session.getAttribute("loginUser"));

        if((String) groupInfo.get("group_state") == "true")
        {
            groupEntity.setGState(true);
        }else {
            groupEntity.setGState(false);
        }
        GroupEntity groupCreate = groupService.groupCreate(groupEntity);
        groupMemberEntity.setUserCodeFK(groupCreate.getGMstUserFK());
        groupMemberEntity.setGroupCodeFK(groupCreate);

        boolean groupCreateComplete = groupMemberService.insertMember(groupCreate);*//*
        Map<String, Boolean> result = new HashMap<>();
   *//*     result.put("isCreate", groupCreateComplete );*//*

        return result;
    }

    @CrossOrigin
    @ResponseBody
    @GetMapping("search") // 그룹 검색
    public Map<String,Object> SearchGroup(@RequestParam(value = "groupSearch") String groupSearch)
    {
        Map<String, Object> groupMap = new HashMap<>();
        List<GroupEntity> searchResult = groupService.groupSearch(groupSearch);

        List GroupMapList = new ArrayList();
        for (GroupEntity groupEntity:searchResult) {
            if(groupEntity.getGroupState() == true)
            {
                Map<String,Object> groupMapTemp = new HashMap<>();
                groupMapTemp.put("group_nm",groupEntity.getGroupName());
                groupMapTemp.put("group_ex",groupEntity.getGroupEx());
                groupMapTemp.put("group_pic",groupEntity.getGroupPic());
                groupMapTemp.put("group_cd", groupEntity.getGroupCd());
                GroupMapList.add(groupMapTemp);
            }
            else{
                continue;
            }
        }
        groupMap.put("searchedGroup", GroupMapList);
        return groupMap;
    }

    @ResponseBody
    @PostMapping("delete/{id}")
    public Map<String,Boolean> DeleteGroup(@PathVariable("id") long id)
    {
        groupService.GroupDelete(id);
        Map<String,Boolean> result = new HashMap<>();
        result.put("isDelete", true);
        return result;
    }

    //그룹 정보수정
    @ResponseBody
    @PostMapping("update/{id}")
    public Map<String,Boolean> UpdateGroup(@PathVariable("id") long id, @RequestParam Map<String,Object> groupInfo)
    {
*//*        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setGroupName((String)groupInfo.get("group_nm"));
        groupEntity.setGEx((String) groupInfo.get("group_ex"));

        if((String) groupInfo.get("group_state") == "true")
        {
            groupEntity.setGState(true);
        }else {
            groupEntity.setGState(false);
        }*//*
        Map<String,Boolean> result = new HashMap<>();
     *//*   result.put("isUpdate", groupService.groupUpdate(groupEntity,id));*//*

        return result;
    }

    //그룹 자세히보기 - 그룹 정보와, 그룹의 맴버 정보 전달
    @CrossOrigin
    @ResponseBody
    @PostMapping("show")
    public Map<String, Object> ShowGroup(@RequestParam Map<String, String> groupId)
    {
        System.out.print(groupId.get("group_cd"));
        GroupEntity groupValue = groupService.findGroupId(Long.parseLong(groupId.get("group_cd")));
        List<GroupMemberEntity> members = groupMemberService.readGroupUser(groupValue);

        Map<String, Object> groupInfo = new HashMap<>();
        List groupMemberInfoList = new ArrayList();

  *//*      groupInfo.put("group_nm",groupValue.getGName());
        groupInfo.put("group_ex",groupValue.getGEx());
        groupInfo.put("group_pic",groupValue.getGPic());*//*

        UserEntity groupAdmin = groupValue.getGMstUserFK();
        groupInfo.put("user_id", groupAdmin.getUserId());
        groupInfo.put("user_nm", groupAdmin.getUserNm());
        groupInfo.put("user_ex", groupAdmin.getUserEx());
        groupInfo.put("user_pic", null);

        for(GroupMemberEntity groupMember : members)
        {
            UserEntity user =  userService.find(groupMember.getUserCodeFK().getUserCd());
            if(!groupAdmin.getUserId().equals(user.getUserId())){
                Map<String, Object> groupMemberInfoMap = new HashMap<>();
                groupMemberInfoMap.put("user_id", user.getUserId());
                groupMemberInfoMap.put("user_nm", user.getUserNm());
                groupMemberInfoMap.put("user_ex", user.getUserEx());
                groupMemberInfoMap.put("user_pic", null);
                groupMemberInfoList.add(groupMemberInfoMap);
            }
        }
        groupInfo.put("group_member",groupMemberInfoList);
        return groupInfo;
    }

    @ResponseBody
    @GetMapping("readAll")
    public Map<String, Object> readAllGroup()
    {
        List<GroupEntity> group =  groupService.findAllPublicGroup();
        Map<String, Object> resultMap = new HashMap<>();
*//*        List resultList = new ArrayList();
      //  System.out.println(group);
        if(group != null)
        {
            for(GroupEntity temp : group)
            {
                Map<String, Object> tempResultMap = new HashMap<>();
                tempResultMap.put("groupNm",temp.getGName());
                tempResultMap.put("groupEx",temp.getGEx());
                resultList.add(tempResultMap);
            }
            resultMap.put("group",resultList);

        }else {
            resultMap.put("group",null);
            return resultMap;
        }*//*
        return resultMap;
    }*/


