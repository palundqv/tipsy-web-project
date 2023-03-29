import SignupView from "../views/signupView";
import { useNavigate } from "react-router-dom";
import React from "react";
import { UseAuthentication } from "../authentication/authenticationContext";

function SignupPresenter() {
	const emailRef = React.useRef();
	const passwordRef = React.useRef();
	const passwordConfirmRef = React.useRef();
	const { signUp } = UseAuthentication();
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	async function handleSubmit() {
		setError(null);
		console.log(passwordRef.current.value);
		console.log(passwordConfirmRef.current.value);
		console.log(passwordRef.current.value !== passwordConfirmRef.current.value);
		console.log(
			!(!emailRef.current.value.includes("@")
				? setError("Please enter an email")
				: !passwordRef.current.value || !passwordConfirmRef.current.value
				? setError("Please fill both fields")
				: passwordRef.current.value !== passwordConfirmRef.current.value
				? setError("Passwords do not match")
				: passwordRef.current.value.length < 6 && setError("Password must be at least 6 characters long"))
		);
		console.log(error);
		if (
			!emailRef.current.value.includes("@")
				? setError("Please enter an email")
				: !passwordRef.current.value || !passwordConfirmRef.current.value
				? setError("Please fill both fields")
				: passwordRef.current.value !== passwordConfirmRef.current.value
				? setError("Passwords do not match")
				: passwordRef.current.value.length < 6
				? setError("Password must be at least 6 characters long")
				: true
		) {
			try {
				setLoading(true);
				await signUp(emailRef.current.value, passwordRef.current.value);
				navigate("/");
			} catch {
				setError("Failed to signUp");
			}
			setLoading(false);
		}
	}

	document.addEventListener("keypress", function onEvent(event) {
		if (event.key === "Enter" && window.location.href.includes("signup")) {
			document.getElementById("signupButton").click();
		}
	});

	return (
		<SignupView
			error={error}
			handleSubmit={() => handleSubmit()}
			loading={loading}
			emailRef={emailRef}
			passwordRef={passwordRef}
			passwordConfirmRef={passwordConfirmRef}
		/>
	);
}

export default SignupPresenter;
