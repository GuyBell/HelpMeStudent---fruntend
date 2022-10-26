import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FCModalContact from "./FCModalContact";

export default function FCShowProfileSuperBtns({
  FutreClasses,
  StudentDetails,
  Phone,
  Email,
}) {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column mt-2 text-center">
      <Button onClick={() => setModalShow(true)}>יצירת קשר</Button>
      <FCModalContact show={modalShow} onHide={() => setModalShow(false)} phone={Phone} email={Email} style={{direction: "rtl"}}/>
      <Button
        className="m-1"
        onClick={() => {
          //console.log(FutreClasses);
          navigate("/showSuperFutureClasses", {
            state: {
              FutreClasses,
              StudentDetails,
            },
          });
        }}
        variant="primary"
      >
        צפייה בשיעורים שלי
      </Button>
    </div>
  );
}
