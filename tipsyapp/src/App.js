import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainpagePresenter from "./js/presenters/mainpagePresenter";
import DetailsPresenter from "./js/presenters/detailsPresenter";
import ListPresenter from "./js/presenters/listPresenter";
import AccountPresenter from "./js/presenters/accountPresenter";
import LoginPresenter from "./js/presenters/loginPresenter";
import CreateDrinkPresenter from "./js/presenters/customDrinkPresenter";
import HowToPresenter from "./js/presenters/howToPresenter";
import SignupPresenter from "./js/presenters/signupPresenter";
import TopBarPresenter from "./js/presenters/topBarPresenter";
import UserIngredientsPresenter from "./js/presenters/userIngredientsPresenter";
import { UseAuthentication } from "./js/authentication/authenticationContext";
import { persistModel } from "./js/firebaseFolder/firebaseModel";

function App(props) {
	persistModel(props.model);
	const { currentUser } = UseAuthentication();
	return (
		<>
			<TopBarPresenter />
			<Routes>
				<Route
					path="/*"
					element={
						<div>
							<MainpagePresenter model={props.model} />
						</div>
					}
				/>
				{currentUser && (
					<>
						<Route path="/create" element={<CreateDrinkPresenter model={props.model} />} />
						<Route path="/list" element={<ListPresenter model={props.model} />} />
						<Route path="/account/*" element={<AccountPresenter model={props.model} />} />
						<Route path="/useringredients" element={<UserIngredientsPresenter model={props.model} />} />
					</>
				)}

				<Route path="/howto" element={<HowToPresenter model={props.model} />} />
				<Route path="/details" element={<DetailsPresenter model={props.model} />} />
				<Route path="/login" element={<LoginPresenter model={props.model} />} />
				<Route path="/signup" element={<SignupPresenter model={props.model} />} />
			</Routes>
		</>
	);
}

export default App;
