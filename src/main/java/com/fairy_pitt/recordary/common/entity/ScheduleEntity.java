package com.fairy_pitt.recordary.common.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Getter
@Table(name = "Schedule_TB")
@NoArgsConstructor
@Entity
public class ScheduleEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "SCHEDULE_CD")
   private Long scheduleCd;

   @ManyToOne
   private  UserEntity userFk;

   @ManyToOne
   private ScheduleTabEntity tabFK;

   @OneToOne
   private PostEntity postFK;

   @Column(name = "SCHEDULE_NM")
   private String scheduleNm;

   @Column(name = "SCHEDULE_EX")
   private String scheduleEx;

   @Column(name = "SCHEDULE_STR_DT")
   private Date scheduleStr;

   @Column(name = "SCHEDULE_END_DT")
   private Date scheduleEnd;

   @Column(name = "SCHEDULE_COLOR")
   private String scheduleCol;

   @Column(name = "POST_PB_ST")
   private int schedulePublicState;

   @OneToMany(fetch = FetchType.LAZY, mappedBy = "scheduleFK")
   private List<ScheduleMemberEntity> scheduleMembers;

   @Builder
   public ScheduleEntity(ScheduleTabEntity tabFK,
                         UserEntity userFK,
                         PostEntity postFK,
                         String scheduleNm,
                         String scheduleEx,
                         Date scheduleStr,
                         Date scheduleEnd,
                         String scheduleCol,
                         int schedulePublicState){

      this.tabFK = tabFK;
      this.userFk = userFK;
      this.postFK = postFK;
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
                              String scheduleCol){
      this.tabFK = TabCodeFK;
      this.scheduleNm = scheduleNm;
      this.scheduleEx = scheduleEx;
      this.scheduleStr = scheduleStr;
      this.scheduleEnd = scheduleEnd;
      this.scheduleCol = scheduleCol;
   }
   //private String scheduleLocation;

//   @OneToOne(fetch = FetchType.LAZY, mappedBy = "scheduleFK")
//   private List<PostEntity> postList;
}
