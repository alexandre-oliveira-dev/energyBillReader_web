import { UploadFile } from "antd";
import axios from "axios";


const api = axios.create({
    baseURL:'http://localhost:5000'
})


export async function upload(file: UploadFile){
    if (file.originFileObj) {
        try {
            const form = new FormData();
        form.append('file', file.originFileObj)
        const res = await api.post(`/file/${'1'}`, form, {
            headers: {
          'Content-Type': 'multipart/form-data',
        },
        })
        return res
        } catch (err) {
            console.log(err)
       }
    }
    
}
