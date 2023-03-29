import HeaderView from "../views/headerView";
import logicFunctions from "../api/apiLogic";
import promiseNoData from "../applicationState/promiseNoData";
import ResultsView from "../views/resultsView";
import React from "react";
import usePromise from "../applicationState/usePromise";
import { Route, Routes } from "react-router";

function MainpagePresenter(props) {
	const urlParams = new URLSearchParams(window.location.search);
	const [search, setSearch] = React.useState(urlParams.get("search") || "");
	const [searchOption, setSearchOption] = React.useState(urlParams.get("option") || "Name");
	const [activateSearch, setActivateSearch] = React.useState(false);
	const [myPromise, setPromise] = React.useState(logicFunctions.searchDrinks(search, searchOption));
	React.useEffect(
		function () {
			setPromise(logicFunctions.searchDrinks(search, searchOption));
		},
		[activateSearch]
	);
	const [myData, myError] = usePromise(myPromise);

	document.addEventListener("keypress", function onEvent(event) {
		if (
			event.key === "Enter" &&
			search &&
			!window.location.href.includes("create") &&
			!window.location.href.includes("useringredients") &&
			!window.location.href.includes("login") &&
			!window.location.href.includes("signup")
		) {
			document.getElementById("link").click();
		}
	});

	return (
		<>
			<HeaderView
				autoSearchNameArray={props.model.validDrinkNames}
				autoSearchIngredientArray={props.model.validIngredients}
				searchOptions={["Name", "Ingredient"]}
				setSearchText={(text) => setSearch(text)}
				setSearchOption={(option) => setSearchOption(option)}
				searchText={search}
				activateSearch={() => setActivateSearch(!activateSearch)}
				URLSearch={urlParams.get("search")}
				selectedOption={searchOption}
			/>
			<Routes>
				<Route
					path="/"
					element={
						promiseNoData(myPromise, myData, myError) || <ResultsView searchResults={myData} clickedDrink={(id) => props.model.setCurrentDrink(id)} />
					}
				/>
			</Routes>
		</>
	);
}

export default MainpagePresenter;
