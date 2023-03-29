import _ from "lodash";
import logicFunctions from "../api/apiLogic.js";
import DrinkSource from "../api/Source.js";

class DrinkModel {
	constructor(drinks = { list: [], favourites: [], custom: [] }, currentDrink = null, ingredients = [], observers = []) {
		this.drinks = drinks;
		this.currentDrink = currentDrink; // id in formt c1234 or 12345
		this.ingredients = ingredients; // array (str)
		this.idCounter = 1000;
		this.observers = observers;
		this.currentDrinkDetails = null;
		this.setValidIngredients();
		this.setValidNames();
	}

	setValidIngredients() {
		DrinkSource.getIngredients()
			.then((data) => [].concat.apply([], data))
			.then((data) => (this.validIngredients = data));
	}

	setValidNames() {		
		DrinkSource.searchDrinkByName("").then((data) => data.map(object => object.strDrink)).then(data => this.validDrinkNames = data);
	}

	setCurrentDrink(id) {
		// setting detailed drink information
		if (this.currentDrink === id) return;
		if (!id.startsWith("c")) { // api drinks
			this.currentDrink = id;
			this.currentDrinkDetails = null;
			this.currentDrinkError = null;
			this.notifyObservers();
			if (this.currentDrink) {
				logicFunctions
					.getDrinkById(id)
					.then((dt) => (this.currentDrink === id ? ((this.currentDrinkDetails = reformatDrink(dt[0])), this.notifyObservers()) : null))
					.catch((er) => (this.currentDrink === id ? ((this.currentDrinkError = er), this.notifyObservers()) : null));
			}
		} else { // custom drinks
			this.currentDrink = id;
			this.currentDrinkDetails = this.drinks.custom.find((drink) => drink.idDrink === id);
			this.notifyObservers(); 
		}
	}

	addToList(drink) {
		this.drinks.list.some(e => e.idDrink === drink.idDrink) ? null : (this.drinks.list = [...this.drinks.list, drink]), this.notifyObservers();
	}

	addToFavourites(drink) {
		this.drinks.favourites.some(e => e.idDrink === drink.idDrink) ? null : (this.drinks.favourites = [...this.drinks.favourites, drink]),
			this.notifyObservers();
	}

	addToIngredients(ingredient) {
		this.validIngredients &&
			!this.ingredients.find(e => e === ingredient) &&
			this.validIngredients.some(e => e.toLowerCase() === ingredient.toLowerCase()) &&
			((this.ingredients = [...this.ingredients, ingredient]), this.notifyObservers());
	}

	addToCustom(detailsArray) {
		const [strDrink, ingredients, img, strInstructions] = detailsArray;
		delete ingredients[null];
		const id = "c" + this.idCounter;
		this.idCounter++;
		this.drinks.custom = [
			...this.drinks.custom,
			{
				idDrink: id,
				strDrink: strDrink,
				ingredients: ingredients,
				strDrinkThumb: img,
				strInstructions: strInstructions,
			},
		];
		this.notifyObservers();
	}

	updateModel(list, favourites, custom, ingredients, currentDrink) {
		if (list) {
			this.drinks.list = list;
		}
		if (favourites) {
			this.drinks.favourites = favourites;
		}
		if (custom) {
			this.drinks.custom = custom;
		}
		if (ingredients) {
			this.ingredients = ingredients;
		}
		if (currentDrink){
			this.setCurrentDrink(currentDrink)
		}
		this.notifyObservers();
	}

	removeFromList(drink) {
		(this.drinks.list = this.drinks.list.filter((d) => d.idDrink !== drink.idDrink)), this.notifyObservers();
	}

	removeFromFavourites(drink) {
		(this.drinks.favourites = this.drinks.favourites.filter((d) => d.idDrink !== drink.idDrink)), this.notifyObservers();
	}

	removeFromCustom(drink) {
		(this.drinks.custom = this.drinks.custom.filter((d) => d.idDrink !== drink.idDrink)), this.notifyObservers();
	}

	removeFromIngredients(ingredient) {
		(this.ingredients = this.ingredients.filter(e => e !== ingredient)), this.notifyObservers();
	}

	addObserver(callback) {
		this.observers = [...this.observers, callback];
	}

	removeObserver(callback) {
		this.observers = this.observers.filter((observer) => observer !== callback);
	}

	notifyObservers() {
		this.observers.forEach((cb) => {
			try {
				cb();
			} catch (error) {
				console.log(error);
			}
		});
	}

	createShoppingList() {
		/* Returns shopping list in 1d array with ingredient names */
		const inRecipes = this.drinks.list;
		const have = this.ingredients;
		if (inRecipes.length > 0) {
			// get 1d array of all drink ingredients and filter them for doubles
			const aggregated = inRecipes.map(drink => drink.ingredients).map(ingredient => Object.keys(ingredient)).flat().filter((v, i, a) => a.indexOf(v) === i);
			if (have.length > 0) {
				return aggregated.filter((ingredient) => !have.some(e => e.toLowerCase() === ingredient.toLowerCase()));
			} else {
				return aggregated;
			}
		} else {
			return [""];
		}
	}
}

// --- NON MODEL DEPENDENT FUNCTIONS ----

function reformatDrink(drinkObject) {
	/* Reformats an api detailed drink into more suitable and concise format */
	if (drinkObject) {
		const ingredients = reformatIngredients(drinkObject);
		const tags = drinkObject.strTags ? drinkObject.strTags.split(",") : [];
		const { idDrink, strDrink, strDrinkThumb, strInstructions } = drinkObject;
		return {
			idDrink: idDrink,
			strDrink: strDrink,
			ingredients: ingredients,
			strDrinkThumb: strDrinkThumb,
			strInstructions: strInstructions,
			tags: tags,
		};
	} else throw "No drink to be reformatted";
}

function reformatIngredients(drinkObject) {
	/* Reformat the ingredient and amount properties from api objects
	 * @return ingredients in format {'Vodka': '1/2 oz ', 'Gin': '1/2 oz ', 'Lemon': 'Juice of 1/2 '} */
	if (drinkObject) {
		const ingredientNames = _.filter(drinkObject, (value, key) => key.startsWith("strIngredient")); // send in drinkObject.drinks[0] instead as param?
		const measures = _.filter(drinkObject, (value, key) => key.startsWith("strMeasure")).map((measure) => {
			return measure === null ? "up to own liking " : measure;
		});
		const ingredients = _.zipObject(ingredientNames, measures);
		delete ingredients[null];
		return ingredients;
	} else throw "Ingredients can not be reformatted as there is no drink object";
}

export default DrinkModel;
