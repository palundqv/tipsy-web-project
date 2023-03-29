import UserIngredientsView from "../views/userIngredientsView";
import UseModel from "../applicationState/useModel";
import React from "react";
import Popup from "../views/popup";

function UserIngredientsPresenter(props) {
	const [inputText, setInputText] = React.useState("");
	const [enterpress, setEnterPress] = React.useState(false);
	const [popupError, setPopupError] = React.useState(0);

	React.useEffect(() => {
		setTimeout(() => {
			setPopupError(0);
		}, 5000);
	}, [popupError]);

	// Enable enterpress
	document.addEventListener("keypress", function onEvent(event) {
		if (event.key === "Enter" && inputText && window.location.href.includes("useringredients")) {
			document.getElementById("addIngredientButton").click();
		}
	});

	function doubleAddedIngredient() {
		return props.model.ingredients.find((ingredient) => ingredient.toLowerCase() === inputText);
	}
	function ingredientExists() {
		return props.model.validIngredients.some((e) => e.toLowerCase() === inputText);
	}

	return (
		<>
			<UserIngredientsView
				autoSearchIngredientArray={UseModel(props.model, "validIngredients")}
				ingredients={UseModel(props.model, "ingredients")}
				removeIngredient={(ingred) => props.model.removeFromIngredients(ingred)}
				ingredientExists={() => ingredientExists()}
				inputText={inputText}
				setInputText={(text) => setInputText(text)}
				addIngredient={() =>
					inputText && !ingredientExists()
						? setPopupError(1)
						: doubleAddedIngredient()
						? setPopupError(2)
						: (props.model.addToIngredients(inputText), setInputText(""))
				}
				setPopupError={(error) => setPopupError(error)}
			/>

			<Popup
				trigger={popupError}
				setTrigger={() => setPopupError(0)}
				className="popupIngred"
				message={{ 1: "Ingredient doesn't exist", 2: "Ingredient is already added!" }[popupError]}
			/>
		</>
	);
}

export default UserIngredientsPresenter;
