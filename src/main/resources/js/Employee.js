import React from 'react'
import './index.css'

class EMP extends React.Component {
	constructor(props) {
		super(props);
		this.state = {employees: []}
	}
	
	componentDidMount() {
		fetch('http://localhost:8080/SQLite/employees')
      .then(response => response.json())
      .then(employees => this.setState({ employees }));
	}
	
	render() {
		return (
			<EmployeeList employees={this.state.employees}/>
		)
	}
}

class EmployeeList extends React.Component {
	render() {
		const employees = this.props.employees.map(employee => <Employee employee={employee} />);
		
		return (
			<table className="book">
				<tr><td>ID</td><td>Name</td></tr>
				{employees}
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