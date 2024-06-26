import {UploadFile} from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  // baseURL: "http://localhost:5000",
});

export async function upload(file: UploadFile, userId: string) {
  if (file.originFileObj) {
    try {
      const form = new FormData();
      form.append("file", file.originFileObj);
      const res = await api.post(`/upload/${userId}`, form, {
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

export async function getFiles(userId: string) {
  try {
    const res = await api.get(`/files/${userId}`);
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
export async function getInvoices(userId: string) {
  try {
    const res = await api.get(`/invoices/${userId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function getInvoicesByClientNumber(
  userId: string,
  clientNumber?: string
) {
  try {
    const res = await api.get(
      `/invoicesbycnumber/${userId}${
        clientNumber ? `?clientNumber=${clientNumber}` : ""
      } `
    );
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
export async function deleteFile(fileId: string) {
  try {
    const res = await api.delete(`/delete/${fileId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteInvoice(invoiceId: string) {
  try {
    const res = await api.delete(`/deleteinvoice/${invoiceId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}
