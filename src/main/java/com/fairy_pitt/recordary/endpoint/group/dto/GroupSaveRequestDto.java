package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class GroupSaveRequestDto {

    private String userId;
    private String groupName;
    private Boolean groupState;
    private String groupEx;
    private String groupPic;

   @Builder(builderClassName = "createGroupBuilder", builderMethodName = "createGroupBuilder")
   public GroupSaveRequestDto(String userId, String groupName, Boolean groupState, String groupPic, String  groupEx)
   {
      this.userId = userId;
      this.groupName = groupName;
      this.groupState = groupState;
      this.groupPic = groupPic;
      this.groupEx = groupEx;
   }

   public GroupEntity toEntity(UserEntity user){
    return GroupEntity.builder()
            .gMstUserFK(user)
            .groupEx(groupEx)
            .groupName(groupName)
            .groupState(groupState)
            .groupPic(groupPic)
            .build();
   }
}
