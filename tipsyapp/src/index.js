//import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import DrinkModel from "./js/applicationState/Model";
import firebase from "firebase/compat/app";
import { AuthenticationProvider } from "./js/authentication/authenticationContext";

const myModel = new DrinkModel();
firebase
	.database()
	.ref("tipsy")
	.once("value")
	.then(() =>
		ReactDOM.render(
			<BrowserRouter>
				<AuthenticationProvider>
					<App model={myModel} />
				</AuthenticationProvider>
			</BrowserRouter>,
			document.getElementById("root")
		)
	);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
