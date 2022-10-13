import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import { withCookies, Cookies } from 'react-cookie';
import AppConstants from "../../common/AppConstants";

interface TopNavBarProps {
	cookies : Cookies;
}

class TopNavBar extends React.Component<TopNavBarProps>{

	private readonly logoutBtn: React.RefObject<HTMLAnchorElement>;

	constructor(props: any) {
		super(props);
		this.logoutBtn = React.createRef();
	}

	state = {
		isLoggedIn : false
	}

	componentDidMount() {
		this.props.cookies.addChangeListener((opt)=>{
			if (opt.name === AppConstants.loggedInCookieName){
				this.setState({
					isLoggedIn : opt.value
				})
			}
		});
	}

	logout = () => {
		axios({
			method: 'POST',
			url: AppConstants.baseUrl+'user/logout',
			headers : AppConstants.getAxiosHeader(),
			withCredentials : true
		}).finally(()=>{
			if (this.logoutBtn){
				this.props.cookies.remove(AppConstants.jwtCookieName);
				this.props.cookies.remove(AppConstants.loggedInCookieName);
				this.setState({
					isLoggedIn : false
				})
				this.logoutBtn.current?.click();
			}
		});
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
							{this.state.isLoggedIn ?
								<>
                  <Link to="/site" className="nav-link" >Site</Link>
                  <Link to="/report" className="nav-link" >Report</Link>
                  <Button onClick={()=>this.logout()} variant="primary" size="sm">
	                  Logout
                  </Button>
								</> :
								<>
									<Link to="/registration" className="nav-link" >Registration</Link>
									<Link to="/login" className="nav-link" >Login</Link>
								</>
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
export default withCookies(TopNavBar);
