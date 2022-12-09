import {Component, ReactNode} from "react";
import { Modal} from "react-bootstrap";
import {resolve} from "inversify-react";
import {ACM, AlertComponentModel} from "./model/AlertComponentModel";
import {observer} from "mobx-react";

@observer
export class AlertComponent extends Component{

	@resolve(ACM)
	private readonly componentModel!: AlertComponentModel;

	render() : ReactNode{
		return (
			<Modal
				show={this.componentModel.status}
				onHide={()=>this.componentModel.openOrClose(false)}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						{this.componentModel.title}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body><h5>{this.componentModel.body}</h5></Modal.Body>
			</Modal>
		)
	}
}
