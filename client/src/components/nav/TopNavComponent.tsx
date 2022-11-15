import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";
import {LogoutComponent} from "../logout/LogoutComponent";

export class TopNavComponent extends React.Component{

	@resolve(PCM)
	private readonly protectedComponent!: ProtectedComponentModel;

	// logout = () => {
	// 	axios({
	// 		method: 'POST',
	// 		url: AppConstants.baseUrl+'user/logout',
	// 		headers : AppConstants.getAxiosHeader(),
	// 		withCredentials : true
	// 	}).finally(()=>{
	// 		if (this.logoutBtn){
	// 			this.props.cookies.remove(AppConstants.jwtCookieName);
	// 			this.props.cookies.remove(AppConstants.loggedInCookieName);
	// 			this.setState({
	// 				isLoggedIn : false
	// 			})
	// 			this.logoutBtn.current?.click();
	// 		}
	// 	});
	// }

	doLogout = () =>{
		this.protectedComponent.displayProtectComponent(false);
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
							<LogoutComponent  onLogout={this.doLogout}/>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
