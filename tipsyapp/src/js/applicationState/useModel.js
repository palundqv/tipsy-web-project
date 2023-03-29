import React from "react";

export function UseModel(model, property) {
	if (property.includes(".")) {
		const properties = property.split(".");
		const [value, setValue] = React.useState(model[properties[0]][properties[1]]);
		React.useEffect(
			function () {
				function obs() {
					setValue(model[properties[0]][properties[1]]);
				}
				model.addObserver(obs);
				return function () {
					model.removeObserver(obs);
				};
			},
			[model]
		);
		return value;
	}

	else {
		const [value, setValue] = React.useState(model[property]);
		React.useEffect(
			function () {
				function obs() {
					setValue(model[property]);
				}
				model.addObserver(obs);
				return function () {
					model.removeObserver(obs);
				};
			},
			[model]
		);
		return value;
	}
}

export default UseModel;
