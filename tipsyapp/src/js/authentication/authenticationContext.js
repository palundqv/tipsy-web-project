import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebaseFolder/fireB";

const authenticationContext = React.createContext();

function UseAuthentication() {
	return useContext(authenticationContext);
}

function AuthenticationProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signUp(email, password) {
		return auth.createUserWithEmailAndPassword(email.toLowerCase(), password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email.toLowerCase(), password);
	}

	function logout() {
		return auth.signOut();
	}

	function changePassword(newPassword) {
		return currentUser.updatePassword(newPassword);
	}

	function changeEmail(newEmail) {
		return currentUser.updateEmail(newEmail);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signUp,
		logout,
		changePassword,
		changeEmail,
	};

	return <authenticationContext.Provider value={value}>{!loading && children}</authenticationContext.Provider>;
}

export { UseAuthentication, AuthenticationProvider };
