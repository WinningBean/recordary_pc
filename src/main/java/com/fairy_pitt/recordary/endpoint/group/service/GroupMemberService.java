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
    private final GroupApplyService groupApplyService;

    @Transactional
    public Boolean save(GroupMemberRequestDto groupMemberRequestDto)
    {
        GroupMemberEntity groupMemberEntity = groupMemberRequestDto.toEntity();
        GroupMemberPK groupMemberPK = new GroupMemberPK(groupMemberEntity.getGroupCodeFK().getGroupCd(),
                                                        groupMemberEntity.getUserCodeFK().getUserCd());
        groupApplyService.delete(groupMemberPK);
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
/*
    @Autowired
    private final GroupRepository groupRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final GroupMemberRepository groupMemberRepository;
    @Autowired
    private HttpSession session;


    public List<GroupMemberEntity> readUserGroup(UserEntity user)
    {
        return userRepository.findByUserId(user.getUserId())
                .getGroups();
    }

    //그룹의 맴버 유저 찾기
    public List<GroupMemberEntity> readGroupUser(GroupEntity group)
    {
        return groupRepository.findByGroupCd(group.getGroupCd())
                .getMembers();
    }


    public Boolean insertMember(GroupEntity groupEntity)
    {
       // System.out.print(groupMemberEntity.getUserCodeFK());
*/
/*        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        GroupMemberEntity insertGroupMember = new GroupMemberEntity();
        insertGroupMember.setGroupCodeFK(groupEntity);
        insertGroupMember.setUserCodeFK(currentUser);
        Optional<GroupMemberEntity> resultMemberEntity = Optional.of(groupMemberRepository.save(insertGroupMember));

        if (resultMemberEntity.isPresent()) {
            return true;
        } else {
            return false;
        }*//*

        return false;
    }

    //그룹 탈퇴
    public Boolean deleteMember(GroupMemberPK groupMemberEntity)
    {
//        groupMemberRepository.deleteById(groupMemberEntity);
        return true;
    }


*/
/*    public  Optional<GroupMemberEntity> findMember(GroupMemberPK groupMemberID)
    {
        return groupMemberRepository.findById(groupMemberID);
    }*//*


//    public Boolean deleteGroup()
//    {
//
//    }
*/

}
