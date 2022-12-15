import { useAuthContext } from "../../hooks/useAuthContext";
import Result from "./Result";

export default function ImageResult({ user, data, images }) {

	const {loaded} = useAuthContext()
	
	return (
		<div className="image-results">
			<div className="title">
				<h4>Image Results</h4>
			</div>
			{images && <Result images={images} />}
			{!images && <div className="output-placeholder">{data.sampleOutputText}</div>}
			{loaded && <div className="loader-div"><div className="loader"></div></div>}
			{images && !loaded && <div className="bottom">
				<h4>Did this image match your discription?</h4>
			</div>}
		</div>
	);
}
