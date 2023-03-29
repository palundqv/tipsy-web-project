import TopbarView from "../views/topBarView";
import { UseAuthentication } from "../authentication/authenticationContext";
import React from "react";

function TopBarPresenter(props) {
	const { currentUser } = UseAuthentication();

	return <TopbarView isUserLoggedIn={currentUser} />;
}

export default TopBarPresenter;
