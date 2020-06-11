package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Getter
@Table(name = "Schedule_TB")
@NoArgsConstructor
@Entity
public class ScheduleEntity extends BaseTimeEntity{

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "SCHEDULE_CD")
   private Long scheduleCd;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "SCHEDULE_USER_FK")
   private  UserEntity userFk;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "SCHEDULE_GROUP_FK")
   private  GroupEntity groupFK;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "SCHEDULE_GB_FK")
   private ScheduleTabEntity tabFK;

   @Column(name = "SCHEDULE_NM")
   private String scheduleNm;

   @Column(name = "SCHEDULE_EX")
   private String scheduleEx;

   @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
   @Column(name = "SCHEDULE_STR_DT")
   private Date scheduleStr;

   @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
   @Column(name = "SCHEDULE_END_DT")
   private Date scheduleEnd;

   @Column(name = "SCHEDULE_COLOR")
   private String scheduleCol;

   @Column(name = "SCHEDULE_PB_ST")
   private int schedulePublicState;

   @JsonIgnore
   @OneToMany(fetch = FetchType.LAZY, mappedBy = "scheduleFK", cascade = CascadeType.REMOVE)
   private List<ScheduleMemberEntity> scheduleMembers = new ArrayList<>();

   @Builder
   public ScheduleEntity(ScheduleTabEntity tabFK,
                         UserEntity userFK,
                         GroupEntity groupFK,
                         String scheduleNm,
                         String scheduleEx,
                         Date scheduleStr,
                         Date scheduleEnd,
                         String scheduleCol,
                         int schedulePublicState){

      this.tabFK = tabFK;
      this.userFk = userFK;
      this.groupFK = groupFK;
      this.scheduleNm = scheduleNm;
      this.scheduleEx = scheduleEx;
      this.scheduleStr = scheduleStr;
      this.scheduleEnd = scheduleEnd;
      this.scheduleCol = scheduleCol;
      this.schedulePublicState = schedulePublicState;
   }

   public void updateSchedule(ScheduleTabEntity TabCodeFK,
                              String scheduleNm,
                              String scheduleEx,
                              Date scheduleStr,
                              Date scheduleEnd,
                              String scheduleCol,
                              int schedulePublicState){
      this.tabFK = TabCodeFK;
      this.scheduleNm = scheduleNm;
      this.scheduleEx = scheduleEx;
      this.scheduleStr = scheduleStr;
      this.scheduleEnd = scheduleEnd;
      this.scheduleCol = scheduleCol;
      this.schedulePublicState = schedulePublicState;
   }
   //private String scheduleLocation;

//   @OneToOne(fetch = FetchType.LAZY, mappedBy = "scheduleFK")
//   private List<PostEntity> postList;
}
