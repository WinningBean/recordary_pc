package com.fairy_pitt.recordary.endpoint.toDo.dto;

import com.fairy_pitt.recordary.common.entity.ToDoEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ToDoResponseDto {

    private Long toDoCd;
    private String toDoContent;
    private String  toDoCol;
    private Date toDoEndDate;
    private Boolean toDoCompleteState;

    public ToDoResponseDto(ToDoEntity entity)
    {
        this.toDoCd = entity.getToDoCd();
        this.toDoCol = entity.getToDoCol();
        this.toDoCompleteState = entity.getToDoCompleteState();
        this.toDoContent = entity.getToDoContent();
        this.toDoEndDate = entity.getToDoEndDate();
    }
}
