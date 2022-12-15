// logo image
import logo from "../../assets/AI.svg";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ToolNavbar({ searchCheck }) {

	const {user} = useAuthContext()

	return (
		<nav className="navbar">
			<img src={logo} alt="logo" />
            {searchCheck && <input type="text" placeholder="Search AI Writing Tools" />}
			{user && <div className="profile">{/* <img alt="profile" /> */}</div>}
		</nav>
	);
}
