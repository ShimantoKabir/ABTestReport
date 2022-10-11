import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

export default class TopNavBar extends React.Component{

	logout = () => {
		let navigate = useNavigate();
		axios({
			method: 'POST',
			url: 'http://localhost:3001/user/logout',
			headers : {
				'Content-Type': 'application/json',
			},
			withCredentials : true
		}).then(res=>{
			alert("Logout successful!")
			navigate.push("/logout")
		}).catch(err=>{
			alert("Logout unsuccessful!")
		})
	}

	render() : React.ReactNode{
		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container fluid>
					<Link className="navbar-brand" to="/">ABTestReport</Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto"></Nav>
						<Nav>
							<Link to="/site" className="nav-link" >Site</Link>
							<Link to="/report" className="nav-link" >Report</Link>
							<Link to="/login" className="nav-link" >Login</Link>
							<Link to="/registration" className="nav-link" >Registration</Link>
							<a onClick={()=>this.logout()} className="nav-link app-cursor" >Logout</a>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
