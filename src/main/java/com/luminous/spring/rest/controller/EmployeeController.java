package com.luminous.spring.rest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.luminous.spring.rest.bean.Employee;
import com.luminous.spring.rest.exception.EmployeeNotFoundException;
import com.luminous.spring.rest.repository.EmployeeRepository;

@RestController
class EmployeeController {

	private final EmployeeRepository _repository;

	EmployeeController(EmployeeRepository repository) {
		_repository = repository;
	}

	@GetMapping("/employees")
	List<Employee> all() {
		return _repository.findAll();
	}

	@GetMapping("/load")
	void load() {
		_repository.save(new Employee("Mike"));
	}

	@PostMapping("/employees")
	Employee newEmployee(@RequestBody Employee newEmployee) {
		return _repository.save(newEmployee);
	}

	@GetMapping("/employees/{id}")
	Employee one(@PathVariable Long id) {
		return _repository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
	}

	@PutMapping("/employees/{id}")
	Employee replaceEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {
		return _repository.findById(id)
				.map(employee -> {
					employee.setName(newEmployee.getName());
					return _repository.save(employee);
				})
				.orElseGet(() -> {
					newEmployee.setId(id);
					return _repository.save(newEmployee);
				});
	}

	@DeleteMapping("/employees/{id}")
		void deleteEmployee(@PathVariable Long id) {
		_repository.deleteById(id);
	}
}