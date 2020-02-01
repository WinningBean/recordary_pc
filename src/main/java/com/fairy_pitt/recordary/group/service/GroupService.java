package com.fairy_pitt.recordary.group.service;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group.repository.GroupRepository;
import com.fairy_pitt.recordary.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public Boolean groupCreate(GroupEntity groupEntity){
        Optional<GroupEntity> resultGroupEntity = Optional.of(groupRepository.save(groupEntity));

        if(resultGroupEntity.isPresent()) {
            return true;
        }else{
            return  false;
        }
    }

//   public void GroupDelete(GroupEntity groupEntity){
//       groupRepository.delete(groupEntity);
//    }
//
    public List<GroupEntity> GroupRead(Users user){

        return groupRepository.findByGMstUserFK(user);
    }

//    public List<GroupEntity> groupSearch(String groupName){
//    return groupRepository.findByGNameLike("%"+groupName+"%");
//    }


}
