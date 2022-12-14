// hooks
import { useEffect, useState } from "react";

// logo image
import logo from "../../assets/AI.svg";
import { Link, useNavigate } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import {useAuthContext} from '../../hooks/useAuthContext'

export default function LoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch } = useAuthContext()
	const navigate = useNavigate()

	const { apiData, message, error, isPending, postData } = useFetch(
		"https://auth-system-production.up.railway.app/v1/api/auth/signin",
		"POST"
	);

	useEffect(() => {
	if (apiData) {
		if (apiData.success) {
			localStorage.setItem("accessToken", apiData.data.accessToken);
			dispatch({ type: 'LOGIN', payload: apiData.success })
			navigate('/tool')
			}
		}
	}, [apiData, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		postData({ email, password });
		clearForm();
	};

	const clearForm = () => {
		setEmail("");
		setPassword("");
	};

	return (
		<form className="login-form imageGenerate" onSubmit={handleSubmit}>
			<div className="title">
				<img className="logo" src={logo} alt="logo" />
				<h2>Continue to AI</h2>
			</div>
			<label id="email">Email:</label>
			<input
				id="email"
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<label id="password">Password:</label>
			<input
				id="password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			{!isPending && <button className="btn">Login</button>}
			{isPending && (
				<button className="btn" disabled>
					Loading
				</button>
			)}
			{message && <p>{message}</p>}
			{error && <p>{error}</p>}
			<p>
				Already have an account?
				<Link to={"/Signup"}> Signup</Link>
			</p>
		</form>
	);
}
