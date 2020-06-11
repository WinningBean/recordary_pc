package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GroupRequestDto {

    private Long userCd;
    private String groupNm;
    private Boolean groupState;
    private String groupEx;
    private String groupPic;

   @Builder(builderClassName = "createGroupBuilder", builderMethodName = "createGroupBuilder")
   public GroupRequestDto(Long userCd, String groupNm, Boolean groupState, String groupPic, String  groupEx)
   {
      this.userCd = userCd;
      this.groupNm = groupNm;
      this.groupState = groupState;
      this.groupPic = groupPic;
      this.groupEx = groupEx;
   }

    @Builder(builderClassName = "updateGroupBuilder", builderMethodName = "updateGroupBuilder")
    public GroupRequestDto(String groupNm, Boolean groupState, String groupPic, String  groupEx)
    {
        this.groupNm = groupNm;
        this.groupState = groupState;
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
