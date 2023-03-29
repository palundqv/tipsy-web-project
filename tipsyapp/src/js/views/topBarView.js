import { Link } from "react-router-dom";

function TopbarView(props) {
	const urlParams = new URLSearchParams(window.location.search);
	return (
		<div>
			<table className="border"  width="100%">
				<tbody>
					<tr>
						{urlParams.get("search") ? (
							<td >
								<a className = "topB" href="/">HOME</a>
							</td>
						) : (
							<td>
								<Link className = "topB" to="/">HOME</Link>
							</td>
						)}
						<td>
							<Link className = "topB" to="/howto">HOW TO</Link>
						</td>
						{props.isUserLoggedIn ? (
							<>
								<td>
									<Link className = "topB" to="/list">SHOPPING LIST</Link>
								</td>
								<td>
									<Link className = "topB" to="/create">CREATE DRINK</Link>
								</td>
								<td>
									<Link className = "topB" to="/useringredients">YOUR INGREDIENTS</Link>
								</td>
								<td>
									<Link className = "topB" to="/account">ACCOUNT</Link>
								</td>
							</>
						) : (
							<>
								<td>
									<Link className = "topB" to="/signup">SIGN UP</Link>
								</td>
								<td>
									<Link className = "topB" to="/login">LOG IN</Link>
								</td>
							</>
						)}
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default TopbarView;
