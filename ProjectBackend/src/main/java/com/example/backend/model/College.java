package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String collegeName;

    private String region;
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Department> department;



}
