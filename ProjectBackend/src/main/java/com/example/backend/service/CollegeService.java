package com.example.backend.service;


import com.example.backend.model.College;
import com.example.backend.repository.CollegeRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollegeService {
    @Autowired
    private CollegeRespository collegeRespository;

     public College AddNewCollege(College college){
         College byCollegeName = this.collegeRespository.findByCollegeName(college.getCollegeName());
         if(byCollegeName !=null){
             System.out.println("College is alredy exit with given name");
         }
         this.collegeRespository.save(college);
         return  college;
     }

    public List<College> findAllCollege() {
         return this.collegeRespository.findAll();
    }

    public List<College> filterColleges(String region, String departmentTitle, String caste, Double cetMark) {

         return   this.collegeRespository.filterColleges(region,departmentTitle,caste,cetMark);
    }

    public String addMultipleCollege(List<College> list) {

        List<College> colleges = this.collegeRespository.saveAll(list);
        return "College Added successfully";
    }
}
