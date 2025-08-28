package com.example.backend.service;

import com.example.backend.model.Student;
import com.example.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(int id, Student student) {
        student.setId((int) id);
        return studentRepository.save(student);
    }

    public void deleteStudent(int id) {
        studentRepository.deleteById((int) id);
    }

    public Student login(String email, String password) {
        return studentRepository.findByEmailAndPassword(email, password).orElse(null);
    }
}
