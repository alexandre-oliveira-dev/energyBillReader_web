"use client";

import {deleteFile, deleteInvoice, getFiles} from "@/service/api";
import {useEffect, useState} from "react";
import MainSectionComponent from "../components/mainSectionComponent/main-section-component";
import {Button, Card, Row, Typography, message} from "antd";
import {FaFilePdf} from "react-icons/fa";
import {FiDownload, FiTrash} from "react-icons/fi";
import "./style.css";
import {useAuth} from "@/service/useAuth";
import {PriceFormater} from "../common/price-formater";

export default function LibInvoices() {
  const [data, setData] = useState<any[]>([]);
  const {user} = useAuth();

  const format = new PriceFormater();
  useEffect(() => {
    async function get() {
      const res = await getFiles(user?.uid);
      setData(res?.data);
    }
    get();
  }, [user]);
  if (!user) {
    return null;
  }

  async function refetch() {
    const res = await getFiles(user?.uid);
    setData(res?.data);
  }

  async function deleteFileAndInvoice(item: any) {
    await Promise.all([
      await deleteFile(item.id),
      await deleteInvoice(item.invoiceId),
    ])
      .then(() => refetch())
      .catch(err => message.error("Ocorreu algum erro, tente novamente"));
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

                backgroundColor: "#f1f1f1",
                padding: "2rem",
              }}
            >
              <Typography.Title level={2}>
                Biblioteca de Faturas
              </Typography.Title>
              <Row style={{gap: 20}}>
                {!data.length && (
                  <Row>
                    <Typography.Title>
                      Nenhuma fatura disponível
                    </Typography.Title>
                  </Row>
                )}
                {data?.map(i => {
                  return (
                    <Card
                      key={i.id}
                      title={
                        <Row>
                          {i?.invoice?.monthRef} - {i?.invoice.clientNumber}
                        </Row>
                      }
                      style={{
                        minWidth: "250px",
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
                      <br />
                      <Typography.Title level={3}>
                        {format.formater({price: String(i.invoice.total)})}
                      </Typography.Title>

                      <Button onClick={() => deleteFileAndInvoice(i)}>
                        <FiTrash color="red"></FiTrash>
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
