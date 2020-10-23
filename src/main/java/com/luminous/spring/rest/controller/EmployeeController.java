package com.luminous.spring.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.luminous.spring.rest.bean.Employee;
import com.luminous.spring.rest.exception.EmployeeNotFoundException;
import com.luminous.spring.rest.model.EmployeeService;

@RestController
class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	
	@GetMapping("/employees")
	List<Employee> all() {
		return employeeService.findAll();
	}

	@PostMapping("/employees")
	Employee newEmployee(@RequestBody Employee newEmployee) {
		return employeeService.newEmployee(newEmployee);
	}

//	@GetMapping("/employees/{id}")
//	Employee one(@PathVariable Long id) {
//		return _repository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
//	}

	@PutMapping("/employees/{id}")
	Employee replaceEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {
		return employeeService.replaceEmployee(newEmployee, id);
	}

	@DeleteMapping("/employees/{id}")
	void deleteEmployee(@PathVariable Long id) {
		employeeService.deleteEmployee(id);
	}
}