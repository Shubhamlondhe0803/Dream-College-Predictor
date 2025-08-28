package com.example.backend.controller;


import com.example.backend.model.College;
import com.example.backend.model.Criteria;
import com.example.backend.model.Department;
import com.example.backend.service.CollegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/college")
@CrossOrigin(origins = "*")
public class CollegeController {

    @Autowired
    private CollegeService collegeService;


    @PostMapping("/addmultiplecollege")
    public ResponseEntity<String> addMultipleCollege(@RequestBody List<College> college) {
      String response= this.collegeService.addMultipleCollege(college);
      return  new ResponseEntity<String>(response,HttpStatus.CREATED);

    }

    @PostMapping("/")
    public ResponseEntity<College> addNewCollege(@RequestBody College college){
        College college1 = this.collegeService.AddNewCollege(college);
        return  new ResponseEntity<>(college1, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<College>> findAllCollege(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department) {

        List<College> allColleges = this.collegeService.findAllCollege();

        List<College> filteredColleges = allColleges.stream()
                .filter(c -> (region == null || c.getRegion().equalsIgnoreCase(region)))
                .filter(c -> (department == null ||
                        c.getDepartment().stream()
                                .anyMatch(d -> d.getTitle().equalsIgnoreCase(department))))
                .collect(Collectors.toList());

        return new ResponseEntity<>(filteredColleges, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<College>> filterColleges(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String departmentTitle,
            @RequestParam(required = false) String caste,
            @RequestParam(required = false) Double cetMark) {

        List<College> colleges = collegeService.filterColleges(region, departmentTitle, caste, cetMark);
        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/region")
    public ResponseEntity<List<String>> findAllRegion() {
        List<College> allCollege = this.collegeService.findAllCollege();

        // Extract unique region names
        List<String> regions = allCollege.stream()
                .map(college -> college.getRegion().toLowerCase() ) // get region from each college
                .distinct()             // remove duplicates
                .collect(Collectors.toList());

        return ResponseEntity.ok(regions);
    }


    @GetMapping("/departments")
    public ResponseEntity<List<String>> findAllDepartments() {
        List<College> allCollege = this.collegeService.findAllCollege();

        // Extract department titles
        List<String> departments = allCollege.stream()
                .flatMap(college -> college.getDepartment().stream()) // flatten department list
                .map(department -> department.getTitle().toLowerCase()) // take department name
                .distinct()
                .collect(Collectors.toList());

        return ResponseEntity.ok(departments);
    }

    @GetMapping("/caste")
    public ResponseEntity<List<String>> findAllCaste() {
        List<College> allCollege = this.collegeService.findAllCollege();

        List<String> casteList = allCollege.stream()
                .flatMap(college -> college.getDepartment().stream())   // inside departments
                .flatMap(dept -> dept.getCriteria().stream())           // inside criteria
                .map(criteria -> criteria.getCaste().toLowerCase())     // normalize to lowercase
                .distinct()
                .collect(Collectors.toList());


        return ResponseEntity.ok(casteList);
    }



}
