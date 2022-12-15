// hooks
import { createContext, useEffect, useReducer } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null, loaded:null };
		case "LOADED":
			return { ...state, loaded: action.payload };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	// const navigate = useNavigate()
	const { apiData, error, message, isPending } = useAuth(
		"https://auth-system-production.up.railway.app/v1/api/user/profile"
	);

	useEffect(() => {
		if (apiData) {
			if (!apiData.success) {
				localStorage.removeItem("accessToken");
				dispatch(
					{ type: "LOGOUT" }
				);
			}
			if (apiData.success) {
				dispatch({ type: "LOGIN", payload: apiData.success });
				localStorage.setItem('name', apiData.data.name)
			}
		}
	}, [apiData]);

	console.log(apiData);

	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		loaded: null
	});

	return (
		<AuthContext.Provider value={{ ...state, dispatch, apiData }}>
			{children}
		</AuthContext.Provider>
	);
};
