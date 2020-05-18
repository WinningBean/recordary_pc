package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.ToDoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository extends JpaRepository<ToDoEntity, Long> {

}
