import { Link } from "react-router-dom";
import React from "react";

function SignupView(props) {
	return (
		<div>
			<div className="headers">
				<span>Create Account</span>
			</div>
			<div className="App">
				<div>{props.error !== "pass" && props.error}</div>
				<div className="loginBox">
					<input id="loginBox" type="email" placeholder="ENTER EMAIL" ref={props.emailRef} required></input>
				</div>
				<div className="loginBox">
					<input id="loginBox" type="password" placeholder="ENTER PASSWORD (At least 6 caracters)" ref={props.passwordRef} required></input>
				</div>
				<div className="loginBox">
					<input id="loginBox" type="password" placeholder="ENTER PASSWORD AGAIN" ref={props.passwordConfirmRef} required></input>
				</div>
				<button id="signupButton" disabled={props.loading} className="button" onClick={() => props.handleSubmit()}>
					Register
				</button>
				<div className="log">
					Already have an account?{" "}
					<Link to="/login">
						<b>Log in</b>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SignupView;
