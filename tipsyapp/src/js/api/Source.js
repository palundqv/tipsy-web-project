import { BASE_URL, API_KEY } from "./apiConfig.js";

const DrinkSource = {
  apiCall(params) {
    return fetch(BASE_URL + params, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    })
      .then((response) => {
        if (response.status != "200") {
          throw response.statusText;
        } else {
          return response;
        }
      })
      .then((response) => response.json());
  },
  searchDrinkByName(params) {
    // Returns array of drink objects [{},{},{}]
    return DrinkSource.apiCall("/search.php?s=" + params).then(
      (data) => data.drinks).then((data) => data === null ? "None Found" :  data);
  },

  getDrinkDetails(id) {
    // Returns an array with one objecy with the drink information [{}]
    return DrinkSource.apiCall("/lookup.php?i=" + id).then(
      (data) => data.drinks
    );
  },
  getDrinkByIngredient(ingredient) {
    // Returns an array of objects with [{},{},{}] => {idDrink, strDrink, strDrinkThumb}
    return DrinkSource.apiCall("/filter.php?i=" + ingredient).then(
      (data) => data.drinks
    );
  },

  getPopularDrinks() {
    return DrinkSource.apiCall("/popular.php").then((data) => data.drinks);
  },
  getIngredients() {
    return DrinkSource.apiCall("/list.php?i=list").then((data) =>
      data.drinks.map(object => Object.values(object))
    );
  },

};

export default DrinkSource;
