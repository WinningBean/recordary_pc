package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    @Transactional
    public Long save(@RequestBody GroupSaveRequestDto requestDto) {
        UserEntity user = userRepository.findByUserId(requestDto.getUserId());
        return groupRepository.save(requestDto.toEntity(user))
                .getGroupCd();
    }

    @Transactional
    public Long updateGroupInfo(Long id, @RequestBody GroupUpdateRequestDto groupDto) {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupEntity.updateGroupInfo(groupDto.getGroupName(), groupDto.getGroupState(), groupDto.getGroupPic(), groupDto.getGroupEx());

        return id;
    }

    @Transactional
    public Long changGroupMaster(String UserId, Long groupCd) {
        GroupEntity groupEntity = groupRepository.findById(groupCd)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + groupCd));

        UserEntity User = userRepository.findByUserId(UserId);
        groupEntity.updateGroupMaster(User);

        return groupCd;
    }

    @Transactional
    public void delete(Long id) {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupRepository.delete(groupEntity);
    }

    @Transactional(readOnly = true)
    public JSONArray findAllGroupInfoById(Long id) {
        JSONArray group = new JSONArray();
        JSONArray groupMemberInfoList = new JSONArray();
        GroupEntity entity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        JSONObject groupInfo = new JSONObject();
        groupInfo.put("groupCd", entity.getGroupCd());
        groupInfo.put("groupNm", entity.getGroupName());
        groupInfo.put("groupEx", entity.getGroupEx());
        groupInfo.put("groupPic", entity.getGroupPic());
        groupInfo.put("groupState", entity.getGroupState());
        groupInfo.put("groupMaster", entity.getGMstUserFK().getUserId());

        List<UserEntity> members = groupMemberRepository.findAllByGroupCodeFK(entity);
        for (UserEntity groupMember : members) {
            if (!entity.getGMstUserFK().getUserId().equals(groupMember.getUserId())) {
                JSONObject groupMemberInfo = new JSONObject();
                groupMemberInfo.put("user_id", groupMember.getUserId());
                groupMemberInfo.put("user_nm", groupMember.getUserNm());
                groupMemberInfo.put("user_ex", groupMember.getUserEx());
                groupMemberInfo.put("user_pic", null);
                groupMemberInfoList.add(groupMemberInfo);
            }
        }
        group.add(groupInfo);
        group.add(groupMemberInfoList);
        return group;
    }

    @Transactional(readOnly = true)
    public List<GroupResponseDto> findAllGroup(){

        return groupRepository.findAllByGroupState(true).stream()
                .map(GroupResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GroupResponseDto> findGroupByName(String groupName){
        return groupRepository.findByGroupNameLike("%"+groupName+"%").stream()
                .map(GroupResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GroupResponseDto> findUserGroups(String userId){
        List<GroupMemberEntity> groupEntities = userRepository.findByUserId(userId).getGroups();
        List<GroupResponseDto> result = new ArrayList<>();

        for (GroupMemberEntity temp: groupEntities) {
            GroupResponseDto groupResponseDto = new GroupResponseDto(temp.getGroupCodeFK());
            result.add(groupResponseDto);
        }
        return  result;
    }
/*   
 @Transactional(readOnly = true)
    public List<GroupMemberResponseDto> findGroupMembers(Long groupCd){

        return groupRepository.findByGroupCd(groupCd).getMembers().stream()
                .map(GroupMemberResponseDto::new)
                .collect(Collectors.toList());
    }*/

    @Transactional(readOnly = true)
    public GroupEntity findEntity(Long groupCd){
        return groupRepository.findByGroupCd(groupCd);
    }
}
