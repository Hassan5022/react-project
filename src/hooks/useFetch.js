import { useEffect, useState } from "react";

export const useFetch = (url, method = "GET", token) => {
	const [apiData, setApiData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState(null);
	const [message, setMessage] = useState(null);

	const postData = (postData) => {
		if (!token) {
			setOptions({
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(postData),
			});
		}
		if (token) {
			setOptions({
				method: "POST",
				headers: {
					"content-type": "application/json",
					"authorization": `Bearer ${localStorage.getItem("accessToken")}`
				},
				body: JSON.stringify(postData),
			});
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async (fetchOptions) => {
			setIsPending(true);
			try {
				setError(null);
				const response = await fetch(url, {
					...fetchOptions,
					signal: controller.signal,
				});
				const responseData = await response.json();
				console.log(responseData);
				if (!responseData.success) {
					if (responseData.data) {
						if (responseData.data.name && responseData.data.password && responseData.data.email) {
							setMessage(
								`${responseData.data.name} ${responseData.data.password} ${responseData.data.email}`);
						} else if (responseData.data.name) {
							setMessage(responseData.data.name);
						} else if (responseData.data.password) {
							setMessage(responseData.data.password);
						} else if (responseData.data.email) {
							setMessage(responseData.data.email);
						}
					} else {
						setMessage(responseData.message)
					}
					throw new Error(responseData.message);
				}
				setMessage(responseData.message);
				setApiData(responseData);
				setIsPending(false);
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("The fetch was aborted");
				} else {
					setIsPending(false);
					setError(error.message);
				}
			}
		};
		if (method === "GET") fetchData();
		if (method === "POST" && options) fetchData(options);
		return () => controller.abort();
	}, [url, method, options]);

	return { apiData, isPending, error, message, postData };
};
