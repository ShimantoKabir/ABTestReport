import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {DeviceType, DeviceTypeToArray} from "../../types/DeviceType";

export default class Report extends React.Component{

	state = {
		id: 0,
		startDate : "",
		endDate: "",
		deviceType: 0,
		siteId: 0,
		sites: [],
		deviceTypes: DeviceTypeToArray()
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

	onSummit = () =>{
		console.log(this.state.startDate);
	}

	render() : React.ReactNode {
		return (
			<Container className="form-container" >
				<h3>Generate Report</h3>
				<Form>
					<Form.Group className="mb-3" controlId="experimentId">
						<Form.Label>Experiment Id</Form.Label>
						<Form.Control value={this.state.id}
						              onChange={e => this.setState({id: e.target.value})}
						              type="number"
						              placeholder="Enter experiment id"/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="startDate">
						<Form.Label>Start Date</Form.Label>
						<Form.Control value={this.state.startDate}
						              onChange={e => this.setState({startDate: e.target.value})}
						              type="date"
						              placeholder="Enter username"/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="endDate">
						<Form.Label>End Date</Form.Label>
						<Form.Control
							value={this.state.endDate}
							onChange={e => this.setState({endDate: e.target.value})}
							type="date"
							placeholder="Password"/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="toolType">
						<Form.Label>Tool Type</Form.Label>
						<Form.Select
							value={this.state.deviceType}
							onChange={e => this.setState({deviceType: parseInt(e.target.value)})}>
							<option value={0}>--select--</option>
							{this.state.deviceTypes.map(item => (
								<option key={item.key} value={item.value}>
									{item.key}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Button onClick={() => this.onSummit()} variant="primary">
						Generate
					</Button>
				</Form>
			</Container>
		);
	}
}
