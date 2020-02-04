package com.fairy_pitt.recordary.group_member.service;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group.repository.GroupRepository;
import com.fairy_pitt.recordary.group_member.domain.entity.MemberEntity;
import com.fairy_pitt.recordary.group_member.repository.MemberRepository;
import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    @Autowired
    private final GroupRepository groupRepository;
    @Autowired
    private final UsersRepository usersRepository;
    @Autowired
    private final MemberRepository memberRepository;


    public List<MemberEntity> readUserGroup(Users user)
    {
        return usersRepository.findByUserId(user.getUserId())
                .getGroups();
    }


    public Boolean insertMember(MemberEntity memberEntity)
    {
        Optional<MemberEntity> resultMemberEntity = Optional.of(memberRepository.save(memberEntity));
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
