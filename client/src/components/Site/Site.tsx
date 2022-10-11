import React from "react";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import "../Site/Site.css"
import axios from "axios";
import {ToolType, ToolTypeToArray} from "../../types/ToolType";

export default class Site extends React.Component {

	state = {
		isModalOpen: false,
		clientName: "",
		siteName: "",
		toolType: 0,
		apiKey: "",
		toolTypes: ToolTypeToArray(),
		sites: []
	}

	componentDidMount() {
		axios({
			method: 'GET',
			url: 'http://localhost:3001/sites',
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true
		}).then(res => {
			this.setState({
				sites: res.data.sites.items
			})
		}).catch(err => {
			console.log(err);
		});
	}

	onModelToggle = (state: boolean) => {
		this.setState({
			isModalOpen: state
		})
	}

	onSummit = () => {
		axios({
			method: 'POST',
			url: 'http://localhost:3001/sites',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				id: null,
				clientName: this.state.clientName,
				siteName: this.state.siteName,
				apiKey: this.state.apiKey,
				toolType: this.state.toolType,
			},
			withCredentials: true
		}).then(res => {
			this.setState(prevState => ({
				isModalOpen : false,
				// @ts-ignore
				sites: [...prevState.sites, {
					id: res.data.site.id,
					clientName: res.data.site.clientName,
					siteName: res.data.site.siteName,
					apiKey: res.data.site.apiKey,
					toolType: res.data.site.toolType,
				}]
			}))
		}).catch(err => {
			console.log(err);
		})
	}

	render(): React.ReactNode {
		return (
			<>
				<Modal show={this.state.isModalOpen} onHide={() => this.onModelToggle(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Site</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3" controlId="clientName">
								<Form.Label>Client Name</Form.Label>
								<Form.Control value={this.state.clientName}
								              onChange={e => this.setState({clientName: e.target.value})}
								              type="text"
								              placeholder="Client Name"/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="siteName">
								<Form.Label>Site Name</Form.Label>
								<Form.Control
									value={this.state.siteName}
									onChange={e => this.setState({siteName: e.target.value})}
									type="text"
									placeholder="Sine Name"/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="apiKey">
								<Form.Label>Api Key</Form.Label>
								<Form.Control
									value={this.state.apiKey}
									onChange={e => this.setState({apiKey: e.target.value})}
									type="text"
									placeholder="Api Key"/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="toolType">
								<Form.Label>Tool Type</Form.Label>
								<Form.Select
									value={this.state.toolType}
									onChange={e => this.setState({toolType: parseInt(e.target.value)})}
								>
									<option value={0}>--select--</option>
									{this.state.toolTypes.map(item => (
										<option key={item.key} value={item.key}>
											{item.value}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.onModelToggle(false)}>
							Close
						</Button>
						<Button variant="primary" onClick={() => this.onSummit()}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
				<Container fluid>
					<main className="site-container">
						<div className="site-header">
							<h4>Site</h4>
							<Button variant="primary" onClick={() => this.onModelToggle(true)}>
								Add New Site
							</Button>
						</div>
						<Table striped bordered hover size="sm">
							<thead>
							<tr>
								<th>SL</th>
								<th>Client Name</th>
								<th>Site Name</th>
								<th>Api Key</th>
								<th>Tool Type</th>
							</tr>
							</thead>
							<tbody>
							{this.state.sites.length > 0 && this.state.sites.map((item: any,index) => (
								<tr key={index} >
									<td>1</td>
									<td>{item.clientName}</td>
									<td>{item.siteName}</td>
									<td>{item.apiKey}</td>
									<td>{ToolType[item.toolType]}</td>
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
