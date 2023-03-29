import CustomDrinkView from "../views/customDrinkView";
import React from "react";
import Popup from "../views/popup";
import Picture from "../pictures/drink-placeholder.jpg";

function CustomDrinkPresenter(props) {
	// custom drink: send array in format [strDrink, ingredients, strInstructions, strTaste, tags]
	// ingredients (and tags??) should preferrably be arrays. tags is tags
	// send to props.model.addToCustom(detailsArray)

	const [ingredients, setIngredients] = React.useState([]);
	const [drinkName, setDrinkName] = React.useState(null);
	const [instructions, setInstructions] = React.useState(null);
	const [inputIngred, setInputIngred] = React.useState("");
	const [inputAmount, setInputAmount] = React.useState(null);
	const [popupError, setPopupError] = React.useState(0);
	const [picture, setPicture] = React.useState(Picture);

	React.useEffect(() => {
		setTimeout(() => {
			setPopupError(0);
		}, 7000);
	}, [popupError]);

	React.useEffect(() => {
		setPicture(picture);
	}, [picture]);

	return (
		<>
			<CustomDrinkView
				autoSearchArray={props.model.validIngredients}
				inputIngred={inputIngred}
				inputAmount={inputAmount}
				setInputIngred={(text) => setInputIngred(text)}
				setInputAmount={(text) => setInputAmount(text)}
				ingredients={ingredients}
				addIngredient={() => (
					setIngredients((ingredients) => [...ingredients, [inputIngred, inputAmount]]), (document.getElementById("customIngred").value = "")
				)}
				removeIngredient={(ingredient) => setIngredients(ingredients.filter((array) => !array.includes(ingredient)))}
				doesIngredExist={() => props.model.validIngredients.some((e) => e.toLowerCase() === inputIngred.toLowerCase())}
				setDrinkName={(newName) => setDrinkName(newName)}
				setDrinkInstructions={(e) => setInstructions(e)}
				saveEnabled={() => drinkName && ingredients.length > 0 && instructions}
				saveDrink={() => (
					props.model.addToCustom([drinkName, Object.fromEntries(ingredients), picture, instructions]),
					(document.getElementById("custom").value = ""),
					(document.getElementById("discription").value = ""),
					setPicture(Picture),
					setIngredients([])
				)}
				doubleAddedIngredient={() =>
					ingredients
						.map((array) => array.find((ingredient) => ingredient.toLowerCase() === inputIngred.toLowerCase()))
						.some((result) => result === inputIngred)
				}
				popupError={popupError}
				setPopupError={(error) => setPopupError(error)}
				setFile={(img) => setPicture(img)}
				picture={picture}
			/>

			<Popup
				trigger={popupError}
				setTrigger={() => setPopupError(0)}
				className="popupCustom"
				message={
					{
						1: "ingredient doesn't exist in database",
						2: "Already added!",
						3: "You need to fill all the forms!",
						4: "Drink saved! You can find it in your account!",
					}[popupError]
				}
			/>
		</>
	);
}

export default CustomDrinkPresenter;
