import ListView from "../views/listView";
import UseModel from "../applicationState/useModel";

function ListPresenter(props) {
	return (
		<ListView
			selectedDrinks={UseModel(props.model, "drinks.list")}
			removeDrink={(drink) => props.model.removeFromList(drink)}
			missingIngredients={props.model.createShoppingList()}
			clickedDrink={(id) => props.model.setCurrentDrink(id)}
			isIngredientAdded={(ingred) => props.model.ingredients.find((ingredient) => ingredient === ingred.toLowerCase())}
		/>
	);
}

export default ListPresenter;
