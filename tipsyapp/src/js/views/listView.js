import { Link } from "react-router-dom";
import { BsXCircle } from "react-icons/bs";

function ListView(props) {
	return (
		<div className="float-container">
			<div className="left">
				<div className="head">Drink list</div>
				<div>
					{props.selectedDrinks &&
						props.selectedDrinks.map((drink) => (
							<div>
								<BsXCircle onClick={() => props.removeDrink(drink)} className="noDrink icon" />

								<div className="drinkList">
									<Link to="/details" id="drinkList" className="icon" onClick={() => props.clickedDrink(drink.idDrink)}>
										{drink.strDrink}
									</Link>
								</div>
								{Object.keys(drink.ingredients).map((ingredient) =>
									props.isIngredientAdded(ingredient) ? (
										<div className="ingredients textShadow">{ingredient}</div>
									) : (
										<div className="ingredients">{ingredient}</div>
									)
								)}
							</div>
						))}
				</div>
			</div>
			<div className="right">
				<div className="head">Shopping list</div>
				<div className="ingredients">
					<div>
						{props.missingIngredients.map((ingredient) => (
							<div>
								<span>{ingredient}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListView;
