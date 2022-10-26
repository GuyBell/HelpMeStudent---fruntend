import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import LogoComponent from "../Elements/LogoComponent";
import ReturnPageButton from "../Elements/ReturnPageButton";
import FCModalForgetPassword from "../FuncionlComps/FCModalForgetPassword";

export default function FCChangePasswordPage() {
  const navigate = useNavigate()
  const [id, setId] = useState("")
  const [modalOpen, setModalOpen] = useState(false);
  const fetchNewPass = () => {
    const newPassUrl = "https://proj.ruppin.ac.il/bgroup92/prod/Student/NewPassword/"
    //console.log("start")
    fetch(newPassUrl + id, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res=", res);
        //console.log("res.status", res.status);
        //console.log("res.ok", res.ok);
        if (res.ok) {
          setModalOpen(true)
        }
        if (res.status === 404) {
          alert("התעודת זהות שהוזנה לא קיימת במערכת..")
        }
        return res.json();
      })
      .then(
        (result) => {
          //console.log("FETCH Post Email = ", result);
        },
        (error) => {
          //console.log("err post =", error);
        }
      );
    //console.log("end")
  }
  const BackToHomePage = () => {
    navigate("/")
  }
  return (
    <Container className="d-flex justify-content-start align-items-center flex-column ">
      <Card style={{ textAlign: "center", borderRadius: 25, marginTop: 140 }}>
        <div  >
          <LogoComponent />
        </ div>
        <ReturnPageButton GoTo={() => navigate("/")} />
        <Card.Body>
          <h3 className="text-center mb-4"> דף שינוי סיסמא</h3>
          <hr />
          <h6 style={{ direction: "rtl", textAlign: "center" }}>נא להזין את מספר תעודת הזהות איתו נרשמת למערכת. לאחר מכן תקבל/י מייל עם הסיסמא החדשה להתחברות.</h6>
          <Form>
            <Form.Group >
              <Form.Label style={{ display: "block", textAlign: "right", marginRight: 10 }}>
                :תעודת זהות
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                required
                onChange={(e) => setId(e.target.value)}
                style={{ borderRadius: 25 }}
              />
            </Form.Group>
            <Button
              className="w-100 text-center mt-2"
              variant="success"
              onClick={() => fetchNewPass()}
              style={{ borderRadius: 25 }}
            >
              שלחו אליי סיסמה חדשה
            </Button>
          </Form>
        </Card.Body>
        <FCModalForgetPassword BackToHomePage={BackToHomePage} modalOpen={modalOpen} />
      </Card>
    </Container>
  );
}