import {Form, Formik} from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import UploadService from "../services/uploadService.js";

const FormUploadImage = ({ setImagePreview, setResult }) => {
    const validationSchema = Yup.object().shape({
        file: Yup.mixed().required("A file is required")
            .test("fileSize", "File too large", (value) => {
                return value && value.size <= 5000000;
            })
            .test("fileType", "Unsupported File Format", (value) => {
                return value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
            })
    });

    const handleOnSubmit = async (values, { resetForm }) => {
        const response = await UploadService.avatar(values.file)
        resetForm();
        setImagePreview(null);
        setResult(response.data.url);
    }

    return (
        <Formik
            initialValues={{file: ''}}
            onSubmit={handleOnSubmit}
            validationSchema={validationSchema}
        >
            {({ setFieldValue, errors, setFieldError }) => {
                return (
                    <Form>
                        <div className="relative">
                            <div className="overflow-hidden relative w-full mt-4 mb-4 cursor-pointer">
                                <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full inline-flex items-center">
                                    <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                                    </svg>
                                    <span className="ml-2 w-full cursor-pointer">Upload Document</span>
                                    <input
                                        className="cursor-pointer file:cursor-pointer absolute block opacity-0"
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                        onChange={async (event) => {
                                            const file = event.currentTarget.files[0];
                                            if(!file) return;
                                            try {
                                                await validationSchema.validate({file});
                                            } catch (error) {
                                                setFieldError("file", error.message);
                                                return;
                                            }
                                            await setFieldValue("file", file);
                                            if (file) setImagePreview(URL.createObjectURL(file))
                                        }}
                                    />
                                </button>
                            </div>
                            {errors.file && (
                                <small className="absolute right-3 -bottom-5 text-red-500 text-xs italic">
                                    {errors.file}
                                </small>
                            )}
                        </div>
                        <div className="flex justify-end mt-10">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default FormUploadImage

FormUploadImage.propTypes = {
    setImagePreview: PropTypes.func.isRequired,
    setResult: PropTypes.func.isRequired
}