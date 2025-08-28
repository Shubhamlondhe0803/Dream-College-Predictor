package com.example.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private double cetMark;
    private String Caste;

}
