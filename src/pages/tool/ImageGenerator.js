import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoginComponent from "../login/LoginComponent";
import ImageGeneratorComponent from "./ImageGeneratorComponent";
import ImageResult from "./ImageResult";
import ToolNavbar from "./ToolNavbar";

export default function ImageGenerator({ data }) {
    
    const [imageResult, setImageResult] = useState(true)
    const [toggleLogin, setToggleLogin] = useState(false)
    const { user} = useAuthContext()

    return (
        <div className="image-generator">
            <ToolNavbar/>
            <div className="tool-body image-generator-body">
                <ImageGeneratorComponent user={user} setToggleLogin={setToggleLogin} setImageResult={setImageResult} data={data} />
                {imageResult && <ImageResult user={user} data={data} />}
                {toggleLogin && <LoginComponent/>}
			</div>
        </div>
  )
}
