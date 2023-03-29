import { AccountView, UserFavouritesView, UserCustomView, UserPreferencesView } from "../views/accountView";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UseAuthentication } from "../authentication/authenticationContext";

function AccountPresenter(props) {
	const [isActive, setActive] = React.useState(true);
	const [icon, setIcon] = React.useState(null);
	const { logout, changePassword, changeEmail, currentUser } = UseAuthentication();
	const [emailError, setEmailError] = React.useState(null);
	const [passwordError, setPasswordError] = React.useState(null);
	const navigate = useNavigate();
	const oldEmailRef = React.useRef();
	const newEmailRef = React.useRef();
	const oldPasswordRef = React.useRef();
	const newPasswordRef = React.useRef();
	const newPasswordConfirmRef = React.useRef();

	async function logOutUser() {
		try {
			await logout();
			navigate("/");
		} catch {
			alert("Logout failed! Please try again");
		}
	}

	async function updateEmail(oldEmail, newEmail) {
		if (
			!oldEmail || !newEmail
				? setEmailError("Please fill both bars")
				: currentUser.email !== oldEmail
				? setEmailError("Old email does not match user email!")
				: !newEmail.includes("@")
				? setEmailError("Your new mail needs to be an email")
				: true
		) {
			try {
				await changeEmail(newEmail);
				setEmailError("Change successful!");
			} catch {
				setEmailError("Failed to change email");
			}
		}
	}
	async function updatePassword(password, passwordConfirm) {
		if (
			!password || !passwordConfirm
				? setPasswordError("Please fill all the bars")
				: password !== passwordConfirm
				? setPasswordError("Passwords does not match!")
				: password.length < 6
				? setPasswordError("New password needs to be at least 6 characters long")
				: true
		) {
			try {
				await changePassword(password);
				setPasswordError("Password changed!");
			} catch {
				setPasswordError("Wrong old password!");
			}
		}
	}

	return (
		<div>
			<AccountView
				isActive={isActive}
				icon={icon}
				toggle={() => setActive(!isActive)}
				setCurrentIcon={(data) => setIcon(data)}
				currentUser={currentUser}
			/>
			<Routes>
				<Route
					path={`/userfavourites`}
					element={<UserFavouritesView favouriteDrinks={props.model.drinks.favourites} setDrink={(id) => props.model.setCurrentDrink(id)} />}
				/>
				<Route
					path={`/usercustom`}
					element={<UserCustomView customDrinks={props.model.drinks.custom} setDrink={(id) => props.model.setCurrentDrink(id)} />}
				/>
				<Route
					path={`/userpreferences`}
					element={
						<UserPreferencesView
							changeUserPassword={(newPassword, newPasswordConfirm) => updatePassword(newPassword, newPasswordConfirm)}
							changeUserEmail={(oldEmail, newEmail) => updateEmail(oldEmail, newEmail)}
							logOutUser={() => logOutUser()}
							emailError={emailError}
							passwordError={passwordError}
							oldEmailRef={oldEmailRef}
							newEmailRef={newEmailRef}
							oldPasswordRef={oldPasswordRef}
							newPasswordRef={newPasswordRef}
							newPasswordConfirmRef={newPasswordConfirmRef}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default AccountPresenter;
