import React from "react";
import "../home/Home.css"
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";
import {HS, HttpService} from "../../services/http/HttpService";

export class HomeComponent extends React.Component{

	@resolve(PCM)
	private readonly protectedComponent!: ProtectedComponentModel;

	@resolve(HS)
	private readonly httpService!: HttpService;

	componentDidMount() {
		!this.protectedComponent.isProtectComponentDisplayed && this.protectedComponent.displayProtectComponent(true)
	}

	render() : React.ReactNode {
		return (
			<main className="dashboard-container" >
				<h1>Dashboard</h1>
			</main>
		);
	}
}
