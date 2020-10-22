import React from 'react';
import { Formik } from "formik";
import {Button, Form, Row} from 'react-bootstrap';
import {TextField, InputAdornment, MenuItem} from '@material-ui/core';
import * as Yup from 'yup';
import Moment from 'moment';
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
	
	componentDidUpdate() {
		fetch('/SQLite/employees')
		.then(response => response.json())
		.then(employees => this.setState({ employees }));
	}
	
	render() {
		return (
			<div>
			<EmployeeList employees={this.state.employees} />
			<Register />
			</div>
		)
	}
}

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {employees: []};
	}
	
	send(values) {
		fetch('/SQLite/employees', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)})
		.then(response => response.json())
		.then(employees => this.setState({ employees }));
	}

	render() {
		return (
			<Formik
			validationSchema={
				Yup.object({
				name: Yup.string().required('氏名を入力してください。'),
				gender: Yup.string().required('性別を入力してください。'),
				deliveryDate: Yup.string().required('年月日を入力してください。')
				})
			}
			initialValues={
				{
					name: this.state.employees.name,
					gender: this.state.employees.gender,
					deliveryDate: Moment(new Date()).format('YYYY-MM-DD'),
				}
			}
			onSubmit={(values) => (this.send(values))}>
			{formik => (
				<Form noValidate onSubmit={formik.handleSubmit}>
					<Row style={{marginBottom: '10px'}}>
					<TextField
						InputProps={{
							startAdornment: <InputAdornment position='start'>氏名：</InputAdornment>,
							readOnly: false,
						}}
						size='small'
						variant='outlined'
						name='name'
						defaultValue=''
						onChange={formik.handleChange}
					/>
					<Form.Control.Feedback type="invalid">
						{formik.errors.name}
					</Form.Control.Feedback>
					</Row>
					<Row style={{marginBottom: '10px'}}>
					<TextField
						InputProps={{
							startAdornment: <InputAdornment position='start'>性別：</InputAdornment>,
							readOnly: false,
						}}
						size='small'
						variant='outlined'
						name='gender'
						defaultValue=''
						onChange={formik.handleChange}
						select
					>
					<MenuItem key='0' value='0'>
						0:男性
					</MenuItem>
					<MenuItem key='1' value='1'>
						1:女性
					</MenuItem>
					</TextField>
					<Form.Control.Feedback type="invalid">
						{formik.errors.gender}
					</Form.Control.Feedback>
					</Row>
					<Row style={{marginBottom: '10px'}}>
					<TextField
						InputProps={{
							startAdornment: <InputAdornment position='start'>年月日：</InputAdornment>,
							readOnly: false,
						}}
						size='small'
						variant='outlined'
						name='deliveryDate'
						defaultValue={formik.values.deliveryDate}
						onChange={formik.handleChange}
						type='date'
					/>
					<Form.Control.Feedback type="invalid">
						{formik.errors.deliveryDate}
					</Form.Control.Feedback>
					</Row>
					<Button variant='dark' type="submit" block >発注</Button>
				</Form>
			)
			}
			</Formik>
		)
	}
}

class EmployeeList extends React.Component {
	render() {
		const employees = this.props.employees.map((employee) => (<Employee employee={employee} key={employee.id} />));
		
		return (
			<table className="book">
				<tbody>
				<tr><td>ID</td><td>Name</td><td>Gender</td><td>Date</td></tr>
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
			<td>{this.props.employee.gender ? this.props.employee.gender == '0' ? '男性' : '女性' : ''}</td>
			<td>{Moment(this.props.employee.deliveryDate, Moment.DATETIME_LOCAL).format('YYYY/MM/DD')}</td>
			</tr>
		)
	}
}

export default EMP;