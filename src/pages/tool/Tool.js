import "./Tool.css";
import ToolList from "./ToolList";
import ToolNavbar from "./ToolNavbar";

export default function Tool() {

	return (
		<div className="tool">
			<ToolNavbar searchCheck={true}/>
			<div className="tool-body">
				<h2 className="heading">AI Writing Tools</h2>
				<ToolList />
			</div>
		</div>
	);
}
