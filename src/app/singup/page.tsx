"use client";

import {Button, Col, Input, Typography, notification} from "antd";
import "../page.css";
import Link from "next/link";
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/service/useAuth";
import {createUser} from "@/service/api";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");

  async function login() {
    await createUserWithEmailAndPassword(auth, email, passWord)
      .then(async user => {
        await createUser({
          id: user.user.uid,
          email,
        }).then(() => {
          notification.success({
            message: "Usuário criado com sucesso",
            onClose() {
              window.location.href = "/";
            },
          });
        });
      })  
      .catch(err => console.log(err));
  }

  return (
    <div className="container-login">
      <div
        style={{
          width: "700px",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          borderRadius: "10px",
          gap: "15px",
          padding: "3rem",
        }}
      >
        <Typography.Title>Criar usuário</Typography.Title>

        <Col style={{width: "70%"}}>
          <label style={{fontSize: "20px"}}>Email</label>
          <Input
            onChange={e => setEmail(e.target.value)}
            style={{width: "100%", height: "40px"}}
            placeholder="Digite seu email:"
            type="email"
          ></Input>
        </Col>
        <Col style={{width: "70%"}}>
          <label style={{fontSize: "20px"}}>Senha</label>
          <Input
            type="password"
            onChange={e => setPassword(e.target.value)}
            style={{width: "100%", height: "40px"}}
            placeholder="Digite sua senha:"
          ></Input>
        </Col>
        <Col style={{width: "100%", display: "flex", justifyContent: "center"}}>
          <Button
            onClick={login}
            style={{fontSize: 20, width: "150px", height: "40px"}}
          >
            Entrar
          </Button>
        </Col>
        <Link href={"/"}>Fazer Login</Link>
      </div>
    </div>
  );
}
