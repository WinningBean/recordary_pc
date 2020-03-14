package com.fairy_pitt.recordary.dto.group;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Setter
public class GroupDto {

    private UserEntity gMstUserFK;
    private String groupName;
    private Boolean groupState;
    private String groupEx;
    private String groupPic;

   @Builder(builderClassName = "createGroupBuilder", builderMethodName = "createGroupBuilder")
   public GroupDto(UserEntity gMstUserFK, String groupName, Boolean groupState, String groupPic, String  groupEx)
   {
      this.gMstUserFK = gMstUserFK;
      this.groupName = groupName;
      this.groupState = groupState;
      this.groupPic = groupPic;
      this.groupEx = groupEx;
   }

    @Builder(builderClassName = "updateGroupBuilder", builderMethodName = "updateGroupBuilder")
    public GroupDto(String groupName, Boolean groupState, String groupPic, String  groupEx)
    {
        this.groupName = groupName;
        this.groupState = groupState;
        this.groupPic = groupPic;
        this.groupEx = groupEx;
    }

    @Builder(builderClassName = "updateGroupMasterBuilder", builderMethodName = "updateGroupMasterBuilder")
    public GroupDto(UserEntity gMstUserFK)
    {
        this.gMstUserFK = gMstUserFK;
    }

   public GroupEntity toEntity(){
    return GroupEntity.builder()
            .gMstUserFK(gMstUserFK)
            .groupEx(groupEx)
            .groupName(groupName)
            .groupState(groupState)
            .groupPic(groupPic)
            .build();
   }
}
