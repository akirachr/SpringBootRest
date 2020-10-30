import React, {Component} from 'react';
import EMP from './Employee.js';
import Create from './Create.js';
import Change from './Change.js';
import {Container, Nav, Badge, Tab, Card} from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import {AddCircleOutline, Edit, Search} from '@material-ui/icons';
import {BottomNavigation} from '@material-ui/core';

class App extends Component{
	constructor(props){
		super(props);
			this.state={
				key: 'home',
			};
	}


	render(){
		return(
				<Tab.Container id="left-tabs-example" defaultActiveKey="home" transition={false}>
					<Card
						bg='dark'
						className="mb-2"
						text='light'
						border='light'
						>
					    <Card.Header>
							<Nav variant="tabs" className="mr-auto" onSelect={(selectedKey) => this.setState({key: selectedKey})}>
								<Nav.Item as={Badge}>
									<Nav.Link disabled><strong style={{fontSize: '16px', color: 'white'}}>Goodyearタイヤ保管サービス</strong></Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="home">社員管理</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="create">Create</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="change">Change</Nav.Link>
								</Nav.Item>
							</Nav>
					    </Card.Header>
					</Card>
					<Tab.Content>
						<Tab.Pane eventKey="home">
							<h2>
								<Chip color="primary" icon={<Search />} label='社員管理' />
							</h2>
							{this.state.key === 'home' && <EMP/>}
						</Tab.Pane>
						<Tab.Pane eventKey="create">
							<h2>
								<Chip color="primary" icon={<AddCircleOutline />} label='Create' />
							</h2>
							{this.state.key === 'create' && <Create/>}
						</Tab.Pane>
						<Tab.Pane eventKey="change">
							<h2>
								<Chip color="primary" icon={<Edit />} label='Change' />
							</h2>
							{this.state.key === 'change' && <Change/>}
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
		);
	}
}

export default App;
