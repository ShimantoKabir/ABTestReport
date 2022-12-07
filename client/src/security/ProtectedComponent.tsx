import {Component, ReactNode} from "react";
import {observer} from "mobx-react";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "./model/ProtectedComponentModel";
import {TopNavComponent} from "../components/nav/TopNavComponent";

@observer
export class ProtectedComponent extends Component{

	@resolve(PCM)
	private readonly componentModel!: ProtectedComponentModel;

	componentDidMount() {
		this.componentModel.displayProtectComponent(true);
	}

	render() : ReactNode {
		return (
			<>
				{this.componentModel.isProtectComponentDisplayed && <TopNavComponent/>}
			</>
		);
	}
}
