export default function ImageResult({ imageResult, user, data }) {
	
	

	return (
		<div className="image-results">
			<div className="title">
				<h4>Image Results</h4>
			</div>
			{imageResult && <div className="output-placeholder">{data.sampleOutputText}</div>}
			{!imageResult && <p>Loading...</p> }
		</div>
	);
}
