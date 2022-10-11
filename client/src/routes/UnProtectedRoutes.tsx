import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";

// @ts-ignore
const UnProtectedRoutes = ({ redirectPath = '/'}) => {
	const [cookies] = useCookies(['isLoggedIn']);
	if (cookies.isLoggedIn === "true") {
		return <Navigate to={redirectPath} replace />;
	}
	return <Outlet />;
}
export default UnProtectedRoutes;

