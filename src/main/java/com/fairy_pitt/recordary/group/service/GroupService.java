package com.fairy_pitt.recordary.group.service;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group.repository.GroupRepository;
import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
import javafx.scene.Group;
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
    private final UsersRepository usersRepository;

    public GroupEntity groupCreate(GroupEntity groupEntity){
        GroupEntity resultGroupEntity = groupRepository.save(groupEntity);
        return resultGroupEntity;
    }

   public void GroupDelete(long id){
        groupRepository.deleteById(id);
    }

    public List<GroupEntity> GroupRead(Users user){

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
