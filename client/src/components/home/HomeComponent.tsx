import React from "react";
import "../home/Home.css"
import {resolve} from "inversify-react";
import {HS, HttpService} from "../../services/http/HttpService";

export class HomeComponent extends React.Component{

	@resolve(HS)
	private readonly httpService!: HttpService;

	render() : React.ReactNode {
		return (
			<main className="dashboard-container" >
				<h1>Dashboard</h1>
			</main>
		);
	}
}
