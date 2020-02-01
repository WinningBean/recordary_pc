package com.fairy_pitt.recordary.group.service;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group.repository.GroupRepository;
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

//   public void GroupDelete(long cd){
//
//    }
//
//    public Optional<GroupEntity> groupFindById(long id){
//        return groupRepository.findByGroupCd(id);
//    }
//
//    public List<GroupEntity> groupSearch(String groupName){
//    return groupRepository.findByGNameLike("%"+groupName+"%");
//    }


}
