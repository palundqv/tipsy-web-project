
import { Link } from "react-router-dom";
import {BsPlusCircle, BsHeart} from "react-icons/bs";
import { UseAuthentication } from "../authentication/authenticationContext";

function HowToView() {
	const { currentUser } = UseAuthentication();
	return (
		<div>
			<div className="howToText">
				<div className="headerHowTo">How to Tipsy </div>
				<div className="howToText sign">
					<span>
					{currentUser ? 
						(<div>
							<b className="c">1.</b>
							{" "} Create an account to access all the features! 
						</div>)
						:
						(<div>
							<b className="c">1.</b>
							<Link className = "a" to="/signup"><b> CREATE</b></Link> an account to access all the features! 
						</div>
						)}

					{currentUser ?
						(<div>
							<b className="c">2.</b> Add the ingredients you have at home in <Link className = "a" to="/useringredients"><b>YOUR INGREDIENTS</b></Link>
						</div>)
						:
						(<div>
							<b className="c">2.</b> Add the ingredients you have at home in <Link className = "a" to="/signup"><b>YOUR INGREDIENTS</b></Link>
						</div>)
						}
						<div>
							<b className="c">3.</b> Search for drinks by going to <Link className = "a" to="/"><b>HOME</b></Link>
						</div>
						<div>
							<b className="c">4.</b> Add the drinks you want to mix with the <BsPlusCircle className="c"/>  button

						</div>
						<div>
							<b className="c">5.</b> If you want to save the drink for the future, use the <BsHeart className="c"/> button
						</div>
						{currentUser ?
						(<div>
							<b className="c">6.</b> Plan your purchase by going to <Link className = "a" to="/list"><b>SHOPPING LIST</b></Link>
						</div>)
						:
						(<div>
							<b className="c">6.</b> Plan your purchase by going to <Link className = "a" to="/signup"><b>SHOPPING LIST</b></Link>
						</div>)
						}
						<div>
							<b className="c">7.</b> Now enjoy your drinks and get <Link className = "a" to="/"><b>TIPSY</b></Link>
						</div>
					</span>
				</div>
			</div>
			<div className="sign">
				<div>
					<span className="cbi">TipsyTeam, 2021</span>
				</div>
			</div>
		</div>
	);
}

export default HowToView;
