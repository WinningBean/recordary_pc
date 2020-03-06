package com.fairy_pitt.recordary.common.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "Schedule_TB")
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "SCHEDULE_CD")
   private Long scheduleCd;

   @ManyToOne
   private ScheduleTabEntity TabCodeFK;

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

   //private String scheduleLocation;

   @OneToMany(fetch = FetchType.LAZY, mappedBy = "scheduleFK")
   private List<PostEntity> postList;
}
