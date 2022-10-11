import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

export default class TopNavBar extends React.Component{

	private readonly logoutBtn: React.RefObject<HTMLAnchorElement>;

	constructor(props: any) {
		super(props);
		this.logoutBtn = React.createRef();
	}

	logout = () => {
		axios({
			method: 'POST',
			url: 'http://localhost:3001/user/logout',
			headers : {
				'Content-Type': 'application/json',
			},
			withCredentials : true
		}).then(res=>{
			if (this.logoutBtn){
				this.logoutBtn.current?.click();
			}
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
							<Button onClick={()=>this.logout()} variant="primary" size="sm">
								Logout
							</Button>
							<Link ref={this.logoutBtn} to="/login" className="nav-link hide-logout" >
								Logout
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
