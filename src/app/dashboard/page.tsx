/* eslint-disable react/no-children-prop */
"use client";

import Dragger from "antd/es/upload/Dragger";
import MainSectionComponent from "../components/mainSectionComponent/main-section-component";
import "./style.css";
import {Button, UploadFile, UploadProps, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

export default function Dashboard() {
  const [file, setFile] = useState<UploadFile>();
  useEffect(() => {});

  async function get() {
    if (file) {
      console.log(file);
    }
  }

  const props: UploadProps = {
    name: "file",
    multiple: false,
    listType: "picture",
    onChange(info) {
      const {status} = info.file;
      console.log("🚀 ~ onChange ~ status:", status);
      if (status !== "uploading") {
        setFile(info.file);
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} upload realizado com sucesso!.`);
      } else if (status === "error") {
        message.error(`${info.file.name} erro ao fazer updload.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <MainSectionComponent
        component={
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "grid",
                placeContent: "center",
              }}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste sua fatura em pdf para fazer upload
                </p>
              </Dragger>
              <br />
              <Button onClick={() => get()} type="primary">
                Salvar
              </Button>
            </div>
          </>
        }
      ></MainSectionComponent>
    </>
  );
}
