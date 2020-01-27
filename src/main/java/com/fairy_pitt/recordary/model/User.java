package com.fairy_pitt.recordary.model;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "USER_TB")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_CD")
    private Long userCd;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "USER_PW")
    private String userPw;

    @Column(name = "USER_NM")
    private String userNm;

    @Column(name = "USER_EX")
    private String userEx;
}
