"use client";

import {getFiles} from "@/service/api";
import {useEffect, useState} from "react";
import MainSectionComponent from "../components/mainSectionComponent/main-section-component";
import {Button, Card, Row, Typography} from "antd";
import {FaFilePdf} from "react-icons/fa";
import {FiDownload} from "react-icons/fi";
import "./style.css";
import {useAuth} from "@/service/useAuth";

export default function LibInvoices() {
  const [data, setData] = useState<any[]>([]);
  const {user} = useAuth();
  useEffect(() => {
    async function get() {
      const res = await getFiles();
      console.log("🚀 ~ get ~ res:", res);
      setData(res?.data);
    }
    get();
  }, [user]);
  if (!user) {
    return null;
  }
  return (
    <>
      <MainSectionComponent
        component={
          <>
            <div
              style={{
                width: "100%",
                minHeight: "100%",
                display: "grid",
                placeContent: "center",
                backgroundColor: "#f1f1f1",
                padding: "2rem",
              }}
            >
              <Typography.Title level={2}>
                Biblioteca de Faturas
              </Typography.Title>
              <Row style={{gap: 20}}>
                {data?.map(i => {
                  return (
                    <Card
                      key={i.id}
                      title={i.fileName}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                      }}
                    >
                      <div>
                        <FaFilePdf color="red" size={50} />
                      </div>
                      <Button
                        style={{width: "100%"}}
                        onClick={async () => {
                          // await download(i.url);
                          const a = document.createElement("a");
                          a.href = i.url;
                          a.download = `file.pdf`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }}
                      >
                        <FiDownload size={20}></FiDownload>
                      </Button>
                    </Card>
                  );
                })}
              </Row>
            </div>
          </>
        }
      ></MainSectionComponent>
    </>
  );
}
