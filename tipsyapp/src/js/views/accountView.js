import { BsHeart, BsGear, BsBookmark, BsFillBookmarkFill, BsFillHeartFill, BsGearFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";

function AccountView(props) {
	return (
		<div>
			<div>
				<div className="headers">
					<div>Welcome back!</div>
					<div>You're logged in as {props.currentUser.email}</div>
				</div>
			</div>
			<div className="ro center">
				<div className="widgets">
					{props.isActive && props.icon === "userfavourites" ? (
						<Link
							to={"/account"}
							onClick={() => {
								ActivateToggle(props, null);
							}}
						>
							<BsFillHeartFill id="widgets" />
						</Link>
					) : (
						<Link
							to={"userfavourites"}
							onClick={() => {
								ActivateToggle(props, "userfavourites");
							}}
						>
							<BsHeart id="widgets" />
						</Link>
					)}
				</div>
				<div className="widgets">
					{props.isActive && props.icon === "usercustom" ? (
						<Link
							to={"/account"}
							onClick={() => {
								ActivateToggle(props, null);
							}}
						>
							<BsFillBookmarkFill id="widgets" />
						</Link>
					) : (
						<Link
							to={"usercustom"}
							onClick={() => {
								ActivateToggle(props, "usercustom");
							}}
						>
							<BsBookmark id="widgets" />
						</Link>
					)}
				</div>
				<div className="widgets">
					{props.isActive && props.icon === "userpreferences" ? (
						<Link
							to="/account"
							onClick={() => {
								ActivateToggle(props, null);
							}}
						>
							<BsGearFill id="widgets" />
						</Link>
					) : (
						<Link
							to="userpreferences"
							onClick={() => {
								ActivateToggle(props, "userpreferences");
							}}
						>
							<BsGear id="widgets" />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

function UserFavouritesView(props) {
	const navigate = useNavigate();
	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 2 },
		{ width: 768, itemsToShow: 3 },
	];

	return (
		<div>
			<div className="toptop">
				<div className="line"></div>
				{props.favouriteDrinks.length > 0 ? (
					<>
						<Carousel breakPoints={breakPoints}>
							{props.favouriteDrinks.map((drink) => {
								return (
									<span onClick={() => (props.setDrink(drink.idDrink), navigate("/details"))} key={drink.idDrink} className="usersFavorites icon">
										<img className="imgCrop" alt={drink.idDrink} src={drink.strDrinkThumb} id="usersFavorites"></img>
										<div className="drinkName App">{drink.strDrink}</div>
									</span>
								);
							})}
						</Carousel>
					</>
				) : (
					<div>
						<div className="change">Here your favourite drinks will be shown!</div>
						<div className="change">Heart a drink to add it here!</div>
					</div>
				)}
			</div>
		</div>
	);
}

function UserCustomView(props) {
	const navigate = useNavigate();
	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 2 },
		{ width: 768, itemsToShow: 3 },
	];

	return (
		<div>
			<div className="toptop">
				<div className="line"></div>
				{props.customDrinks.length > 0 ? (
					<>
						<Carousel breakPoints={breakPoints}>
							{props.customDrinks.map((drink) => {
								return (
									<span onClick={() => (props.setDrink(drink.idDrink), navigate("/details"))} key={drink.idDrink} className="usersFavorites icon">
										<img className="imgCrop" alt={drink.idDrink} src={drink.strDrinkThumb} id="usersFavorites"></img>
										<div className="drinkName App textCrop">{drink.strDrink.length > 15 ? drink.strDrink.substr(0, 15) + "..." : drink.strDrink}</div>
									</span>
								);
							})}
						</Carousel>
					</>
				) : (
					<div>
						<div className="change">Here your custom drinks will be shown!</div>
						<div className="change">Go to CREATE DRINK to make your own!</div>
					</div>
				)}
			</div>
		</div>
	);
}

function UserPreferencesView(props) {
	return (
		<div>
			<div className="toptop">
				<div className="line"></div>
				<div className="App">
					<div className="floatCon">
						<div className="floatChild">
							<div className="change">Change email</div>
							<div>{props.emailError !== "pass" && props.emailError}</div>
							<input placeholder="Enter old email" className="rect input" ref={props.oldEmailRef} required></input>
							<input placeholder="Enter new email" className="rect input" ref={props.newEmailRef} required></input>
							<button
								className="saveButton icon"
								id="updateEmail"
								onClick={() => props.changeUserEmail(props.oldEmailRef.current.value.toLowerCase(), props.newEmailRef.current.value.toLowerCase())}
							>
								Save
							</button>
						</div>
						<div className="floatChild">
							<div className="change">Change password</div>
							<div>{props.passwordError !== "pass" && props.passwordError}</div>
							<input type="password" placeholder="Enter old password" className="rect input" ref={props.oldPasswordRef}></input>
							<input type="password" placeholder="Enter new password" className="rect input" ref={props.newPasswordRef} required></input>
							<input type="password" placeholder="Repeate new password" className="rect input" ref={props.newPasswordConfirmRef} required></input>
							<button
								className="saveButton icon"
								id="updatePassword"
								onClick={() => props.changeUserPassword(props.newPasswordRef.current.value, props.newPasswordConfirmRef.current.value)}
							>
								{" "}
								Save{" "}
							</button>
						</div>
						<button className="logout floatChild icon" id="logout" onClick={() => props.logOutUser()}>
							Log out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function ActivateToggle(props, icon) {
	/* Checks if an icon is already pressed or not, if so it will not toggle isActive when choosing a new icon */
	!icon && props.icon === icon ? ActivateToggle(props, icon) : props.setCurrentIcon(icon);
}

export { AccountView, UserFavouritesView, UserCustomView, UserPreferencesView };
