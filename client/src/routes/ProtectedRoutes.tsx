import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";

const ProtectedRoutes = ({redirectPath = '/login'}) => {
	const [cookies] = useCookies(['isLoggedIn']);
	if (!cookies.isLoggedIn || cookies.isLoggedIn === "false") {
		return <Navigate to={redirectPath} replace/>;
	}
	return <Outlet/>;
}
export default ProtectedRoutes;

