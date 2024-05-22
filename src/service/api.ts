import {UploadFile} from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  // baseURL: "http://localhost:5000",
});

export async function upload(file: UploadFile) {
  if (file.originFileObj) {
    try {
      const form = new FormData();
      form.append("file", file.originFileObj);
      const res = await api.post(`/upload/${"1"}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export async function getFiles() {
  try {
    const res = await api.get(`/files/${"1"}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function getUser(userEmail: string) {
  try {
    const res = await api.get(`/user/${userEmail}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function createUser(body: any) {
  try {
    const res = await api.post(`/createUser`, body);
    return res;
  } catch (err) {
    console.log(err);
  }
}
