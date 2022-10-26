import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import FCClassCard from "../FuncionlComps/FCClassCard";
import "../StyleSheets/Modal.css";
import LogoComponent from "../Elements/LogoComponent";
import ReturnPageButton from "../Elements/ReturnPageButton";

export default function FCHistoryClassSuper() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const HistoryClass = state.HistoryClass;
  const superDetails = {
    Email: state.superEmail,
    Password: state.superPassword,
  };
  return (
    <Container className="d-flex align-items-center justify-content-center flex-column">
      <ReturnPageButton GoTo={() => navigate("/superHomePage", { state: superDetails })} />
      <LogoComponent />
      <h3>:היסטורית שיעורים</h3>
      {HistoryClass.length !== 0 ? (
        <>
          <div style={{ width: "100%", height: 660, overflow: "auto" }}>
            {HistoryClass.map((c) => (
              <FCClassCard key={c.ClassCode} classToCard={c} type="history" />
            ))}
          </div>
        </>
      ) : (
        "לא נמצאו שיעורים מתאימים"
      )}{" "}
      <br />
    </Container>
  );
}
