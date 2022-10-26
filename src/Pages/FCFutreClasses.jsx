import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import FCClassCard from "../FuncionlComps/FCClassCard";
import "../StyleSheets/Modal.css";
import { useState } from "react";
import FCModalAreYouSure from "../FuncionlComps/FCModalAreYouSure";
import FCModalConfirm from "../FuncionlComps/FCModalConfirm";
import LogoComponent from "../Elements/LogoComponent";
import ReturnPageButton from "../Elements/ReturnPageButton";

export default function FCFutreClasses() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [futreClass, setFutreClass] = useState(state.FutreClass);
  const superDetails = {
    Email: state.superEmail,
    Password: state.superPassword,
  };
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [classDetails, setClassDetails] = useState();
  const [confirmModal, setConfirmModal] = useState(false);

  const deleteClassByClassCode = (ClassCode) => {
    //console.log(ClassCode);
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/Class/DeleteClassByClassCode/${ClassCode}`;
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.ok", res.ok);
        if (res.ok) {
          setAreYouSureModal(false);
          setConfirmModal(true);
        }
        return res.json();
      })
      .then(
        (result) => {
          //console.log("FETCH PostRequest= ", result);
          let newFutreClass = futreClass.filter(
            (c) => c.ClassCode !== ClassCode
          );
          setFutreClass(newFutreClass);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  };

  const HideModalAreYouSure = () => {
    setAreYouSureModal(false);
  };

  const ShowModaAreYouSure = (ClassDetails2Remove) => {
    setAreYouSureModal(true);
    let classToRemove = {
      classCode: ClassDetails2Remove.ClassCode,
      classDate: ClassDetails2Remove.ClassDate,
      classEndTime: ClassDetails2Remove.EndTime,
      className: ClassDetails2Remove.ClassName,
      classParticipants: ClassDetails2Remove.NumOfParticipants,
      classStartTime: ClassDetails2Remove.StartTime,
    };
    //console.log(classToRemove);
    setClassDetails(classToRemove);
  };

  const BackToHomePage = () => {
    navigate("/SuperHomePage", { state: superDetails });
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <LogoComponent />
      <ReturnPageButton GoTo={() => navigate("/superHomePage", { state: superDetails })} />
      {classDetails !== undefined ? (
        <>
          <FCModalAreYouSure
            isOpen={areYouSureModal}
            modalHide={HideModalAreYouSure}
            btnFunc={deleteClassByClassCode}
            parameter={classDetails.classCode}
            text="?האם אתה בטוח שברצונך למחוק שיעור זה"
          />
          <FCModalConfirm
            modalOpen={confirmModal}
            BackToHomePage={BackToHomePage}
            ClassDetailsForModal={classDetails}
            text="!השיעור נמחק בהצלחה"
          />
        </>
      ) : (
        ""
      )}
      <h2>:שיעורים עתידיים שלי</h2>
      {futreClass.length !== 0 ? (
        <>
          <div style={{ width: "100%", height: 660, overflow: "auto" }}>
            {futreClass.map((c) => (

              <FCClassCard
                key={c.ClassCode}
                classToCard={c}
                studentDetails={superDetails}
                type="Futre"
                ShowModaAreYouSure={ShowModaAreYouSure}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{textAlign: "center"}}>
            <h5>לא קיימים שיעורים עתידיים</h5>
            <p>להוספת שיעור עתידי חזור לדף הבית ליצירת שיעור חדש</p>
            <br />
          </div>
        </>
      )}{" "}
    </Container>
  );
}
