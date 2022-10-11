import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";


export default class Login extends React.Component {

	state = {
		username: "",
		password: ""
	}

	onSummit = () => {
		axios({
			method: 'POST',
			url: 'http://localhost:3001/user/login',
			headers : {
				'Content-Type': 'application/json',
			},
			data: {
				username: this.state.username,
				password: this.state.password
			},
			withCredentials : true
		}).then(res=>{

		}).catch(err=>{

		})
	}

	render(): React.ReactNode {
		return (
			<Container className="form-container" >
				<h3>Login</h3>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control value={this.state.username}
              onChange={e => this.setState({username: e.target.value})}
              type="text"
              placeholder="Enter username"/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={this.state.password}
							onChange={e => this.setState({password: e.target.value})}
							type="password"
							placeholder="Password"/>
					</Form.Group>
					<Button onClick={() => this.onSummit()} variant="primary">
						Submit
					</Button>
				</Form>
			</Container>
		);
	}
}
