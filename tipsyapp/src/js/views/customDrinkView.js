import { Autocomplete } from "@mui/material";
import React from "react";

function CustomDrinkView(props) {
	return (
		<div className="contain marginLeft">
			<div className="flex">
				<span className="text">
					<div className="drink cc">
						<span className="headingCustom paddingSide">Drink Name</span>
						<input id="custom" placeholder="Give your drink a name..." onChange={(e) => props.setDrinkName(e.target.value)}></input>
					</div>
					<div>
						<img src={props.picture} alt="drinkPicture" className="drinkImgCrop"></img>
					</div>

					<div className="headingCustom cc">
						<span className="paddingRight">Upload a picture</span>
						<input
							id="upload"
							type="file"
							accept="image/*"
							hidden
							onChange={(e) => (
								props.setFile(URL.createObjectURL(e.target.files[0])),
								alert("WARNING: Your picture will only be stored locally, \nas we are too cheap to pay for more firebase storage")
							)}
						/>
						<label className="icon" for="upload">
							Choose File
						</label>
					</div>
				</span>
			</div>

			<div className="ingredList flexx">
				<div className="headingCustom paddingTop">Add ingredients to your own drink!</div>
				<div className="row paddingCustom">
					<input
						value={props.inputAmount}
						id="customIngred"
						autoComplete="off"
						placeholder="Add amount"
						onChange={(ev) => props.setInputAmount(ev.target.value)}
					></input>
					<Autocomplete
						inputValue={props.inputIngred}
						onInputChange={(e, v) => props.setInputIngred(v && v.toLowerCase())}
						sx={{
							display: "inline-block",
							"& input": {
								border: 1,
								height: 30,
								border: "solid black 1px",
								width: 250,
								borderRadius: 2.5,
								textAlign: "center",
								bgcolor: "background.paper",
								color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
							},
						}}
						options={props.autoSearchArray}
						renderInput={(params) => (
							<div ref={params.InputProps.ref}>
								<input id="customIngred" type="text" {...params.inputProps} placeholder="Add ingredient" />
							</div>
						)}
					/>
					<button
						disabled={!props.inputIngred || !props.inputAmount}
						id="tagBtn"
						className="icon"
						onClick={() =>
							!props.doesIngredExist() ? props.setPopupError(1) : props.doubleAddedIngredient() ? props.setPopupError(2) : props.addIngredient()
						}
					>
						+
					</button>
				</div>
				{props.ingredients.map(([ingredient, amount]) =>
					ingredient ? (
						<table className="ingred table">
							{amount} {ingredient}
							<button id="removeBtn" onClick={() => props.removeIngredient(ingredient)}>
								x
							</button>
						</table>
					) : null
				)}
				<div className="description">
					<div className="col">
						<p>
							<textarea
								id="discription"
								placeholder="Describe how to mix..."
								className="textarea"
								role="text"
								contentEditable
								onChange={(e) => props.setDrinkInstructions(e.target.value)}
							></textarea>
						</p>
					</div>
				</div>
				<button className="save icon" onClick={() => (props.saveEnabled() ? (props.saveDrink(), props.setPopupError(4)) : props.setPopupError(3))}>
					Save drink!
				</button>
			</div>
		</div>
	);
}

export default CustomDrinkView;
