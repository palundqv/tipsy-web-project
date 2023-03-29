import Source from "./Source";

const logicFunctions = {
	searchDrinks(searchTerm, searchOption) {
		return !searchTerm
			? this.getPopularDrinkList()
			: searchOption === "Name"
			? this.searchByName(searchTerm)
			: searchOption === "Ingredient" && this.searchByIngredient(searchTerm);
	},
	searchByName(searchstring) {
		// Returns drinks from search based on search string.
		return Source.searchDrinkByName(searchstring);
	},
	searchByIngredient(ingredient) {
		return Source.getDrinkByIngredient(ingredient);
	},
	getDrinkById(id) {
		return Source.getDrinkDetails(id);
	},
	getPopularDrinkList() {
		return Source.getPopularDrinks();
	},
};

export default logicFunctions;
