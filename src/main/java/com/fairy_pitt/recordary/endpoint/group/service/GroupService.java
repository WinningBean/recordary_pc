package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor// 검색해보기
public class GroupService {

    @Autowired
    private final GroupRepository  groupRepository;
    private final UserRepository usersRepository;
    private final GroupMemberService groupMemverService;

    public GroupEntity groupCreate(GroupEntity groupEntity){
        GroupEntity resultGroupEntity = groupRepository.save(groupEntity);
        return resultGroupEntity;
    }

    public GroupEntity findGroupId(long id){
        return groupRepository.findByGroupCd(id);
    }

    //그룹 삭제
    public void GroupDelete(long id){

        GroupEntity groupEntity = groupRepository.findByGroupCd(id);



        groupRepository.deleteById(id);
    }

    public List<GroupEntity> GroupRead(UserEntity user){

        return usersRepository.findByUserId(user.getUserId())
                .getMasters();
    }

    //그룹 검색
    public List<GroupEntity> groupSearch(String gName){


    return groupRepository.findBygNameLike("%"+gName+"%");

    }

    public Optional<GroupEntity> findGroup(GroupEntity groupEntity){

        return groupRepository.findById(groupEntity.getGroupCd());
    }

    public Boolean groupUpdate(GroupEntity groupEntity, long id){
        GroupEntity  thisBoardEntity = this.findGroupId(id);

        //GroupEntity updateGroupEntity = thisBoardEntity.get();

        thisBoardEntity.setGEx(groupEntity.getGEx());
        thisBoardEntity.setGName(groupEntity.getGName());
        thisBoardEntity.setGPic(groupEntity.getGPic());
        thisBoardEntity.setGState(groupEntity.getGState());

        groupRepository.save(thisBoardEntity);
        return  true;
    }

    //모든 공개그룹
    public List<GroupEntity> findAllPublicGroup()
    {
        return groupRepository.findAllBygState(true);
    }
}
