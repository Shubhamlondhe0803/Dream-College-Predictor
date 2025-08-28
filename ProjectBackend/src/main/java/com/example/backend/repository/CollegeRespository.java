package com.example.backend.repository;

import com.example.backend.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CollegeRespository extends JpaRepository<College,Long> {
   public College findByCollegeName(String name);
   @Query("SELECT DISTINCT c FROM College c " +
           "JOIN c.department d " +
           "JOIN d.Criteria cr " +
           "WHERE (:region IS NULL OR LOWER(c.region) = LOWER(:region)) " +
           "AND (:departmentTitle IS NULL OR LOWER(d.title) = LOWER(:departmentTitle)) " +
           "AND (:caste IS NULL OR LOWER(cr.Caste) = LOWER(:caste)) " +
           "AND (:cetMark IS NULL OR cr.cetMark <= :cetMark)")
   List<College> filterColleges(
           @Param("region") String region,
           @Param("departmentTitle") String departmentTitle,
           @Param("caste") String caste,
           @Param("cetMark") Double cetMark
   );
}


