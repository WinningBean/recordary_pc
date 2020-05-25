package com.fairy_pitt.recordary.endpoint.user.dto;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleTabResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UserProfileResponseDto {
    private UserResponseDto userDto;
    private int followerCount;
    private int followingCount;
    private List<ScheduleTabResponseDto> scheduleTabDto;

    public UserProfileResponseDto(UserEntity userEntity){
        this.userDto = new UserResponseDto(userEntity);
        this.followerCount = (userEntity.getFollowTarget()).size();
        this.followingCount = (userEntity.getFollowUser()).size();
        this.scheduleTabDto = userEntity.getUserScheduleTab().stream()
                .map(ScheduleTabResponseDto::new)
                .collect(Collectors.toList());
    }
}
