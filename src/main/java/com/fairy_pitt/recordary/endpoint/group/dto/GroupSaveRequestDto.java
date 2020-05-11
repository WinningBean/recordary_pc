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

    private Long userCd;
    private String groupNm;
    private Boolean groupState;
    private String groupEx;
    private String groupPic;

   @Builder(builderClassName = "createGroupBuilder", builderMethodName = "createGroupBuilder")
   public GroupSaveRequestDto(Long userCd,String groupNm, Boolean groupState, String groupPic, String  groupEx)
   {
      this.userCd = userCd;
      this.groupNm = groupNm;
      this.groupState = groupState;
      this.groupPic = groupPic;
      this.groupEx = groupEx;
   }

   public GroupEntity toEntity(UserEntity user, String url){
    return GroupEntity.builder()
            .gMstUserFK(user)
            .groupEx(groupEx)
            .groupNm(groupNm)
            .groupState(groupState)
            .groupPic(url)
            .build();
   }
}
