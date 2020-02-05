package com.fairy_pitt.recordary.group_member.service;

import com.fairy_pitt.recordary.group.repository.GroupRepository;
import com.fairy_pitt.recordary.group_member.domain.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.group_member.repository.GroupMemberRepository;
import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
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
    private final UsersRepository usersRepository;
    @Autowired
    private final GroupMemberRepository groupMemberRepository;


    public List<GroupMemberEntity> readUserGroup(Users user)
    {
        return usersRepository.findByUserId(user.getUserId())
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
