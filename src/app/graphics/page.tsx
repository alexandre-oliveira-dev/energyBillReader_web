"use client";
import {Chart, ChartOptions} from "chart.js";
import MainSectionComponent from "../components/mainSectionComponent/main-section-component";
import "./style.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {getInvoicesByClientNumber} from "@/service/api";
import {useAuth} from "@/service/useAuth";
import {Card, Input, Row, Typography} from "antd";
import { PriceFormater } from "../common/price-formater";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function Graphics() {
  const { user } = useAuth();
  const format = new PriceFormater();

  const [clientNumber, setClientNumber] = useState<string>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function get() {
      if (clientNumber) {
        const res = await getInvoicesByClientNumber(
          user.uid,
          String(clientNumber)
        );
        setData(res?.data);
        return res;
      }
    }
    get();
  }, [clientNumber, user]);

  const xLabels = data?.map(item => item.monthReference);
  const values = data?.map(item => item.eeQtd);
  const values2 = data?.map(item => parseFloat(item.eeValue));
  console.log("🚀 ~ Graphics ~ values2:", values2);

  const options: ChartOptions = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "(kWh)",
        data: values,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  const chartData2 = {
    labels: xLabels,
    datasets: [
      {
        label: "R$",
        data: values2,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  console.log("🚀 ~ Graphics ~ chartData2:", chartData2);

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
              <Typography.Title level={1}>
                Dashboard de faturas
              </Typography.Title>
              <div
                style={{margin: "2rem 0 1rem 0 2rem", maxWidth: "max-content"}}
              >
                <Typography.Title level={3}>
                  Digite o número do cliente para visualizar os
                  graficos
                </Typography.Title>

                <Input
                  style={{height: 40}}
                  required
                  placeholder="Digite o numero do cliente"
                  onChange={e => setClientNumber(e.target.value)}
                ></Input>
              </div>
              <br />
              <br />
              <Row style={{gap: "2rem"}}>
                <Card title="Energia elétrica (kWh)" style={{width: "700px"}}>
                  <Line data={chartData || []} options={options as any}></Line>
                </Card>
                <Card title="Valores das faturas R$" style={{width: "700px"}}>
                  <Line data={chartData2 || []} options={options as any}></Line>
                </Card>
              </Row>
            </div>
          </>
        }
      ></MainSectionComponent>
    </>
  );
}
