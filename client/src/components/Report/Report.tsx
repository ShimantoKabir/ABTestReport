import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {DeviceType, DeviceTypeToArray} from "../../types/DeviceType";
import AppAlert from "../Alert/AppAlert";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";
import AppConstants from "../../common/AppConstants";
import {SourceType, SourceTypeToArray} from "../../types/SourceType";

export default class Report extends React.Component {
	state = {
		id: "",
		startDate: "",
		endDate: "",
		deviceType: DeviceType.ALL,
		sourceType: SourceType.ALL,
		siteId: 0,
		sites: [],
		deviceTypes: DeviceTypeToArray(),
		sourceTypes: SourceTypeToArray(),
		alert: {
			heading: "",
			body: "",
			code: IOCode.EMPTY,
			state: true,
		},
	};

	componentDidMount() {
		this.setState({
			alert: {
				heading: IOMsg.LOADING_HEAD,
				body: IOMsg.LOADING_MSG,
				code: IOCode.OK,
				state: true,
			},
		});
		axios({
			method: "GET",
			url: AppConstants.baseUrl + "sites",
			headers: AppConstants.getAxiosHeader(),
			withCredentials: true,
		})
		.then((res) => {
			if (res.data.code === IOCode.OK) {
				this.setState({
					sites: res.data.sites.items,
					alert: {
						heading: IOMsg.SUCCESS_HEAD,
						body: IOMsg.INIT_LOAD_MSG,
						code: IOCode.OK,
						state: false,
					},
				});
			} else {
				this.setState({
					alert: {
						heading: IOMsg.ERROR_HEAD,
						body: res.data.msg,
						code: IOCode.ERROR,
						state: true,
					},
				});
			}
		})
		.catch((err) => {
			console.log("err", err);
			this.setState({
				alert: {
					heading: IOMsg.ERROR_HEAD,
					body: IOMsg.ERROR_BODY,
					code: IOCode.ERROR,
					state: true,
				},
			});
		});
	}

	onSummit = () => {
		this.setState({
			alert: {
				heading: IOMsg.LOADING_HEAD,
				body: IOMsg.LOADING_MSG,
				code: IOCode.OK,
				state: true,
			},
		});
		axios({
			method: "POST",
			url: AppConstants.baseUrl + "experiment/populate",
			headers: AppConstants.getAxiosHeader(),
			withCredentials: true,
			data: {
				id: Number(this.state.id),
				startDate: this.state.startDate
					? this.getStartDate()
					: this.state.startDate,
				endDate: this.state.endDate ? this.getEndDate() : this.state.endDate,
				deviceType: this.state.deviceType,
				sourceType: this.state.sourceType,
				siteId: this.state.siteId,
			},
		})
		.then((res) => {
			this.setState({
				alert: {
					heading:
						res.data.code === IOCode.OK
							? IOMsg.SUCCESS_HEAD
							: IOMsg.ERROR_HEAD,
					body: res.data.msg,
					code: res.data.code,
					state: true,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			this.setState({
				alert: {
					heading: IOMsg.ERROR_HEAD,
					body: err.response.data.message[0],
					code: IOCode.ERROR,
					state: true,
				},
			});
		});
	};

	onAlertClose = () => {
		this.setState({
			alert: {
				heading: "",
				body: "",
				code: IOCode.EMPTY,
				state: false,

			},
		});
	};

	getStartDate = (): string => {
		const startDate = new Date(this.state.startDate);
		startDate.setHours(startDate.getHours() + 5);
		return startDate.toISOString();
	};

	getEndDate = (): string => {
		const endDate = new Date(this.state.endDate);
		console.log(endDate.toISOString())
		endDate.setHours(endDate.getDay() +27);
		console.log(endDate.toISOString())
		endDate.setHours(endDate.getHours() + 5);
		console.log(endDate.toISOString())
		return endDate.toISOString();
	};

	render(): React.ReactNode {
		return (
			<Container className="form-container form-container-margin">
				<AppAlert
					heading={this.state.alert.heading}
					body={this.state.alert.body}
					code={this.state.alert.code}
					state={this.state.alert.state}
					onAlertClose={this.onAlertClose}
				/>
				<h3>Populate Report To Sheet</h3>
				<Form>
					<Form.Group className="mb-3" controlId="experimentId">
						<Form.Label>Experiment Id</Form.Label>
						<Form.Control
							value={this.state.id}
							onChange={(e) =>
								this.setState({id: e.target.value.replace(/\D/g, "")})
							}
							type="text"
							placeholder="Enter experiment id"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="startDate">
						<Form.Label>Start Date</Form.Label>
						<Form.Control
							value={this.state.startDate}
							onChange={(e) => this.setState({startDate: e.target.value})}
							type="date"
							placeholder="Enter username"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="endDate">
						<Form.Label>End Date</Form.Label>
						<Form.Control
							value={this.state.endDate}
							onChange={(e) => this.setState({endDate: e.target.value})}
							type="date"
							placeholder="Password"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="deviceType">
						<Form.Label>Device Type</Form.Label>
						<Form.Select
							value={this.state.deviceType}
							onChange={(e) => this.setState({deviceType: e.target.value})}
						>
							<option value={DeviceType.ALL}>--select--</option>
							{this.state.deviceTypes.map((item) => (
								<option key={item.key} value={item.value}>
									{item.key}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3" controlId="sourceType">
						<Form.Label>Source Type</Form.Label>
						<Form.Select
							value={this.state.sourceType}
							onChange={(e) => this.setState({sourceType: e.target.value})}
						>
							<option value={SourceType.ALL}>--select--</option>
							{this.state.sourceTypes.map((item) => (
								<option key={item.key} value={item.value}>
									{item.key}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3" controlId="toolType">
						<Form.Label>Site</Form.Label>
						<Form.Select
							value={this.state.siteId}
							onChange={(e) =>
								this.setState({siteId: parseInt(e.target.value)})
							}
						>
							<option value={0}>--select--</option>
							{this.state.sites.map((item: any) => (
								<option key={item.id} value={item.id}>
									{item.siteName}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Button onClick={() => this.onSummit()} variant="primary">
						Populate
					</Button>
				</Form>
			</Container>
		);
	}
}
