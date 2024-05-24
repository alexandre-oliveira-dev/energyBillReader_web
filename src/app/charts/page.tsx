"use client";
import MainSectionComponent from "../components/mainSectionComponent/main-section-component";
import "./style.css";
import {
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  ChartOptions,
  BarElement,
  Chart,
} from "chart.js";
import {Line, Bar} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {getInvoicesByClientNumber} from "@/service/api";
import {useAuth} from "@/service/useAuth";
import {Card, Col, Input, Row, Typography} from "antd";
import {useDebounce} from "../hooks/useDebounced";
import Footer from "../components/footer/footer.compoent";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement
);

export default function Graphics() {
  const {user} = useAuth();

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
      const res = await getInvoicesByClientNumber(user.uid);
      setData(res?.data);
      return res;
    }
    get();
  }, [clientNumber, user]);

  const debouncedChangeHandler = useDebounce((newValue: string) => {
    setClientNumber(newValue);
  }, 2000);

  const xLabels = data?.map(
    item => `${item.monthReference} ${item.clientNumber}`
  );
  const cee = data?.map(item => Number(item.eeQtd) + Number(item.esQtd));
  const ec = data?.map(item => Number(item.ecQtd));
  const ecValue = data?.map(item => parseFloat(item.ecValue || 0));
  const total = data?.map(item => parseFloat(item.total?.replace(/\s+/g, "")));
  const values2 = data?.map(item => parseFloat(item.eeValue));

  const options: ChartOptions = {
    responsive: true,
    color: "red",
    backgroundColor: "#1677FF",
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
        label: "Consumo de Energia Elétrica (kWh)",
        data: cee,
        fill: false,
        borderColor: "ocean",
        tension: 0.1,
      },
      {
        label: "Energia Compensada (kWh)",
        data: ec,
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };
  const chartData2 = {
    labels: xLabels,
    datasets: [
      {
        label: "valor / kwh R$",
        data: values2,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
      {
        label: "Total R$",
        data: total,
        fill: false,
        borderColor: "#008000",
        tension: 0.1,
      },
      {
        label: "Economia GD R$",
        data: ecValue,
        fill: false,
        borderColor: "yellow",
        tension: 0.1,
      },
    ],
  };

  const Summary = () => {
    return (
      <Row style={{gap: 10, alignContent: "center"}}>
        <Row style={{gap: 5, alignItems: "center"}}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "green",
            }}
          ></div>
          <div>Total com impostos</div>
        </Row>
        <Row style={{gap: 5, alignItems: "center"}}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#4BC0C0",
            }}
          ></div>
          Total / kwh
        </Row>
        <Row style={{gap: 5, alignItems: "center"}}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "yellow",
            }}
          ></div>
          Economia GD
        </Row>
      </Row>
    );
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
                backgroundColor: "#f1f1f1",
                padding: "2rem",
                overflowY: "auto",
                position: "relative",
              }}
            >
              <Typography.Title level={1}>
                Dashboard de faturas
              </Typography.Title>
              <div
                style={{
                  margin: "2rem 0 1rem 0 2rem",
                  backgroundColor: "#fff",
                  width: "100%",
                  padding: "2rem",
                }}
              >
                <Typography.Title style={{color: "#5d5d5d"}} level={3}>
                  Digite o número do cliente para visualizar os graficos
                </Typography.Title>

                <Input
                  style={{height: 40}}
                  required
                  value={clientNumber}
                  placeholder="Digite o numero do cliente"
                  onChange={e => {
                    const newValue = e.target.value;

                    setClientNumber(e.target.value);
                    debouncedChangeHandler(newValue);
                  }}
                ></Input>
              </div>
              <br />
              <br />
              <Row style={{gap: "2rem", width: "100%", marginBottom: "1rem"}}>
                <Card
                  title={
                    <Col>
                      <h2>Energia elétrica (kWh)</h2>
                      <Typography.Paragraph style={{color: "#5d5d5d"}}>
                        Quantidade de KWh utilizados
                      </Typography.Paragraph>
                    </Col>
                  }
                  style={{padding: "2rem", flex: 1}}
                >
                  <Bar data={chartData || []} options={options as any}></Bar>
                </Card>
                <Card
                  title={
                    <Col>
                      <h2>Valores das faturas R$</h2>
                      <Typography.Paragraph style={{color: "#5d5d5d"}}>
                        Valores referentes a quantidade de KWh utilizados
                      </Typography.Paragraph>
                      <Summary></Summary>
                    </Col>
                  }
                  style={{padding: "2rem", flex: 1}}
                >
                  <Line data={chartData2 || []} options={options as any}></Line>
                </Card>
              </Row>
              <Footer></Footer>
            </div>
          </>
        }
      ></MainSectionComponent>
    </>
  );
}
