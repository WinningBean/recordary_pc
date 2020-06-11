package com.fairy_pitt.recordary.endpoint.toDo.dto;

import com.fairy_pitt.recordary.common.entity.ToDoEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class TodoRequestDto {

    private Long userCd;
    private  String toDoContent;
    private String toDoCol;
    private Date toDoEndDate;

    @Builder
    public  TodoRequestDto( Long userCd,
                            String toDoContent,
                            Date toDoEndDate,
                            String toDoCol)
    {
        this.userCd = userCd;
        this.toDoContent = toDoContent;
        this.toDoEndDate = toDoEndDate;
        this.toDoCol = toDoCol;
    }

    public ToDoEntity toEntity(UserEntity user)
    {
        return  ToDoEntity.builder()
                .user(user)
                .toDoEndDate(toDoEndDate)
                .toDoCol(toDoCol)
                .toDoContent(toDoContent)
                .build();
    }

}
