import React from "react";
import {Alert} from "react-bootstrap";
import {IOCode} from "../../common/IOCode";

interface AppAlertProps {
	heading: string;
	body: string,
	code: number,
	state: boolean,
	onAlertClose: Function
}

export default class AppAlert extends React.Component<AppAlertProps> {

	closeAlert = () => {
		this.props.onAlertClose();
	}

	render(): React.ReactNode {
		return (
			<Alert show={this.props.state} variant={this.props.code === IOCode.ERROR ? "danger" : "success"}
			       onClose={() => this.closeAlert()} dismissible>
				<Alert.Heading>{this.props.heading}</Alert.Heading>
				<p>{this.props.body}</p>
			</Alert>
		);
	}
}
