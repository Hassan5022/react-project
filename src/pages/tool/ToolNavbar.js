// logo image
import logo from "../../assets/AI.svg";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ToolNavbar({ searchCheck }) {
	const { user } = useAuthContext();

	if (localStorage.getItem('name')) {
		var name = localStorage.getItem('name').toUpperCase().split(' ')
		var avatar = `${name[0].charAt(0)}${name[name.length - 1].charAt(0)}`
		console.log(avatar)
	}

	console.log(user);

	return (
		<nav className="nav">
			<img src={logo} alt="logo" />
			{searchCheck && (
				<input type="text" placeholder="Search AI Writing Tools" />
			)}
			{user && <div className="profile">{avatar}</div>}
		</nav>
	);
}
