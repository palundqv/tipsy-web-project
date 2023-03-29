import "../../App.css";
import { Link } from "react-router-dom";
import { BsXCircle } from "react-icons/bs";
import { Autocomplete } from "@mui/material";

function UserIngredientsView(props) {
	return (
		<div className="App">
			<div className="headers">Your ingredients</div>
			<Autocomplete
				inputValue={props.inputText}
				onInputChange={(e, v) => props.setInputText(v && v.toLowerCase())}
				sx={{
					// Autocomplete from mui won't accept css code
					display: "inline-block",
					"& input": {
						border: 1,
						height: 32,
						border: "solid black 1px",
						width: 300,
						borderTopLeftRadius: 14,
						borderBottomLeftRadius: 14,
						textAlign: "center",
						bgcolor: "background.paper",
						color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
					},
				}}
				options={props.autoSearchIngredientArray}
				renderInput={(params) => (
					<div ref={params.InputProps.ref}>
						<input type="text" {...params.inputProps} />
					</div>
				)}
			/>
			<button className="ingredBtn icon" id="addIngredientButton" onClick={() => props.addIngredient()}>
				Add ingredient
			</button>
			<div className="myIngred">
				{props.ingredients.map((ingredient) => (
					<table className="ingred ml table">
						<Link to={"/?search=" + ingredient + "&option=Ingredient"}>{ingredient}</Link>
						<BsXCircle onClick={() => props.removeIngredient(ingredient)} className="noIngred icon" />
					</table>
				))}
			</div>
		</div>
	);
}

export default UserIngredientsView;
