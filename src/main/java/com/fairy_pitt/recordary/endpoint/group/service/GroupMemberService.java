package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupMemberService {

    @Autowired
    private final GroupRepository groupRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final GroupMemberRepository groupMemberRepository;


    public List<GroupMemberEntity> readUserGroup(UserEntity user)
    {
        return userRepository.findByUserId(user.getUserId())
                .getGroups();
    }


    public Boolean insertMember(GroupMemberEntity groupMemberEntity)
    {
        Optional<GroupMemberEntity> resultMemberEntity = Optional.of(groupMemberRepository.save(groupMemberEntity));
        if (resultMemberEntity.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

//    public Boolean deleteGroup()
//    {
//
//    }

}
