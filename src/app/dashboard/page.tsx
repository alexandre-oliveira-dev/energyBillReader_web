/* eslint-disable react/no-children-prop */
"use client";

import Dragger from "antd/es/upload/Dragger";
import MainSectionComponent from "../components/mainSectionComponent/main-section-component";
import "./style.css";
import {Button, Row, UploadFile, UploadProps, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {upload} from "@/service/api";

export default function Dashboard() {
  const [file, setFile] = useState<any>(null);

  async function get() {
    if (file) {
      await upload(file).then(() => {
        setFile(null);
        message.success("Upload realizado com sucesso!");
      });
    }
  }

  const props: UploadProps = {
    name: "file",
    multiple: false,
    listType: "picture",
    onChange(info) {
      const {status} = info.file;
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
              <Row>
                <Dragger  {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Clique ou arraste sua fatura em pdf para fazer upload
                  </p>
                </Dragger>
                <Button onClick={() => get()} type="primary">
                  Salvar
                </Button>
              </Row>
            </div>
          </>
        }
      ></MainSectionComponent>
    </>
  );
}
