import React, {ChangeEvent} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {DeviceTypeToArray} from "../../types/DeviceType";
import AppAlert from "../Alert/AppAlert";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";
import AppConstants from "../../common/AppConstants";
import {SourceTypeToArray} from "../../types/SourceType";

export default class Report extends React.Component {
	state = {
		id: "",
		startDate: "",
		startTime: "",
		endDate: "",
		endTime: "",
		deviceType: "all",
		sourceType: "all",
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
				startDate: this.getIsoDateTime(this.state.startDate,this.state.startTime),
				endDate: this.getIsoDateTime(this.state.endDate,this.state.endTime),
				deviceType: this.state.deviceType,
				siteId: this.state.siteId,
				sourceType: this.state.sourceType
			},
		})
		.then((res) => {
			this.setState({
				alert: {
					heading: res.data.code === IOCode.OK
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

	getIsoDateTime = (date: string, time: string) : string =>
	{
		let dateTimeIso = "";
		if (date && time){
			dateTimeIso = `${date}T${time}:00.000Z`
		}
		return dateTimeIso;
	}

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
						<Form.Label>Start DateTime</Form.Label>
						<Form.Control
							value={this.state.startDate}
							onChange={(e) => this.setState({startDate: e.target.value})}
							type="date"
						/>
						<Form.Control
							className="form-control-margin"
							value={this.state.startTime}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
								startTime: e.target.value
							})}
							type="time"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="endDate">
						<Form.Label>End DateTime</Form.Label>
						<Form.Control
							value={this.state.endDate}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
								endDate: e.target.value
							})}
							type="date"
						/>
						<Form.Control
							className="form-control-margin"
							value={this.state.endTime}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
								endTime: e.target.value
							})}
							type="time"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="toolType">
						<Form.Label>Device Type</Form.Label>
						<Form.Select
							value={this.state.deviceType}
							onChange={(e) => this.setState({deviceType: e.target.value})}
						>
							<option value={"all"}>ALL</option>
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
							<option value={"all"}>ALL</option>
							{this.state.sourceTypes.map((item) => (
								<option key={item.key} value={item.value}>
									{item.key}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3" controlId="siteId">
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
