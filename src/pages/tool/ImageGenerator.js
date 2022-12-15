import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoginComponent from "../login/LoginComponent";
import ImageGeneratorComponent from "./ImageGeneratorComponent";
import ImageResult from "./ImageResult";
import ToolNavbar from "./ToolNavbar";

export default function ImageGenerator({ data }) {
    
    const [imageResult, setImageResult] = useState(true)
    const [toggleLogin, setToggleLogin] = useState(false)
    const [images, setImages] = useState(null)
    const [responseError, setResponseError] = useState(null)

    const { user } = useAuthContext()

    return (
        <div className="image-generator">
            <ToolNavbar/>
            <div className="tool-body image-generator-body">
                <ImageGeneratorComponent user={user} setResponseError={setResponseError} setImages={setImages} setToggleLogin={setToggleLogin} setImageResult={setImageResult} data={data} />
                {imageResult && <ImageResult images={images} user={user} data={data} />}
                {toggleLogin && <div className="login-container">
                    <LoginComponent />
                </div>}
			</div>
        </div>
  )
}
