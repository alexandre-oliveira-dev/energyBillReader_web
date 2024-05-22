/* eslint-disable react/no-children-prop */
"use client";

import Dragger from "antd/es/upload/Dragger";
import MainSectionComponent from "../components/mainSectionComponent/main-section-component";
import "./style.css";
import {Button, Row, Typography, UploadProps, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import {useState} from "react";
import {upload} from "@/service/api";
import {useAuth} from "@/service/useAuth";

export default function Dashboard() {
  const [file, setFile] = useState<any>(null);
  const {user} = useAuth();

  if (!user) {
    return null;
  }

  async function uploadFile() {
    if (file) {
      await upload(file, user.uid).then(() => {
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
      if (info.file.type !== "application/pdf") {
        message.error("aquivos somente em pdf!");
        return Promise.reject();
      }
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
              <Typography.Title level={2}>
                Faça o updload da sua fatura
              </Typography.Title>
              <Row style={{gap: 20, alignItems: "center"}}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Clique ou arraste sua fatura em pdf para fazer upload
                  </p>
                </Dragger>
                <Button
                  style={{height: "50px"}}
                  onClick={() => {
                    if (!file) {
                      message.info("Selecione uma fatura!");
                      return;
                    }
                    uploadFile();
                  }}
                  type="primary"
                >
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
