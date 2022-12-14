// logo image
import logo from "../../assets/AI.svg";

export default function ToolNavbar({ searchCheck }) {
	return (
		<nav className="navbar">
			<img src={logo} alt="logo" />
            {searchCheck && <input type="text" placeholder="Search AI Writing Tools" />}
			<div className="profile">{/* <img alt="profile" /> */}</div>
		</nav>
	);
}
