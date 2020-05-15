package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.*;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.constraints.Null;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserService userService;
    private final GroupMemberRepository groupMemberRepository;

    @Transactional
    public Long save(@RequestBody GroupSaveRequestDto requestDto) {
        UserEntity user = userService.findEntity(requestDto.getUserCd());
            return  groupRepository.save(
                    requestDto.toEntity(user,"https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/group/basic.png"))
                    .getGroupCd();
    }

    @Transactional
    public Long updateGroupInfo(Long id, @RequestBody GroupUpdateRequestDto groupDto) {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupEntity.updateGroupInfo(groupDto.getGroupNm(), groupDto.getGroupState(), groupDto.getGroupPic(), groupDto.getGroupEx());

        return id;
    }

    @Transactional
    public void updateGroupProfile(String url,Long id)
    {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));
        groupEntity.updateGroupProfile(url);
    }

    @Transactional
    public Long changGroupMaster(Long userCd, Long groupCd) {
        GroupEntity groupEntity = groupRepository.findById(groupCd)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + groupCd));

        UserEntity User = userService.findEntity(userCd);
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
    public GroupResponseDto groupPage(Long id) {
        GroupEntity entity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        return new GroupResponseDto(entity, entity.getGMstUserFK());
    }

    @Transactional(readOnly = true)
    public List<GroupResponseDto> findAllGroup(){

        return groupRepository.findAllByGroupState(true).stream()
                .map(GroupResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GroupResponseDto> findGroupByName(String groupName){
        return groupRepository.findByGroupNmLike("%"+groupName+"%").stream()
                .map(GroupResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GroupResponseDto> findUserGroups(Long userCd){
        UserEntity user = userService.findEntity(userCd);
        List<GroupMemberEntity> groupEntities = user.getGroups();
        List<GroupResponseDto> result = new ArrayList<>();

        for (GroupMemberEntity temp: groupEntities) {
            Boolean isMaster = temp.getGroupFK().getGMstUserFK().getUserCd().equals(temp.getUserFK().getUserCd());
            GroupResponseDto groupResponseDto = new GroupResponseDto(temp.getGroupFK(), isMaster);
            result.add(groupResponseDto);
        }
        return  result;
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> findGroupMembers(Long groupCd){

        List<GroupMemberEntity> groupEntities = groupRepository.findByGroupCd(groupCd).getMembers();
        List<UserResponseDto> result = new ArrayList<>();

        for (GroupMemberEntity temp: groupEntities) {
            if(!temp.getGroupFK().getGMstUserFK().getUserCd().equals(temp.getUserFK().getUserCd()))
            {
                UserResponseDto groupResponseDto = new UserResponseDto(temp.getUserFK());
                result.add(groupResponseDto);
            }
        }
        return  result;
    }

    @Transactional(readOnly = true)
    public GroupEntity findEntity(Long groupCd){
        return groupRepository.findByGroupCd(groupCd);
    }

}
