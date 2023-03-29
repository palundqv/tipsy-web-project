import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Autocomplete } from "@mui/material";

function HeaderView(props) {
	return (
		<div>
			<div className="header">
				<div className="name">
					<span>Tipsy</span>
				</div>
				<div>
					<span className="instructions ins neonBorder"> Start looking for drinks! </span>
				</div>
				<select className="options" onChange={(e) => props.setSearchOption(e.target.value)}>
					<option value="" disabled selected>
						Search by...
					</option>
					{props.searchOptions.map(function (opt) {
						return <option key={opt}>{opt}</option>;
					})}
				</select>
				<Autocomplete
					inputValue={props.searchText}
					onInputChange={(e, v) => props.setSearchText(v && v.toLowerCase())}
					sx={{
						display: "inline-block",
						"& input": {
							border: 1,
							height: 27,
							border: "solid black 1px",
							width: 500,
							textAlign: "center",
							bgcolor: "background.paper",
							color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
						},
					}}
					options={props.selectedOption === "Ingredient" ? props.autoSearchIngredientArray : props.autoSearchNameArray}
					renderInput={(params) => (
						<div ref={params.InputProps.ref}>
							<input type="text" {...params.inputProps} size="100" placeholder={props.URLSearch || "Search"} />
						</div>
					)}
				/>

				<Link id="link" to={"?search=" + props.searchText + "&option=" + props.selectedOption} onClick={() => props.activateSearch()}>
					<button className="search-btn icon" id="search-btn">
						<BsSearch />
					</button>
				</Link>
			</div>
		</div>
	);
}

export default HeaderView;
