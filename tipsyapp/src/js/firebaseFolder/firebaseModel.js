import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { UseAuthentication } from "../authentication/authenticationContext";

export function persistModel(model) {
	let loadingFromFirebase = false;
	const { currentUser } = UseAuthentication();
	const userRef = currentUser ? currentUser.uid : "tipsy";

	model.addObserver(function () {
		if (!loadingFromFirebase) {
			const user = firebase.auth().currentUser;
			firebase.database().ref(user.uid).set({
				list: model.drinks.list,
				favourites: model.drinks.favourites,
				custom: model.drinks.custom,
				ingredients: model.ingredients,
				currentDrink: model.currentDrink,
			});
		}
	}),
		firebase
			.database()
			.ref(userRef)
			.on("value", function (data) {
				loadingFromFirebase = true;
				try {
					if (data.val()) {
						model.updateModel(data.val().list, data.val().favourites, data.val().custom, data.val().ingredients, data.val().currentDrink);
					}
				} catch (e) {
					console.log(e);
				} finally {
					loadingFromFirebase;
				}
				loadingFromFirebase = false;
			});
}
