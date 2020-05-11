package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.common.repository.GroupApplyRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.*;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupApplyService {

    private final GroupApplyRepository groupApplyRepository;
    private final UserService userService;
    private final GroupRepository groupRepository;

    @Transactional
    public Boolean save(GroupApplyRequestDto requestDto){
        if(!checkApply(requestDto.getGroupCd(),requestDto.getUserCd()))
        {
            UserEntity user = userService.findEntity(requestDto.getUserCd());
            GroupEntity group = groupRepository.findByGroupCd(requestDto.getGroupCd());
            groupApplyRepository.save(requestDto.toEntity(user,group));
            return true;
        }
        else return false;
    }

    @Transactional
    public void delete (GroupMemberRequestDto requestDto) {
        GroupMemberPK id = new GroupMemberPK(requestDto.getGroupCd(),requestDto.getUserCd());
        GroupApplyEntity groupApplyEntity = groupApplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 초대가 없습니다. id=" + id));

        groupApplyRepository.delete(groupApplyEntity);
    }

    @Transactional(readOnly = true)
    public List<GroupApplyResponseDto> findGroupAppliesToUser(Long userId){
        UserEntity user = userService.findEntity(userId);
     return groupApplyRepository.findAllByUserFKAndAndApplyState(user,1).stream()
                .map(GroupApplyResponseDto :: new)
                .collect(Collectors.toList());

    }

    @Transactional(readOnly = true)
    public List<GroupApplyResponseDto> findUserAppliesToGroup(Long groupCd){
        GroupEntity group = groupRepository.findByGroupCd(groupCd);
        return groupApplyRepository.findAllByGroupFKAndApplyState(group,2).stream()
                .map(GroupApplyResponseDto :: new)
                .collect(Collectors.toList());
    }

    private Boolean checkApply(Long groupCd, Long userCd)
    {
        GroupMemberPK id = new GroupMemberPK(groupCd, userCd);
        return groupApplyRepository.findById(id).isPresent();
    }

}
