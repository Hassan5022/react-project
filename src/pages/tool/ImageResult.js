import { useAuthContext } from "../../hooks/useAuthContext";
import Result from "./Result";
import loading from '../../assets/loading.png'

export default function ImageResult({ user,showLoadingImage, setShowLoadingImage, showPlaceholder, data, images }) {

	const { loaded } = useAuthContext();
	
	return (
		<div className="image-results">
			<div className="title">
				<h4>Image Results</h4>
			</div>
			{images && <Result images={images} />}
			{showPlaceholder && <div className="output-placeholder">{data.sampleOutputText}</div>}
			{showLoadingImage && <div className="loading-image"> <img src={loading} alt="loading" /></div>}
			{loaded && <div className="loader-div"><div className="loader"></div></div>}
			{images && !loaded && <div className="bottom">
				<h4>Did this image match your discription?</h4>
			</div>}
		</div>
	);
}
