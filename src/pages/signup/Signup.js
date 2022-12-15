// styles
import "./Signup.css";
// hooks
import { useState, useEffect } from "react";
// logo image
import logo from "../../assets/AI.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import background from "../../assets/login-signup.png";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();

	const { apiData, message, error, isPending, postData } = useFetch(
		"https://auth-system-production.up.railway.app/v1/api/auth/signup",
		"POST"
	);

	useEffect(() => {
		if (apiData) {
			if (apiData.success) {
				localStorage.setItem("accessToken", apiData.data.accessToken);
				dispatch({ type: "LOGIN", payload: apiData.success });
				navigate("/tool");
			}
		}
	}, [apiData, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		postData({ name, email, password });
		// clearForm()
	};

	const clearForm = () => {
		setEmail("");
		setPassword("");
		setName("");
	};

	return (
		<div className="signup">
			<div className="left">
				<form className="signup-form" onSubmit={handleSubmit}>
					<div className="title">
						<img className="logo" src={logo} alt="logo" />
						<h2>Continue to AI</h2>
					</div>
					<label id="displayName">Name:</label>
					<input
						id="displayName"
						type="text"
						required
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<label id="email">Email:</label>
					<input
						id="email"
						type="email"
						required
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<label id="password">Password:</label>
					<input
						id="password"
						type="password"
						required
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					{!isPending && <button className="btn">Signup</button>}
					{isPending && (
						<button className="btn" disabled>
							Loading
						</button>
					)}
					{message && <p>{message}</p>}
					{/* {error && <p>{error}</p>} */}
					<div className="checkbox">
						<input type="checkbox" id="checkbox" />
						<label className="checkbox-label" htmlFor="checkbox">
							Accept T&Cs and Privacy Policy
						</label>
					</div>
					<p>
						Already have an account?
						<Link to={"/login"}> Login</Link>
					</p>
				</form>
			</div>
			<div className="right">
				<img src={background} alt="background" />
			</div>
		</div>
	);
}
