import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function ImageGeneratorComponent({user, setToggleLogin, setImageResult, data }) {

    const [prompt, setPrompt] = useState('')
    const [size, setSize] = useState('')
	const [n, setN] = useState('')
	const [customMessage, setCustomMessage] = useState(null)
	
	const { apiData, message, error, isPending, postData } = useFetch("https://auth-system-production.up.railway.app/v1/api/openai/image-generator", "POST", true);

    const handleSubmit = ((e) => {
		e.preventDefault()
		if (parseInt(n) === 1 || parseInt(n) === 2 || parseInt(n) === 3) {
			if (user) {
				postData({ prompt, n: parseInt(n), size });
				setCustomMessage('')
				clearHandle(e)
			} else {
				setCustomMessage('You are not signed in!')
				setImageResult(false)
				setToggleLogin(true)
			}
		} else {
			setCustomMessage("number should be in range of 1 to 3")
		}
	})

	useEffect(() => {
		if (error === "User does not exist") {
			setCustomMessage(error)
			setImageResult(false)
			setToggleLogin(true)
		}
		if (error === "Invalid token") {
			setCustomMessage(error)
			setImageResult(false)
			setToggleLogin(true)
		}
	}, [error])

    const clearHandle = (e) => {
        e.preventDefault()
        setPrompt('')
        setSize('')
        setN('')
    }

	return (
		<div className="image-form-container">
			<div className="title">
                <h4>{data.name}</h4>
                <Link className="btn" to={'/tool'}>More AI Tools</Link>
			</div>
			<form onSubmit={handleSubmit} className="image-generator-form">
				{data.textInputs.map(
					(val) =>
						(val.type === "textarea" && (
							<label htmlFor={val.key} key={val.key}>
								<span>{val.name}</span>
                                <textarea required maxLength={val.maxLimit} minLength={val.minLimit} name={val.name} placeholder={val.placeholder} onChange={(e) => setPrompt(e.target.value)}
                                    value={prompt} />
							</label>
						)) ||
						(val.type === "option" && (
							<label key={val.key} htmlFor={val.key}>
								<span>{val.name}</span>
								<select name={val.name} onChange={(e) => setSize(e.target.value)} required placeholder={val.placeholder}>
									{val.options.map((opt) => (
										<option key={opt} value={opt}>
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
                                    required
									type={val.type}
									placeholder={val.placeholder}
                                    name={val.name}
                                    onChange={(e) => setN(e.target.value)}
                                    value={n}
								/>
							</label>
						))
						)}
				{customMessage && <p>{customMessage}</p>}
				<div className="tool-bottom">
                    <button onClick={clearHandle} className="clear btn">Clear Input</button>
					{!isPending && <button className="btn">Create</button>}
					{isPending && <button disabled className="btn">Loading...</button>}
                </div>
			</form>
		</div>
	);
}
