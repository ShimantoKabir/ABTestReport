import {observer} from "mobx-react";
import React, {ChangeEvent, Component, FormEvent} from "react";
import {resolve} from "inversify-react";
import {ACM, AlertComponentModel} from "../alert/model/AlertComponentModel";
import {UCM, UserComponentModel} from "./model/UserComponentModel";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import {AuthorizedUserDto} from "../../dtos/AuthorizedUserDto";

@observer
export class UserComponent extends Component {

	@resolve(UCM)
	private readonly model!: UserComponentModel;

	@resolve(ACM)
	private readonly alert!: AlertComponentModel;

	componentDidMount = async () => {
		this.alert.startLoading();
		const alertDto = await this.model.fetchUsers(1,5);
		this.alert.changeModalState(alertDto);
	}

	onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		this.alert.startLoading();
		const alertDto = await this.model.doSubmitForm(e);
		this.alert.changeModalState(alertDto);
	}

	fillUpForm = async (user: AuthorizedUserDto) => {
		await this.model.setModelData(user);
		this.model.onModelToggle(true);
	}

	showForm = () => {
		this.model.emptyModelData();
		this.model.onModelToggle(true)
	}

	onDelete = async (id: number) =>{
		this.alert.startLoading();
		const alertDto = await this.model.deleteUser(id);
		this.alert.changeModalState(alertDto);
	}

	doChangUserStatus = async (id: number) => {
		this.alert.startLoading();
		const alertDto = await this.model.changUserStatus(id);
		this.alert.changeModalState(alertDto);
	}

	render(): React.ReactNode {
		return (
			<>
				<Modal show={this.model.isModalOpen} onHide={() => this.model.onModelToggle(false)}>
					<Form
						noValidate
						validated={this.model.isFormValid}
						onSubmit={(e: FormEvent<HTMLFormElement>)=>this.onFormSubmit(e)}
					>
						<Modal.Header closeButton>
							<Modal.Title>User</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className="mb-3" controlId="clientName">
								<Form.Label>Email</Form.Label>
								<Form.Control
									required
									type="email"
									value={this.model.email}
									onChange={(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => this.model.onInputChange(e)}
									placeholder="Enter email"
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please enter email
								</Form.Control.Feedback>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => this.model.onModelToggle(false)}>
								Close
							</Button>
							{
								this.model.id === 0 ?
									<Button variant="primary" type="submit" >Save</Button>
									:
									<Button variant="primary" type="submit" >Update</Button>
							}
						</Modal.Footer>
					</Form>
				</Modal>
				<Container fluid>
					<main className="site-container">
						<div className="site-header">
							<h4>Site</h4>
							<Button variant="primary" onClick={() => this.showForm()}>
								Add
							</Button>
						</div>
						<Table striped bordered hover size="sm" responsive >
							<thead>
							<tr>
								<th>SL</th>
								<th>Status</th>
								<th>Email</th>
							</tr>
							</thead>
							<tbody>
							{this.model.users.length > 0 && this.model.users.map((item: AuthorizedUserDto,index) => (
								<tr key={index} >
									<td>{index+1}</td>
									<td>
										<Form.Check
											checked={item.status}
											onChange={()=>this.doChangUserStatus(item.id)}
											type="switch"
											id="custom-switch"
										/>
									</td>
									<td>{item.email}</td>
									<td>
										<Button
											variant="warning"
											size="sm"
											onClick={()=>this.fillUpForm(item)}
										>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											size="sm"
											onClick={()=>this.onDelete(item.id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
							</tbody>
						</Table>
					</main>
				</Container>
			</>
		);
	}
}
