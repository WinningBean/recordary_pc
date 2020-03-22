package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.common.repository.GroupApplyRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupApplyService {

    private final GroupApplyRepository groupApplyRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final UserService userService;

    @Transactional
    public int save(GroupApplyRequestDto requestDto){
        return groupApplyRepository.save(requestDto.toEntity())
                .getApplyState();
    }

    @Transactional
    public void delete (GroupMemberPK id) {
        GroupApplyEntity groupApplyEntity = groupApplyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupApplyRepository.delete(groupApplyEntity);
    }

    @Transactional(readOnly = true)
    public List<GroupApplyResponseDto> findGroupAppliesToUser(String userId){
        UserEntity user = userRepository.findByUserId(userId);
        List<GroupApplyEntity> groupApplyEntities = groupApplyRepository.findAllByUserCodeFKAndAndApplyState(user,1);
        List<GroupApplyResponseDto> groupApplyResponseDtoList = new ArrayList<>();

        for (GroupApplyEntity groupApplyEntity : groupApplyEntities){
            GroupApplyResponseDto groupApplyResponseDto = new GroupApplyResponseDto(groupApplyEntity);
            groupApplyResponseDtoList.add(groupApplyResponseDto);
        }

        return groupApplyResponseDtoList;
    }

    @Transactional(readOnly = true)
    public List<GroupApplyResponseDto> findUserAppliesToGroup(Long groupCd){
        GroupEntity group = groupRepository.findByGroupCd(groupCd);
        List<GroupApplyEntity> groupApplyEntities = groupApplyRepository.findAllByGroupCodeFKAndApplyState(group,2);
        List<GroupApplyResponseDto> groupApplyResponseDtoList = new ArrayList<>();

        for (GroupApplyEntity groupApplyEntity : groupApplyEntities){
            GroupApplyResponseDto groupApplyResponseDto = new GroupApplyResponseDto(groupApplyEntity);
            groupApplyResponseDtoList.add(groupApplyResponseDto);
        }
        return groupApplyResponseDtoList;
    }



/*    @Autowired
    private  final  GroupApplyRepository groupApplyRepository;
    private final UserService userInfoService;
    private final  GroupService groupService;

    public  Boolean applyInsert(GroupApplyEntity groupApplyInfo)
    {

    *//*    Optional<GroupApplyEntity> resultPostTag = Optional.of(groupApplyRepository.save(groupApplyInfo));
        if (resultPostTag.isPresent()) return true;
        else*//* return false;
    }

    public Boolean applyDelete(GroupMemberPK groupApplyInfoID)
    {
       // groupApplyRepository.delete(groupApplyInfo);
//        groupApplyRepository.deleteById(groupApplyInfoID);
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
    }*/
}
