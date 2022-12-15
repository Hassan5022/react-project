import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Result({images }) {
  
  const [show, setShow] = useState(false);
  const {dispatch} = useAuthContext()

  const handleLoad = () => {
    dispatch({type: "LOADED", payload: false})
	  }

	useEffect(() => {
    if (images.success) {
			setShow(true);
		}
  }, [images, setShow]);

	return (
    <div className="ai-results">
			{show &&
				images.data.map((image) => (
					<div key={image.url}  className="ai-image">
            <img
              src={image.url}
              onLoad={handleLoad}
              alt="ai"
            />
					</div>
        ))}
		</div>
	);
}
