import {FC, ReactElement} from 'react';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import AppConstants from "../../common/AppConstants";
import {Button} from "react-bootstrap";

interface Props {
	onLogout : Function
}

export const LogoutComponent: FC<Props> = (props: Props): ReactElement => {
	let navigate = useNavigate();
	const [, , removeCookie] = useCookies();
	const goToLogin = () => {
		removeCookie(AppConstants.loggedInCookieName);
		removeCookie(AppConstants.authTokenCookieName);
		removeCookie(AppConstants.refreshTokenCookieName);
		props.onLogout();
		navigate("/");
	};
	return (
		<Button variant="outline-success" onClick={goToLogin}>Logout</Button>
	);
};
