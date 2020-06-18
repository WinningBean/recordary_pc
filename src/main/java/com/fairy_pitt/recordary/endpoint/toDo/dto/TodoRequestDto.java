package com.fairy_pitt.recordary.endpoint.toDo.dto;

import com.fairy_pitt.recordary.common.domain.ToDoEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class TodoRequestDto {

    private Long userCd;
    private  String toDoContent;
    private String toDoCol;
    private Date toDoEndDate;
    private Boolean toDoSate;

    @Builder
    public  TodoRequestDto( Long userCd,
                            String toDoContent,
                            Date toDoEndDate,
                            String toDoCol,
                            Boolean toDoSate)
    {
        this.userCd = userCd;
        this.toDoContent = toDoContent;
        this.toDoEndDate = toDoEndDate;
        this.toDoCol = toDoCol;
        this.toDoSate = toDoSate;
    }

    public ToDoEntity toEntity(UserEntity user)
    {
        return  ToDoEntity.builder()
                .user(user)
                .toDoEndDate(toDoEndDate)
                .toDoCol(toDoCol)
                .ToDoCompleteState(false)
                .toDoContent(toDoContent)
                .build();
    }

}
