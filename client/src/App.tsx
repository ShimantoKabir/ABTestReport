import './App.css';
import "reflect-metadata";
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import UnProtectedRoutes from "./routes/UnProtectedRoutes";
import {Provider} from "inversify-react";
import {DiContainer} from "./di";
import {ProtectedComponent} from "./security/ProtectedComponent";
import {AlertComponent} from "./components/alert/AlertComponent";
import {ErrorComponent} from "./components/error/ErrorComponent";
import {HomeComponent} from './components/home/HomeComponent';
import {SiteComponent} from './components/site/SiteComponent';
import {ReportComponent} from './components/report/ReportComponent';
import {RegistrationComponent} from "./components/registration/RegistrationComponent";
import {LoginComponent} from "./components/login/LoginComponent";

export default class App extends React.Component {
	render(): React.ReactNode {
		return (
			<Provider container={DiContainer}>
				<BrowserRouter>
					<AlertComponent/>
					<ProtectedComponent/>
					<Routes>
						<Route element={<ProtectedRoutes/>}>
							<Route path="/" element={<HomeComponent/>}/>
							<Route path="/site" element={<SiteComponent/>}/>
							<Route path="/report" element={<ReportComponent/>}/>
							<Route path="/*" element={<ErrorComponent/>} />
						</Route>
						<Route element={<UnProtectedRoutes/>}>
							<Route path="/registration" element={<RegistrationComponent/>}/>
							<Route path="/login" element={<LoginComponent/>}/>
							<Route path="/*" element={<ErrorComponent/>} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		)
	}
}
