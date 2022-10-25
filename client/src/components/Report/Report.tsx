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
		endDate: "",
		startDateOffset: 0,
		endDateOffset: 0,
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
		isFormValid: false
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
			url: AppConstants.baseUrl + "experiment/init",
			headers: AppConstants.getAxiosHeader(),
			withCredentials: true,
		})
		.then((res) => {
			if (res.data.code === IOCode.OK) {
				const {input,sites} = res.data;
				this.setState({
					id: input.experimentId,
					startDate: this.formatDate(input.startDate),
					endDate: this.formatDate(input.endDate),
					sites: sites.items,
					siteId: input.siteId,
					startDateOffset: Number(input.startDateOffset),
					endDateOffset: Number(input.endDateOffset)
				})
			}
			this.setState({
				alert: {
					heading: res.data.code === IOCode.OK ? IOMsg.SUCCESS_HEAD : IOMsg.ERROR_HEAD,
					body: res.data.msg,
					code: res.data.code,
					state: res.data.code !== IOCode.OK
				},
			});
		})
		.catch((err) => {
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

	formatDate = (date: string) : string =>{
		let d = new Date(date);
		return  d.getFullYear()
			+ "-"
			+ (d.getMonth()+1).toString().padStart(2,"0")
			+ "-"
			+ d.getDate().toString().padStart(2,"0");
	}

	onSummit = (e: any) => {
		e.preventDefault();
		e.stopPropagation();

		const isValid = e.currentTarget.checkValidity();

		this.setState({
			isFormValid: isValid
		});

		if (isValid){
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
					startDate: this.getIsoDateTime(this.state.startDate, this.state.startDateOffset),
					endDate: this.getIsoDateTime(this.state.endDate, this.state.endDateOffset),
					deviceTypes: this.state.deviceTypes,
					siteId: this.state.siteId,
					sourceTypes: this.state.sourceTypes
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
		}
	};

	getIsoDateTime = (dateString: string, offset: number): string => {
		const date = new Date();
		let utcHour = date.getUTCHours();
		if (offset < 0){
			utcHour = utcHour - offset;
		}else {
			utcHour = utcHour + offset;
		}

		const utcHourString = utcHour.toString().padStart(2,"0");
		const utcMinutesString = date.getUTCMinutes().toString().padStart(2,"0");

		let dateTimeIso = "";
		if (dateString) {
			dateTimeIso = `${dateString}T${utcHourString}:${utcMinutesString}:00.000Z`
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

	onCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
		let types = e.target.name === "deviceType" ? this.state.deviceTypes : this.state.sourceTypes;
		types.map(obj => {
			if (obj.key === e.target.id) {
				obj.isChecked = !obj.isChecked;
			}
		});
		this.setState({
			[e.target.name]: types
		})
	}

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
				<Form noValidate validated={this.state.isFormValid} onSubmit={this.onSummit}>
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
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({startDate: e.target.value})}
							type="date"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="endDate">
						<Form.Label>End Date</Form.Label>
						<Form.Control
							value={this.state.endDate}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
								endDate: e.target.value
							})}
							type="date"
						/>
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
					<Form.Group className="mb-3" controlId="toolType">
						<Form.Label>Device Type</Form.Label>
						<div className="mb-3">
							{this.state.deviceTypes.map((item) => (
								<Form.Check
									inline
									key={item.key}
									label={item.key}
									name="deviceType"
									type="checkbox"
									id={item.key}
									checked={item.isChecked}
									onChange={this.onCheckboxClick}
								/>
							))}
						</div>
					</Form.Group>
					<Form.Group className="mb-3" controlId="sourceType">
						<Form.Label>Source Type</Form.Label>
						<div className="mb-3">
							{this.state.sourceTypes.map((item) => (
								<Form.Check
									key={item.key}
									inline
									label={item.key}
									name="sourceType"
									type="checkbox"
									id={item.key}
									checked={item.isChecked}
									onChange={this.onCheckboxClick}
								/>
							))}
						</div>
					</Form.Group>
					<Button type="submit" variant="primary">
						Populate
					</Button>
				</Form>
			</Container>
		);
	}
}
