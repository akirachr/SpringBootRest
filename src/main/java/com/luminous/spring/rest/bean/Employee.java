package com.luminous.spring.rest.bean;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Employee {
	private @Id @GeneratedValue Long _id;
	private String _name;

	public Employee() {
	}
	
	public Employee(String name) {
		setName(name);
	}

	public Long getId() {
		return _id;
	}
	public void setId(Long id) {
		_id = id;
	}
	
	public String getName() {
		return _name;
	}
	public void setName(String name) {
		_name = name;
	}
}