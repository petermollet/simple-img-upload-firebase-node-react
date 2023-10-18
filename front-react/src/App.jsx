import {useState} from "react";

import FormUploadImage from "./components/FormUploadImage.jsx";

const App = () => {
    const [imagePreview, setImagePreview] = useState(null)
    const [result, setResult] = useState(null)

    return (
        <div className="h-full flex flex-col pt-44 items-center">
            <div>
                <h1 className="text-4xl font-bold">UPLOAD YOUR IMAGE</h1>
                <p className="text-gray-500 italic">File should be Jpeg or Png, and not exceed 5Mb</p>
                <div className="mt-10">
                    <FormUploadImage setImagePreview={setImagePreview} setResult={setResult}/>
                </div>
            </div>
            {imagePreview && (
                <div className="mt-10">
                    <p className="text-2xl font-bold">PREVIEW</p>
                    <img className="mt-10 h-52 w-full object-contain"
                         src={imagePreview}
                         alt="preview"
                    />
                </div>
            )}
            {result && (
                <div className="mt-10">
                    <a
                        href={result}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-500 hover:text-blue-600 font-bold"
                    >
                        LINK
                    </a>
                </div>
            )}
        </div>
    )
}

export default App
