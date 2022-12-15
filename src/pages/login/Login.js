// styles
import "./Login.css";

import LoginComponent from "./LoginComponent";
import background from '../../assets/login-signup.png'

export default function Login() {
	

	return (
		<div className="login">
			<div className="left">
				<LoginComponent />
			</div>
			<div className="right">
				<img
					src={background}
					alt="background"
				/>
			</div>
		</div>
	);
}
