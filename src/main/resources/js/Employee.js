import React from 'react';
import { Formik } from "formik";
import './index.css';

class EMP extends React.Component {
	constructor(props) {
		super(props);
		this.state = {employees: []}
	}
	
	componentDidMount() {
		fetch('/SQLite/employees')
		.then(response => response.json())
		.then(employees => this.setState({ employees }));
	}
	
	send(values) {
		fetch('/SQLite/employees', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)})
		.then(response => response.json())
		.then(employees => this.setState({ employees }));
	}
	
	render() {
		return (
			<div>
			<EmployeeList employees={this.state.employees}/>
			<AAA/>
			</div>
		)
	}
}

class AAA extends React.Component {
	send(values) {
		fetch('/SQLite/employees', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)})
		.then(response => response.json())
		.then(employees => this.setState({ employees }));
	}
	render() {
		return (
			<Formik initialValues={{name: ""}} onSubmit={values => this.send(values)}
			render={(props) => (
				<form onSubmit={props.handleSubmit}>
				<input name="name" value={props.values.name} onChange={props.handleChange} />
				<button type="submit">Submit</button>
				</form>
			)}
			/>
		)
	}
}

class EmployeeList extends React.Component {
	render() {
		const employees = this.props.employees.map(employee => <Employee employee={employee} key={employee.id} />);
		
		return (
			<table className="book">
				<tbody>
				<tr><td>ID</td><td>Name</td></tr>
				{employees}
				</tbody>
			</table>
		)
	}
}

class Employee extends React.Component {
	render() {
		return (
			<tr>
			<td>{this.props.employee.id}</td>
			<td>{this.props.employee.name}</td>
			</tr>
		)
	}
}

export default EMP;