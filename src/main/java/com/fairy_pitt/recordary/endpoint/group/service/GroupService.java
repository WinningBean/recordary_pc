package com.fairy_pitt.recordary.endpoint.group.service;

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

    public GroupEntity groupCreate(GroupEntity groupEntity){
        GroupEntity resultGroupEntity = groupRepository.save(groupEntity);
        return resultGroupEntity;
    }

   public void GroupDelete(long id){
        groupRepository.deleteById(id);
    }

    public List<GroupEntity> GroupRead(UserEntity user){

        return usersRepository.findByUserId(user.getUserId())
                .getMasters();
    }

    public List<GroupEntity> groupSearch(String gName){

    return groupRepository.findBygNameLike("%"+gName+"%");

    }

    public Optional<GroupEntity> findGroup(GroupEntity groupEntity){
        return groupRepository.findById(groupEntity.getGroupCd());
    }



    //Check groupMaster
    //Check groupMember


}
