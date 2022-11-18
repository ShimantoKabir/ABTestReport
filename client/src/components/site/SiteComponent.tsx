import "../site/Site.css"
import React, {ChangeEvent, FormEvent} from "react";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import {ToolType} from "../../types/ToolType";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";
import {observer} from "mobx-react";
import {SCM, SiteComponentModel} from "./model/SiteComponentModel";
import {ACM, AlertComponentModel} from "../alert/model/AlertComponentModel";

@observer
export class SiteComponent extends React.Component {

	@resolve(PCM)
	private readonly protectedComponent!: ProtectedComponentModel;

	@resolve(SCM)
	private readonly model!: SiteComponentModel;

	@resolve(ACM)
	private readonly alert!: AlertComponentModel;

	async componentDidMount() {
		!this.protectedComponent.isProtectComponentDisplayed && this.protectedComponent.displayProtectComponent(true)
		this.alert.startLoading();
		const alertDto = await this.model.getSites(1,5);
		this.alert.changeModalState(alertDto);
	}

	doSave = async (e: FormEvent<HTMLFormElement>) => {
		if (this.model.validateForm(e)){

		}
	}

	doChangSiteStatus = (id: number) => {
		this.model.changSiteStatus(id);
	}

	render(): React.ReactNode {
		return (
			<>
				<Modal show={this.model.isModalOpen} onHide={() => this.model.onModelToggle(false)}>
					<Form
						noValidate
						validated={this.model.isFormValid}
						onSubmit={(e: FormEvent<HTMLFormElement>)=>this.doSave(e)}
					>
						<Modal.Header closeButton>
							<Modal.Title>Site</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className="mb-3" controlId="clientName">
								<Form.Label>Client Name</Form.Label>
								<Form.Control
									required
									type="text"
									value={this.model.clientName}
									onChange={(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => this.model.onInputChange(e)}
		              placeholder="Enter client Name"
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please enter client name
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="siteName">
								<Form.Label>Site Name</Form.Label>
								<Form.Control
									required
									type="text"
									value={this.model.siteName}
									onChange={(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => this.model.onInputChange(e)}
									placeholder="Sine Name"
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please enter site name
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="apiKey">
								<Form.Label>Api Key</Form.Label>
								<Form.Control
									required
									type="text"
									value={this.model.apiKey}
									onChange={(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
										this.model.onInputChange(e)
									}
									placeholder="Api Key"
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please enter api key
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="sheetId">
								<Form.Label>Sheet Id</Form.Label>
								<Form.Control
									required
									type="text"
									value={this.model.sheetId}
									onChange={(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
										this.model.onInputChange(e)
									}
									placeholder="Sheet Id"
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please enter sheet id
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="toolType">
								<Form.Label>Tool Type</Form.Label>
								<Form.Select
									required
									value={this.model.toolType}
									onChange={(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => this.model.onInputChange(e)}
								>
									<option value="">--select--</option>
									{this.model.getToolTypes().map(item => (
										<option key={item.key} value={item.key}>
											{item.value}
										</option>
									))}
								</Form.Select>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please select a tool
								</Form.Control.Feedback>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => this.model.onModelToggle(false)}>
								Close
							</Button>
							<Button variant="primary" type="submit" >Save</Button>
						</Modal.Footer>
					</Form>
				</Modal>
				<Container fluid>
					<main className="site-container">
						<div className="site-header">
							<h4>Site</h4>
							<Button variant="primary" onClick={() => this.model.onModelToggle(true)}>
								Add
							</Button>
						</div>
						<Table striped bordered hover size="sm" responsive>
							<thead>
							<tr>
								<th>SL</th>
								<th>Status</th>
								<th>Client Name</th>
								<th>Site Name</th>
								<th>Api Key</th>
								<th>Sheet ID</th>
								<th>Tool Type</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
							</thead>
							<tbody>
							{this.model.sites.length > 0 && this.model.sites.map((item: any,index) => (
								<tr key={index} >
									<td>{index+1}</td>
									<td>
										<Form.Check
											checked={item.isActive}
											onChange={()=>this.doChangSiteStatus(item.id)}
											type="switch"
											id="custom-switch"
										/>
									</td>
									<td>{item.clientName}</td>
									<td>{item.siteName}</td>
									<td>{item.apiKey}</td>
									<td>{item.sheetId}</td>
									<td>{ToolType[item.toolType]}</td>
									<td><Button variant="warning" size="sm" >Edit</Button></td>
									<td><Button variant="danger" size="sm" >Delete</Button></td>
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
