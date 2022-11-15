import "../site/Site.css"
import React from "react";
import {Button, Container, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {ToolType, ToolTypeToArray} from "../../types/ToolType";
import AppConstants from "../../common/AppConstants";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";

export class SiteComponent extends React.Component {

	state = {
		isModalOpen: false,
		clientName: "",
		siteName: "",
		toolType: 0,
		apiKey: "",
		toolTypes: ToolTypeToArray(),
		sites: [],
		alert: {
			heading: "",
			body: "",
			code: IOCode.EMPTY,
			state: true
		}
	}

	componentDidMount() {
		this.setState({
			alert: {
				heading: "LOADING",
				body: IOMsg.LOADING_MSG,
				code: IOCode.OK,
				state: true
			}
		});
		axios({
			method: 'GET',
			url: AppConstants.baseUrl+'sites',
			headers: AppConstants.getAxiosHeader(),
			withCredentials: true
		}).then(res => {
			if (res.data.code === IOCode.OK){
				this.setState({
					sites: res.data.sites.items,
					alert: {
						heading: IOMsg.SUCCESS_HEAD,
						body: IOMsg.INIT_LOAD_MSG,
						code: IOCode.OK,
						state: false
					}
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
		}).catch(err => {
			console.log(err);
			this.setState({
				alert: {
					heading: IOMsg.ERROR_HEAD,
					body: IOMsg.ERROR_BODY,
					code: IOCode.ERROR,
					state: true
				}
			});
		});
	}

	onModelToggle = (state: boolean) => {
		this.setState({
			isModalOpen: state
		})
	}

	onSummit = () => {
		this.setState({
			isModalOpen: false,
			alert: {
				heading: IOMsg.LOADING_HEAD,
				body: IOMsg.LOADING_MSG,
				code: IOCode.OK,
				state: true
			}
		});
		axios({
			method: 'POST',
			url: AppConstants.baseUrl+'sites',
			headers: AppConstants.getAxiosHeader(),
			data: {
				id: null,
				clientName: this.state.clientName,
				siteName: this.state.siteName,
				apiKey: this.state.apiKey,
				toolType: this.state.toolType,
			},
			withCredentials: true
		}).then(res => {
			if (res.data.code === IOCode.OK){
				this.setState(prevState => ({
					alert: {
						heading: IOMsg.SUCCESS_HEAD,
						body: IOMsg.SITE_SAVED,
						code: IOCode.OK,
						state: true
					},
					// @ts-ignore
					sites: [...prevState.sites, {
						id: res.data.site.id,
						clientName: res.data.site.clientName,
						siteName: res.data.site.siteName,
						apiKey: res.data.site.apiKey,
						toolType: res.data.site.toolType,
					}]
				}));
			}else {
				this.setState({
					alert: {
						heading: IOMsg.ERROR_HEAD,
						body: IOMsg.ERROR_BODY,
						code: IOCode.ERROR,
						state: true
					}
				});
			}
		}).catch(err => {
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
									<td>{index+1}</td>
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
