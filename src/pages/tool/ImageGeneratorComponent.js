import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ImageGeneratorComponent({
	user,
	setImageError,
	setToggleLogin,
	setImages,
	setImageResult,
	data,
}) {
	const [prompt, setPrompt] = useState("");
	const [size, setSize] = useState("");
	const [n, setN] = useState("");
	const { dispatch } = useAuthContext();
	const [customMessage, setCustomMessage] = useState(null);
	const [showImage, setShowImage] = useState(null);

	const { apiData, message, error, isPending, postData } = useFetch(
		"https://auth-system-production.up.railway.app/v1/api/openai/image-generator",
		"POST",
		true
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (parseInt(n) === 1 || parseInt(n) === 2 || parseInt(n) === 3) {
			if (user) {
				postData({ prompt, n: parseInt(n), size });
				dispatch({type: "LOADED", payload: true})
				setShowImage(true);
				setToggleLogin(false);
				setCustomMessage("");
			} else {
				setCustomMessage("You are not signed in!");
				setImageResult(false);
				setToggleLogin(true);
				setShowImage(false);
			}
		} else {
			setCustomMessage("number should be in range of 1 to 3");
			setToggleLogin(false);
			setImageResult(true);
			setShowImage(false);
		}
	};

	useEffect(() => {
		if (showImage) {
			setImages(apiData);
		}
	}, [apiData, showImage]);

	useEffect(() => {
		if (
			error === "User does not exist" ||
			error === "Invalid token" ||
			error === "Token expired"
		) {
			setImageResult(false);
			setToggleLogin(true);
			setShowImage(false);
			localStorage.removeItem("accessToken");
			dispatch({ type: "LOGOUT" });
		}
	}, [error, setImageResult, setToggleLogin, dispatch]);

	const clearHandle = (e) => {
		e.preventDefault();
		setPrompt("");
		setSize("");
		setN("");
	};

	// set default value
	useEffect(() => {
		data.textInputs.map((val) => {
		if (val.type === "textarea") setPrompt(val.placeholder)
		if (val.type === "option") setSize(val.placeholder)
		if (val.type === "text") setN(val.placeholder)
	});
	}, [])

	return (
		<div className="image-form-container">
			<div className="title">
				<h4>{data.name}</h4>
				<Link className="btn" to={"/tool"}>
					More AI Tools
				</Link>
			</div>
			<form onSubmit={handleSubmit} className="image-generator-form">
				{data.textInputs.map(
					(val) =>
						(val.type === "textarea" && (
							<label htmlFor={val.key} key={val.key}>
								<span>{val.name}</span>
								<textarea
									maxLength={val.maxLimit}
									minLength={val.minLimit}
									name={val.name}
									onChange={(e) => setPrompt(e.target.value)}
									value={prompt}
								/>
							</label>
						)) ||
						(val.type === "option" && (
							<label key={val.key} htmlFor={val.key}>
								<span>{val.name}</span>
								<select
									name={val.name}
									onChange={(e) => setSize(e.target.value)}
								>
									{val.options.map((opt) => (
										<option key={opt} value={size}>
											{opt}
										</option>
									))}
								</select>
							</label>
						)) ||
						(val.type === "text" && (
							<label key={val.key} htmlFor={val.key}>
								<span>{val.name}</span>
								<input
									type={val.type}
									name={val.name}
									onChange={(e) => setN(e.target.value)}
									value={n}
								/>
							</label>
						))
				)}
				{customMessage && <p>{customMessage}</p>}
				<div className="tool-bottom">
					<button onClick={clearHandle} className="clear btn">
						Clear Input
					</button>
					{!isPending && <button className="btn">Create</button>}
					{isPending && (
						<button disabled className="btn">
							Loading...
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
