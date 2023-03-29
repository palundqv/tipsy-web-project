import React from "react";
import { Route } from "react-router-dom";
import { UseAuthentication } from "../authentication/authenticationContext";

export default function loggedInRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuthentication();

	return (
		<Route
			{...rest}
			render={(props) => {
				currentUser ? <Component {...props} /> : <Redirect to="/" />;
			}}
		/>
	);
}
