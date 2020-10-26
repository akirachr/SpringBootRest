import React from 'react';
import PropTypes from 'prop-types'
import { Formik } from "formik";
import {Accordion, Card, Button, Form, Row, Col, Table} from 'react-bootstrap';
import {TextField, InputAdornment, MenuItem} from '@material-ui/core';
import * as Yup from 'yup';
import Moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
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
			<Register />
			<EmployeeList employees={this.state.employees} />
			</div>
		)
	}
}

class Register extends React.Component {
	constructor(props) {
		super(props);
	}
	
	send(values) {
		fetch('/SQLite/employees', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)})
		.then(response => response.json());
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
						gender: '',
						gender: '',
						deliveryDate: Moment(new Date()).format('YYYY-MM-DD'),
					}
				}
				onSubmit={(values) => (this.send(values))}>
				{formik => (
					<Form noValidate onSubmit={formik.handleSubmit} className='book'>
						<Row style={{marginBottom: '10px'}}>
						<Col xs={1}></Col>
						<Col>
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
						</Col>
						<Col>
						{formik.errors["name"] && (<div>{formik.errors["name"]}</div>)}
						</Col>
						<Col></Col>
						</Row>
						<Row style={{marginBottom: '10px'}}>
						<Col xs={1}></Col>
						<Col>
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
						</Col>
						<Col>
						{formik.errors["gender"] && (<div>{formik.errors["gender"]}</div>)}
						</Col>					
						<Col></Col>
						</Row>
						<Row style={{marginBottom: '10px'}}>
						<Col xs={1}></Col>
						<Col>
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
						</Col>
						<Col>
						{formik.errors["deliveryDate"] && (<div>{formik.errors["deliveryDate"]}</div>)}
						</Col>
						<Col></Col>
						</Row>
						<Row>
						<Col xs={1}></Col>
						<Col>
						<Button variant='dark' type="submit" block >発注</Button>
						</Col>
						<Col>
						</Col>
						<Col></Col>
						</Row>
					</Form>
				)}
			</Formik>
		)
	}
}

class Modify extends React.Component {
	constructor(props) {
		super(props);
	}
	
	send(values) {
		fetch('/SQLite/employees/' + this.props.employee.id, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)})
		.then(response => response.json());
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
						id: '',
						name: '',
						gender: '',
						deliveryDate: Moment(new Date()).format('YYYY-MM-DD'),
					}
				}
				onSubmit={(values) => (this.send(values))}>
				{formik => (
					<Form noValidate onSubmit={formik.handleSubmit}>
						<Row style={{marginBottom: '10px'}}>
						<Col>
						{this.props.employee.name}
						</Col>
						<Col>
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
						</Col>
						<Col>
						{formik.errors["name"] && (<div>{formik.errors["name"]}</div>)}
						</Col>
						</Row>
						<Row style={{marginBottom: '10px'}}>
						<Col>
						{this.props.employee.gender ? this.props.employee.gender == '0' ? '男性' : '女性' : ''}
						</Col>
						<Col>
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
						</Col>
						<Col>
						{formik.errors["gender"] && (<div>{formik.errors["gender"]}</div>)}
						</Col>
						</Row>
						<Row style={{marginBottom: '10px'}}>
						<Col>
						{Moment(this.props.employee.deliveryDate, Moment.DATETIME_LOCAL).format('YYYY/MM/DD')}
						</Col>
						<Col>
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
						</Col>
						<Col>
						{formik.errors["deliveryDate"] && (<div>{formik.errors["deliveryDate"]}</div>)}
						</Col>
						</Row>
						<Row>
						<Col></Col>
						<Col>
						<Button variant='dark' type="submit" block >変更</Button>
						</Col>
						<Col></Col>
						</Row>
					</Form>
				)}
			</Formik>
		)
	}
}


class EmployeeList extends React.Component {
	constructor(props) {
		super(props);
	}
	
	delete(id) {
		fetch('/SQLite/employees/' + id, {method: 'DELETE', headers: {'Content-Type': 'application/json'}});
	}
	
	render() {
	
		const employees = this.props.employees.map((employee) => (
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey={employee.id}>
					<Table striped bordered hover>
						<tr>
						<td>ID</td><td>Name</td><td>Gender</td><td>Date</td><td></td>
						</tr>
						<tr>
							<td>{employee.id}</td>
							<td>{employee.name}</td>
							<td>{employee.gender ? employee.gender == '0' ? '男性' : '女性' : ''}</td>
							<td>{Moment(employee.deliveryDate, Moment.DATETIME_LOCAL).format('YYYY/MM/DD')}</td>
							<td>
								<Formik
									initialValues={
										{
											name: '',
										}
									}
									onSubmit={() => (this.delete(employee.id))}>
									{formik => (
										<Form noValidate onSubmit={formik.handleSubmit}>
										<Button variant='dark' type="submit" block >削除</Button>
										</Form>
									)}
								</Formik>
							</td>
						</tr>
					</Table>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={employee.id}>
					<Card.Body>
						<Modify employee={employee}/>
					</Card.Body>
            	</Accordion.Collapse>
			</Card>
		));
		
		return (
			<Accordion defaultActiveKey={employees.key}>
				{employees}
			</Accordion>
		)
	}
}

export default EMP;