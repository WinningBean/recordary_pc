package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.GroupMemberEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupPageResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.*;
import com.fairy_pitt.recordary.endpoint.main.S3UploadComponent;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserService userService;
    private final GroupMemberRepository groupMemberRepository;
    private final S3UploadComponent s3UploadComponent;

    @Transactional
    public Long save(@RequestBody GroupRequestDto requestDto) {
        UserEntity user = userService.findEntity(requestDto.getUserCd());
            return  groupRepository.save(
                    requestDto.toEntity(user,"group/basic.png"))
                    .getGroupCd();
    }

    @Transactional
    public Long updateGroupInfo(Long id, GroupRequestDto groupDto) {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupEntity.updateGroupInfo(groupDto.getGroupNm(), groupDto.getGroupState(), groupDto.getGroupEx());

        return id;
    }

    @Transactional
    public String updateGroupProfile(Long id, MultipartFile groupPic) throws IOException {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));
        String imgPath;

        if (groupPic.isEmpty()) imgPath = null;
        else {
            if (!groupEntity.getGroupPic().equals("group/basic.png")){
                s3UploadComponent.delete(groupEntity.getGroupPic());
            }
            imgPath = s3UploadComponent.profileUpload(groupPic, "group", id);
        }
        groupEntity.updateGroupProfile(imgPath);
        return groupEntity.getProfilePath();
    }

    @Transactional
    public Long changeGroupMaster(String userCd, String groupCd) {
        Long userCode = Long.parseLong(userCd);
        Long groupCode = Long.parseLong(groupCd);
        GroupEntity groupEntity = groupRepository.findById(groupCode)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + groupCd));

        UserEntity user = userService.findEntity(userCode);
        groupEntity.updateGroupMaster(user);

        return groupCode;
    }

    @Transactional
    public void delete(Long id) {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        s3UploadComponent.profileDelete("group", groupEntity.getGroupPic());
        groupRepository.delete(groupEntity);
    }

    @Transactional(readOnly = true)
    public GroupPageResponseDto groupPage(Long id) {
        GroupEntity entity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));
        return new GroupPageResponseDto(entity);
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
        List<GroupResponseDto> result = groupRepository.findBygMstUserFK(user)
                .stream()
                .map(GroupResponseDto::new)
                .collect(Collectors.toList());

        List<GroupMemberEntity> groupEntities = user.getGroups();

        for (GroupMemberEntity temp: groupEntities) {
            GroupResponseDto groupResponseDto = new GroupResponseDto(temp.getGroupFK(), false);
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
