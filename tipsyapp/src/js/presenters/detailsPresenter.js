import DetailsView from "../views/detailsView";
import UseModel from "../applicationState/useModel";
import promiseNoData from "../applicationState/promiseNoData";
import React from "react";
import Popup from "../views/popup";
import { useNavigate } from "react-router-dom";

function DetailsPresenter(props) {
	const currentDrink = UseModel(props.model, "currentDrinkDetails");
	const currentDrinkDetails = UseModel(props.model, "currentDrinkDetails");
	const isDrinkNotInFavourites = !props.model.drinks.favourites.find((d) => d.idDrink == props.model.currentDrink);
	const [isHeartActive, setHeartActive] = React.useState(!isDrinkNotInFavourites);
	const [buttonPopup, setButtonPopup] = React.useState(false);
	const [deleteBoolean, setDeleteBoolean] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(
		function () {
			function obs() {
				setHeartActive(!isDrinkNotInFavourites);
			}
			props.model.addObserver(obs);
			return function () {
				props.model.removeObserver(obs);
			};
		},
		[isHeartActive]
	);

	const isDrinkNotInList = !props.model.drinks.list.find((d) => d.idDrink == props.model.currentDrink);
	const [isPlusActive, setPlusActive] = React.useState(!isDrinkNotInList);
	React.useEffect(
		function () {
			function obs() {
				setPlusActive(!isDrinkNotInList);
			}
			props.model.addObserver(obs);
			return function () {
				props.model.removeObserver(obs);
			};
		},
		[isPlusActive]
	);

	React.useEffect(() => {
		setTimeout(() => {
			setButtonPopup(false);
		}, 7000);
	}, [buttonPopup]);

	return (
		promiseNoData(props.model.currentDrink, UseModel(props.model, "currentDrinkDetails"), UseModel(props.model, "currentDrinkError")) || (
			<>
				<DetailsView
					drink={currentDrinkDetails}
					isDrinkInList={() => props.model.drinks.list.find((d) => d.idDrink === currentDrinkDetails.idDrink)}
					addDrinkToList={() => props.model.addToList(currentDrink)}
					removeDrinkFromList={(drink) => props.model.removeFromList(drink)}
					isPlusActive={isPlusActive}
					setPlusActive={() => setPlusActive(!isPlusActive)}
					isDrinkInFavourites={(drink) => props.model.drinks.favourites.find((d) => d.idDrink === drink.idDrink)}
					addDrinkToFavourites={() => props.model.addToFavourites(currentDrinkDetails)}
					removeDrinkFromFavourites={(drink) => props.model.removeFromFavourites(drink)}
					isHeartActive={isHeartActive}
					setHeartActive={() => setHeartActive(!isHeartActive)}
					buttonPopup={buttonPopup}
					setButtonPopup={(boolean) => setButtonPopup(boolean)}
					isDrinkInCustom={(drink) => props.model.drinks.custom.find((d) => d.idDrink === drink.idDrink)}
					deleteCustom={() => (setDeleteBoolean(true), setButtonPopup(true))}
				/>

				<Popup
					trigger={buttonPopup}
					setTrigger={() => setButtonPopup(false)}
					className="popup"
					message={
						deleteBoolean
							? "Are you sure you want do delete this custom drink?"
							: "Drink added to shopping list! Go to SHOPPING LIST to see the ingredients!"
					}
					delete={deleteBoolean}
					removeFromCustom={() => (
						props.model.removeFromCustom(currentDrink),
						props.model.removeFromFavourites(currentDrink),
						props.model.removeFromList(currentDrink),
						navigate(-1)
					)}
				/>
			</>
		)
	);
}

export default DetailsPresenter;
