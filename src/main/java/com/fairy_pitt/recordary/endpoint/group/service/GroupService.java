package com.fairy_pitt.recordary.endpoint.group.service;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor// 검색해보기
@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository usersRepository;
    private final GroupMemberService groupMemberService;

    @Transactional
    public Long save(GroupSaveRequestDto requestDto)
    {
        return groupRepository.save(requestDto.toEntity())
                .getGroupCd();
    }

    @Transactional
    public Long updateGroupInfo(Long id, GroupUpdateRequestDto groupDto)
    {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupEntity.updateGroupInfo(groupDto.getGroupName(), groupDto.getGroupState(), groupDto.getGroupPic(), groupDto.getGroupEx());

        return id;
    }

    //그룹 방장 변경 -UserDto 만들어지고 가능함
/*    public Long changGroupMaster(UserEntity userEntity, Long groupCd)
    {
        GroupDto groupInfo = new GroupDto();
        GroupDto.updateGroupMasterBuilder().gMstUserFK(userEntity);
        groupInfo.setGMstUserFK(userEntity);
        groupInfo.setGMstUserFK(userEntity);
        return groupRepository.save(groupInfo.toEntity()).getGroupCd();
    }*/

    @Transactional
    public void delete (Long id) {
        GroupEntity groupEntity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        groupRepository.delete(groupEntity);
    }

    @Transactional(readOnly = true)
    public GroupResponseDto findById(Long id) {
        GroupEntity entity = groupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));

        return new GroupResponseDto(entity);
    }

//    public List<GroupMemberDto> findGroupMEmber(Long groupCd)
//    {
//        List<GroupMemberEntity> groupMemberList = groupRepository.findByGroupCd(groupCd).getMembers();
//
//    }

/*
    public GroupEntity fineById(Long groupCd)
    {
        return groupRepository.findByGroupCd(groupCd);
    }*/
}
/*
    @Autowired
    private final GroupRepository groupRepository;
    private final UserRepository usersRepository;
    private final GroupMemberService groupMemberService;

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
//        GroupEntity  thisBoardEntity = this.findGroupId(id);
//
//        //GroupEntity updateGroupEntity = thisBoardEntity.get();
//
//        thisBoardEntity.(groupEntity.getGEx());
//        thisBoardEntity.setGName(groupEntity.getGName());
//        thisBoardEntity.setGPic(groupEntity.getGPic());
//        thisBoardEntity.setGState(groupEntity.getGState());
//
//        groupRepository.save(thisBoardEntity);
         return  true;
    }

    //모든 공개그룹
    public List<GroupEntity> findAllPublicGroup()
    {
        return groupRepository.findAllBygState(true);
    }*/

