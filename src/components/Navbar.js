// styles
import "./Navbar.css";

// logo image
import logo from '../../src/assets/AI.svg'

// component
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {

	const { user, dispatch } = useAuthContext()
	
	const logoutHandle = (e) => {
		e.preventDefault()
		dispatch({ type: "LOGOUT" })
		localStorage.removeItem("accessToken")
	}

	return (
		<nav className="navbar">
            <ul>
				<li>
					<img
						src={logo}
						alt="logo"
					/>
				</li>
				<li className="title">
					<Link id="tool-link" to={'/tool'}>Tools</Link>
				</li>
				{!user && <li className="login-logout">
					<Link to="/signup">SIGNUP</Link>
				</li>}
				{!user && <li className="login-logout">
					<Link to="/login">LOGIN</Link>
				</li>}
				{user && <li className="login-logout">
					<Link onClick={logoutHandle} to="/">LOGOUT</Link>
				</li>}
			</ul>
		</nav>
	);
}
