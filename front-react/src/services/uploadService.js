import axios from "axios";


class UploadService {
    async avatar(file){
        const url = "http://localhost:8080/api/upload/avatar";
        const formData = new FormData();
        formData.append("file", file);
        return await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }
}

export default new UploadService();