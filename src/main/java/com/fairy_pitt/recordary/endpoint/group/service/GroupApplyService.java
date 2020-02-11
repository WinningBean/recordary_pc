package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.id.GroupMemberPK;
import com.fairy_pitt.recordary.common.repository.GroupApplyRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupApplyService {

    @Autowired
    private  final  GroupApplyRepository groupApplyRepository;
    private final UserInfoService userInfoService;
    private final  GroupService groupService;

    public  Boolean applyInsert(GroupApplyEntity groupApplyInfo)
    {
       groupApplyRepository.save(groupApplyInfo);

        return true;
    }

    public Boolean applyDelete(GroupMemberPK groupApplyInfoID)
    {
       // groupApplyRepository.delete(groupApplyInfo);
        groupApplyRepository.deleteById(groupApplyInfoID);
        return true;
    }

    //그룹이 유저한테 초대 신청 목록 찾기
    public List<GroupApplyEntity> findGroupAppliesToUser(UserEntity userCd)
    {
        List<GroupApplyEntity> groupApplyEntity = groupApplyRepository.findAllByUserCodeFKAndAndApplyState(userCd,1);

        return groupApplyEntity;
    }

    //유저가 그룹한테 초대 신청 목록 찾기
    public List<GroupApplyEntity> findUserAppliesToGroup(GroupEntity groupCd)
    {
        List<GroupApplyEntity> groupApplyEntity = groupApplyRepository.findAllByGroupCodeFKAndApplyState(groupCd, 2);

        return groupApplyEntity;
    }
}
