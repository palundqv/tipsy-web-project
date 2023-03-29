import LoginView from "../views/loginView";
import React from "react";
import { UseAuthentication } from "../authentication/authenticationContext";
import { useNavigate } from "react-router-dom";

function LoginPresenter() {
	const emailRef = React.useRef();
	const passwordRef = React.useRef();
	const { login } = UseAuthentication();
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	async function handleSubmit() {
		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch {
			setError("Wrong password!");
		}
		setLoading(false);
	}

	document.addEventListener("keypress", function onEvent(event) {
		if (event.key === "Enter" && window.location.href.includes("login")) {
			document.getElementById("loginbutton").click();
		}
	});

	return <LoginView handleSubmit={() => handleSubmit()} emailRef={emailRef} passwordRef={passwordRef} loading={loading} error={error} />;
}

export default LoginPresenter;
