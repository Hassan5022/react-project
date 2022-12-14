import { useEffect, useState } from "react";

export const useAuth = (url) => {
	const [apiData, setApiData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			setIsPending(true);
			try {
				setError(null);
				const response = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        "authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
				});
				const responseData = await response.json();
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
		fetchData();
		return () => controller.abort();
	}, [url]);

	return { apiData, isPending, error, message};
};
