package com.luminous.spring.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luminous.spring.rest.bean.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
