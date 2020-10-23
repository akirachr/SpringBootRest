package com.luminous.spring.rest.model;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.luminous.spring.rest.bean.Employee;
import com.luminous.spring.rest.repository.EmployeeRepository;

@Component
public class EmployeeService {

	private final EmployeeRepository _repository;
	
	public EmployeeService(EmployeeRepository repository) {
		_repository = repository;
	}

	@Transactional
	public List<Employee> findAll() {
		return _repository.findAll();
	}

	@Transactional
	public Employee newEmployee(@RequestBody Employee newEmployee) {
		return _repository.save(newEmployee);
	}

	@Transactional
	public void deleteEmployee(@PathVariable Long id) {
		_repository.deleteById(id);
	}
	
	public Employee replaceEmployee(Employee newEmployee, Long id) {
		return _repository.findById(id)
		.map(employee -> {
			employee.setName(newEmployee.getName());
			employee.setGender(newEmployee.getGender());
			employee.setDeliveryDate(newEmployee.getDeliveryDate());
			return _repository.save(employee);
		})
		.orElseGet(() -> {
			newEmployee.setId(id);
			return _repository.save(newEmployee);
		});
	}
}
