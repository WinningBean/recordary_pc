package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberRequestDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;
    private final UserService userService;
    private final GroupRepository groupRepository;

    @Transactional
    public Long save(GroupMemberRequestDto groupMemberRequestDto)
    {
        UserEntity user = userService.findEntity(groupMemberRequestDto.getUserCd());
        GroupEntity group = groupRepository.findByGroupCd(groupMemberRequestDto.getGroupCd());
        GroupMemberEntity groupMemberEntity = groupMemberRequestDto.toEntity(group,user);
       return groupMemberRepository.save(groupMemberEntity).getGroupFK().getGroupCd();
    }

    @Transactional
    public Boolean delete (GroupMemberRequestDto requestDto) {
        GroupMemberPK id = new GroupMemberPK(requestDto.getGroupCd(),requestDto.getUserCd());
        GroupMemberEntity groupApplyEntity = groupMemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupMemberRepository.delete(groupApplyEntity);
        return true;
    }

}
