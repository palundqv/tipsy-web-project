import { useNavigate } from "react-router-dom";
import { BsDashCircle, BsPlusCircle, BsFillHeartFill, BsXCircle, BsHeart, BsTrash } from "react-icons/bs";
import "../../App.css";
import { UseAuthentication } from "../authentication/authenticationContext";

function DetailsView(props) {
	const { currentUser } = UseAuthentication();
	const navigate = useNavigate();
	return (
		<div className="container">
			<div className="flex">
				<span className="text">
					<div className="drink">{props.drink.strDrink}</div>
					<img src={props.drink.strDrinkThumb} alt="drinkPicture" className="drinkImg"></img>
				</span>
			</div>

			<div>
				<div className={currentUser != null ? "rowIcons" : "hidden"}>
					<div className="col icon">
						{!props.isPlusActive ? (
							<BsPlusCircle
								id="widgets"
								onClick={() => {
									props.addDrinkToList(props.drink);
									props.setButtonPopup(true);
									props.setPlusActive();
								}}
							/>
						) : (
							<BsDashCircle
								id="widgets"
								onClick={() => {
									props.removeDrinkFromList(props.drink);
									props.setButtonPopup(false);
									props.setPlusActive();
								}}
							/>
						)}
					</div>
					<div className="col icon">
						{!props.isHeartActive ? (
							<BsHeart
								id="widgets"
								onClick={() => {
									props.addDrinkToFavourites(props.drink), props.setHeartActive();
								}}
							/>
						) : (
							<BsFillHeartFill
								id="widgets"
								onClick={() => {
									props.removeDrinkFromFavourites(props.drink), props.setHeartActive();
								}}
							/>
						)}
					</div>
				</div>
			</div>

			<div className={currentUser != null ? "ingredList" : "ingredList margin"}>
				<h1 className="drink">Ingredients</h1>
				{Object.entries(props.drink.ingredients).map(([ingredient, amount]) => (
					<table className="ingred table">
						{amount} {ingredient}
					</table>
				))}
				<div className="instruction">{props.drink.strInstructions}</div>
			</div>
			{props.isDrinkInCustom(props.drink) && (
				<div className="icon">
					<BsTrash onClick={() => props.deleteCustom(props.drink)} className="remove" id="back" />
				</div>
			)}
			<div className="icon">
				<BsXCircle onClick={() => navigate(-1)} className="back" id="back" />
			</div>
		</div>
	);
}

export default DetailsView;
