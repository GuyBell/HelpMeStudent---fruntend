import React, { useState, useEffect } from "react";
import FCClassCard from "../FuncionlComps/FCClassCard";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FCModalConfirm from "../FuncionlComps/FCModalConfirm";
import LogoComponent from "../Elements/LogoComponent";
import FCBottomNavigation from "../FuncionlComps/FCBottomNavigation";
import ReturnPageButton from "../Elements/ReturnPageButton";

export default function FCShowSuperFutureClasses() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const userDetails = state.StudentDetails;

  const [classDetails, setClassDetails] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setClasses(state.FutreClasses);
    //console.log(classes);
  }, [state.FutreClasses, classes]);

  const register = (classCode, RegistrationPoint) => {
    //console.log(classCode);
    const requestToRegister = {
      StudentId: userDetails.StudentId, //state.StudentId
      ClassCode: classCode,
    };
    //console.log(requestToRegister);
    const classToModal = classes.find((c) => c.ClassCode === classCode);
    let classToConfirmModal = {
      classCode: classToModal.ClassCode,
      classDate: classToModal.ClassDate,
      classEndTime: classToModal.EndTime,
      className: classToModal.ClassName,
      classParticipants: classToModal.NumOfParticipants,
      classStartTime: classToModal.StartTime,
    };
    setClassDetails(classToConfirmModal);

    const url = "https://proj.ruppin.ac.il/bgroup92/prod/Student/PostStudentToClass";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestToRegister),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.ok", res.ok);
        if (res.ok) {
          setConfirmModal(true);
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
    navigate("/studentHomePage", { state: userDetails });
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center flex-column text-center">
      <LogoComponent />
      <ReturnPageButton
        GoTo={() => navigate("/searchClassesPage", { state: userDetails })}
      />
      {classDetails !== undefined ? (
        <FCModalConfirm
          modalOpen={confirmModal}
          BackToHomePage={BackToHomePage}
          ClassDetailsForModal={classDetails}
          text="!הרשמה בוצעה בהצלחה"
        />
      ) : (
        ""
      )}
      <div>
        {classes.length !== 0 ? (
          <div style={{ width: "100%", height: "78vh", overflow: "auto" }}>
            {classes.map((c) => (
              <FCClassCard
                key={c.ClassCode}
                classToCard={c}
                type="SearchClass"
                btnFunction={register}
                RegistrationPoint="classes"
                studentDetails={userDetails}
              />
            ))}
          </div>
        ) : (
          <>
            <h5>לסופר סטודנט זה לא קיימים שיעורים עתידיים</h5>
            <br />
          </>
        )}
      </div>
      {userDetails === undefined ? (
        ""
      ) : (
        <FCBottomNavigation UserDetails={userDetails} />
      )}
    </Container>
  );
}
