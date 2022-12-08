import React, {ChangeEvent, Component, FormEvent} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {observer} from "mobx-react";
import {resolve} from "inversify-react";
import {ACM, AlertComponentModel} from "../alert/model/AlertComponentModel";
import {ReportComponentModel, RTCM} from "./model/ReportComponentModel";
import {KeyValue} from "../../dtos/KeyValue";

@observer
export class ReportComponent extends Component {

	@resolve(RTCM)
	private readonly model!: ReportComponentModel;

	@resolve(ACM)
	private readonly alert!: AlertComponentModel

	componentDidMount() {
		this.model.loadInitData();
	}

	onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		this.model.validateForm(e);
	}

	render(): React.ReactNode {
		return (
			<Container className="form-container form-container-margin">
				<h3>Populate Report To Sheet</h3>
				<Form
					noValidate
					validated={this.model.isFormValid}
					onSubmit={(e: FormEvent<HTMLFormElement>)=>this.onFormSubmit(e)}
				>
					<Form.Group className="mb-3" controlId="experimentId">
						<Form.Label>Experiment Id</Form.Label>
						<Form.Control
							required
							type="text"
							value={this.model.experimentId}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.model.onInputChange(e)}
							placeholder="Enter experiment id"
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">
							Please experiment id
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="startDate">
						<Form.Label>Start Date</Form.Label>
						<Form.Control
							required
							value={this.model.startDate}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.model.onInputChange(e)}
							type="date"
							placeholder="Pick start date"
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">
							Please pick start date
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId=" ">
						<Form.Label>End Date</Form.Label>
						<Form.Control
							required
							value={this.model.endDate}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.model.onInputChange(e)}
							type="date"
							placeholder="Pick end date"
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">
							Please pick end date
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="siteName">
						<Form.Label>Site Name</Form.Label>
						<Form.Control
							required
							value={this.model.siteName}
							onChange={(e: ChangeEvent<HTMLInputElement>) => this.model.onInputChange(e)}
							type="text"
							placeholder="Enter site name"
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">
							Please enter site name
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="toolType">
						<Form.Label>Device Type</Form.Label>
						<div className="mb-3">
							{this.model.getDeviceTypes().map((item : KeyValue<string>, index: number) => (
								<Form.Check
									inline
									key={item.key}
									label={item.key}
									name="deviceType"
									type="checkbox"
									id={item.key}
									checked={item.isChecked}
									onChange={(e: ChangeEvent<HTMLInputElement>)=>this.model.onCheckboxClick(e)}
								/>
							))}
						</div>
					</Form.Group>
					<Form.Group className="mb-3" controlId="sourceType">
						<Form.Label>Source Type</Form.Label>
						<div className="mb-3">
							{this.model.getSourceTypes().map((item : KeyValue<string>) => (
								<Form.Check
									key={item.key}
									inline
									label={item.key}
									name="sourceType"
									type="checkbox"
									id={item.key}
									checked={item.isChecked}
									onChange={(e: ChangeEvent<HTMLInputElement>)=>this.model.onCheckboxClick(e)}
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
