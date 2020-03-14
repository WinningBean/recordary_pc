package com.fairy_pitt.recordary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing // JPA Auditing 활성화
@SpringBootApplication
public class RecordaryApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecordaryApplication.class, args);
    }
}
