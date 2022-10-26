import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import "../StyleSheets/Modal.css";
import FCModalUpdateSuperProfile from "../FuncionlComps/FCModalUpdateSuperProfile";
import LogoComponent from "../Elements/LogoComponent";
import ReturnPageButton from "../Elements/ReturnPageButton";

function FCUpdateProfileSuper() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const StudyYear = state.StudyYear;
  const DepartmentName = state.DepartmentName;
  const superEmail = state.superEmail;
  const superPassword = state.superPassword;
  const [description, setDescription] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const UpdateSuperDescription = () => {
    const SuperDetails = {
      Email: superEmail,
      Descreption: description,
    };
    const Url =
      "https://proj.ruppin.ac.il/bgroup92/prod/SuperStudent/UpdateSuperStudentProfileDescription";

    fetch(Url, {
      method: "PUT",
      body: JSON.stringify(SuperDetails),
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
          setModalOpen(true);
        }
        return res.json();
      })
      .then(
        (result) => {
          //console.log(result);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  };
  const BackToHomePage = () => {
    const UserDetails = {
      Email: superEmail,
      Password: superPassword,
    };
    navigate("/SuperHomePage", { state: UserDetails });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-column">
      <LogoComponent />
      <div className="w-100" style={{ maxWidth: "700px" }}>
        <Card style={{ borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
          <Card.Body align="center">
            <ReturnPageButton GoTo={BackToHomePage} />
            <h2 className="text-center mb-4"> עריכת פרופיל</h2>
            <Form>
              <Form.Group className="mb-1">
                <Form.Label>:שנת לימוד</Form.Label>
                <Form.Control type="text" placeholder={StudyYear} readOnly />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>:מסלול לימודים</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={DepartmentName}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>תיאור קצר עלי</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder={"רקע קצר כדי שהסטודנטים יכירו אותך"}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Button
              onClick={UpdateSuperDescription}
              // className='btnBackToHome'
              variant="success"
            >
              סיום עריכה
            </Button>
          </Card.Body>
        </Card>{" "}
      </div>
      <FCModalUpdateSuperProfile
        BackToHomePage={BackToHomePage}
        Description={description}
        modalOpen={modalOpen}
      />
    </Container>
  );
}

export default FCUpdateProfileSuper;
