package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    @Transactional
    public Boolean save(GroupMemberRequestDto groupMemberRequestDto)
    {
        UserEntity user = userRepository.findByUserId(groupMemberRequestDto.getUserId());
        GroupEntity group = groupRepository.findByGroupCd(groupMemberRequestDto.getGroupCd());
        GroupMemberEntity groupMemberEntity = groupMemberRequestDto.toEntity(group,user);
        groupMemberRepository.save(groupMemberEntity);
        return true;
    }

    @Transactional
    public Boolean delete (GroupMemberPK id) {
        GroupMemberEntity groupApplyEntity = groupMemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupMemberRepository.delete(groupApplyEntity);
        return true;
    }

}
