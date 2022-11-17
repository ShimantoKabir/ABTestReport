import React, {ChangeEvent, FormEvent} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {observer} from "mobx-react";
import {resolve} from "inversify-react";
import {RCM, RegistrationComponentModel} from "./model/RegistrationComponentModel";
import {ACM, AlertComponentModel} from "../alert/model/AlertComponentModel";
import {Link} from "react-router-dom";

@observer
export class RegistrationComponent extends React.Component{

	@resolve(RCM)
	private readonly componentModel!: RegistrationComponentModel;

	@resolve(ACM)
	private readonly alert!: AlertComponentModel;

	doRegistration = async (e: FormEvent<HTMLFormElement>) => {
		if (this.componentModel.validateForm(e)){
			this.alert.startLoading();
			this.alert.changeModalState(await this.componentModel.onRegistration());
		}
	}

	render() : React.ReactNode {
		return (
			<main className="center-main" >
				<Container className="form-container" >
					<h3>Registration</h3>
					<Form
						noValidate
						validated={this.componentModel.isFormValid}
						onSubmit={(e: FormEvent<HTMLFormElement>)=>this.doRegistration(e)}
					>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter email"
								value={this.componentModel.email}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please provide your email
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								type="password"
								placeholder="Enter password"
								autoComplete="off"
								value={this.componentModel.password}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please provide your password
							</Form.Control.Feedback>
						</Form.Group>
						<Button className="w-100" variant="primary" type="submit">
							Submit
						</Button>
					</Form>
					<div className="divider pt-4 text-center" >
						<p>Already have account, please <Link to="/">Login</Link></p>
					</div>
				</Container>
			</main>
		);
	}
}
