import { Link } from "react-router-dom";

function ResultsView(props) {
	return (
		<div className="App" style={{ backgroundImage: "linear-gradient(to bottom right, rgb(158, 1, 54), rgb(28, 87, 163))" }}>
			{props.searchResults.map((drink) => {
				return (
					<Link
						onClick={() => {
							props.clickedDrink(drink.idDrink);
						}}
						to="/details"
					>
						<span key={drink.idDrink} className="searchResults">
							<img alt={drink.idDrink} src={drink.strDrinkThumb} id="pic"></img>
							<div className="drinkName">{drink.strDrink.length > 20 ? drink.strDrink.substr(0, 20) + "..." : drink.strDrink}</div>
						</span>
					</Link>
				);
			})}
		</div>
	);
}

export default ResultsView;
