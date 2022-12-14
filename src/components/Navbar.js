// styles
import "./Navbar.css";

// logo image
import logo from '../../src/assets/AI.svg'

// component
import { Link } from "react-router-dom";

export default function Navbar() {
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
				<li className="login-logout">
					<Link to="/signup">SIGNUP</Link>
				</li>
				<li className="login-logout">
					<Link to="/login">LOGIN</Link>
				</li>
			</ul>
		</nav>
	);
}
