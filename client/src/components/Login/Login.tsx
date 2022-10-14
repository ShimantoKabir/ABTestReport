import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {Navigate} from "react-router-dom";
import AppAlert from "../Alert/AppAlert";
import {IOCode} from "../../common/IOCode";
import AppConstants from "../../common/AppConstants";
import {IOMsg} from "../../common/IOMsg";
import { withCookies, Cookies } from 'react-cookie';

interface LoginProps {
	cookies : Cookies;
}

class Login extends React.Component<LoginProps> {

	state = {
		username: "",
		password: "",
		redirect : "",
		alert: {
			heading: "",
			body: "",
			code: IOCode.EMPTY,
			state: false
		}
	}

	onSummit = () => {
		this.setState({
			alert: {
				heading: IOMsg.LOADING_HEAD,
				body: IOMsg.LOADING_MSG,
				code: IOCode.OK,
				state: true
			}
		});
		axios({
			method: 'POST',
			url: AppConstants.baseUrl+'user/login',
			headers : AppConstants.axiosHeader,
			data: {
				username: this.state.username,
				password: this.state.password
			},
			withCredentials : true
		})
		.then(res=>{
			if (res.data.code === IOCode.OK){
				this.props.cookies.set(
					AppConstants.loggedInCookieName,
					true,
					{
						path: '/'
					}
				);
				this.props.cookies.set(
					AppConstants.jwtCookieName,
					res.data.jwtToken,
					{
						path: '/'
					}
				);
				this.setState({
					alert: {
						heading: "",
						body: "",
						code: IOCode.EMPTY,
						state: false
					},
					redirect: "/"
				});
			}else {
				this.setState({
					alert: {
						heading: IOMsg.ERROR_HEAD,
						body: res.data.msg,
						code: IOCode.ERROR,
						state: true
					}
				});
			}
		}).catch(err=>{
			console.log(err);
			this.setState({
				alert: {
					heading: IOMsg.ERROR_HEAD,
					body: IOMsg.ERROR_BODY,
					code: IOCode.ERROR,
					state: true
				}
			});
		})
	}

	onAlertClose = () => {
		this.setState({
			alert: {
				heading: "",
				body: "",
				code: IOCode.EMPTY,
				state: false
			}
		});
	}

	render(): React.ReactNode {

		if (this.state.redirect === "/") {
			return <Navigate to={this.state.redirect} replace/>;
		}

		return (
			<main className="center-main" >
				<Container className="form-container" >
					<AppAlert
						heading={this.state.alert.heading}
	          body={this.state.alert.body}
	          code={this.state.alert.code}
	          state={this.state.alert.state}
	          onAlertClose={this.onAlertClose}
					/>
					<h3>Login</h3>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control
								value={this.state.username}
	              onChange={e => this.setState({username: e.target.value})}
	              type="text"
	              placeholder="Enter username"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								value={this.state.password}
								onChange={e => this.setState({password: e.target.value})}
								type="password"
								placeholder="Password"
							/>
						</Form.Group>
						<Button onClick={() => this.onSummit()} variant="primary">
							Submit
						</Button>
					</Form>
				</Container>
			</main>
		);
	}
}

export default withCookies(Login);
