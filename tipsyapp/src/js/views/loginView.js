import { Link } from "react-router-dom";
import React from "react";

function LoginView(props) {
	return (
		<div>
			<div className="headers">
				<span>Log In</span>
			</div>
			<div className="App">
				{<div>{props.error}</div>}
				<div className="loginBox">
					<input id="loginBox" type="email" placeholder="ENTER EMAIL" ref={props.emailRef} required></input>
				</div>
				<div className="loginBox">
					<input id="loginBox" type="password" placeholder="ENTER PASSWORD" ref={props.passwordRef} required></input>
				</div>
				<button id="loginbutton" disabled={props.loading} className="button" onClick={() => props.handleSubmit()}>
					Submit
				</button>
				<div className="log">
					Dont have an account?{" "}
					<Link to="/signup">
						<b>Sign up</b>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default LoginView;
