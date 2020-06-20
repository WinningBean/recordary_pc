package com.fairy_pitt.recordary.common.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "TODO_TB")
@Entity
public class ToDoEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TODO_CD")
    private Long toDoCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TODO_USER_FK", nullable = false)
    private UserEntity userFK;

    @Column(name = "TODO_CONTENT", nullable = false)
    private String toDoContent;

    @Column(name = "TODO_END_DT", nullable = false)
    private Date toDoEndDate;

    @Column(name = "TODO_COLOR")
    private String toDoCol;

    @Column(name = "TODO_COMPLETE_ST", nullable = false)
    private  Boolean ToDoCompleteState;

    @Builder
    public ToDoEntity(UserEntity user,
                      String toDoContent,
                      Date toDoEndDate,
                      String toDoCol,
                      Boolean ToDoCompleteState) {

        this.userFK = user;
        this.toDoContent = toDoContent;
        this.toDoEndDate = toDoEndDate;
        this.toDoCol = toDoCol;
        this.ToDoCompleteState = ToDoCompleteState;
    }

    public void updateToDo(String toDoContent,
                           Date toDoEndDate,
                           String toDoCol)
    {
        this.toDoContent = toDoContent;
        this.toDoEndDate = toDoEndDate;
        this.toDoCol = toDoCol;
    }

    public  void updateToDoState(Boolean toDoCompleteState){
        this.ToDoCompleteState = toDoCompleteState;
    }

}