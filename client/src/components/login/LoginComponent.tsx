import React, {ChangeEvent, FormEvent} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import {observer} from "mobx-react";
import {resolve} from "inversify-react";
import {LCM, LoginComponentModel} from "./model/LoginComponentModel";
import {ACM, AlertComponentModel} from "../alert/model/AlertComponentModel";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";
import { IOCode } from "../../common/IOCode";

@observer
export class LoginComponent extends React.Component {

	@resolve(LCM)
	private readonly componentModel!: LoginComponentModel;

	@resolve(ACM)
	private readonly alert!: AlertComponentModel;

	@resolve(PCM)
	private readonly protectedComponent!: ProtectedComponentModel;

	doLogin = async (e: FormEvent<HTMLFormElement>) => {
		if (this.componentModel.validateForm(e)){
			this.alert.startLoading();
			const alertDto = await this.componentModel.onLogin();
			this.alert.changeModalState(alertDto);
			alertDto.code === IOCode.OK && this.protectedComponent.displayProtectComponent(true);
		}
	}

	render(): React.ReactNode {

		if (this.componentModel.isLoggedIn) {
			return <Navigate to="/home" replace={true}/>;
		}

		return (
			<main className="center-main" >
				<Container className="form-container" >
					<h3>Login</h3>
					<Form
						noValidate
						validated={this.componentModel.isFormValid}
						onSubmit={(e: FormEvent<HTMLFormElement>)=>this.doLogin(e)}
					>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								required
								type="email"
								value={this.componentModel.email}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
								placeholder="Enter email"
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
								autoComplete="off"
								value={this.componentModel.password}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
								placeholder="Enter password"
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
						<p>Don't have account, please <Link to={"/registration"}>SingUp</Link></p>
					</div>
				</Container>
			</main>
		);
	}
}
