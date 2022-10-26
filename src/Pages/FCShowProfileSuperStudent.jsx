import React from "react";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import FCShowProfileSuperBtns from "../FuncionlComps/FCShowProfileSuperBtns";
import LogoComponent from "../Elements/LogoComponent";
import ReturnPageButton from "../Elements/ReturnPageButton";

export default function FCShowProfileSuperStudent() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [superDetails, setSuperDetails] = useState();

  const superId = state.classToCard.SuperStudentId;
  const StudentDetails = {
    Email: state.studentDetails.Email,
    Password: state.studentDetails.Password,
    StudentId: state.studentDetails.StudentId,
  };

  useEffect(() => {
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/SuperStudent/ShowSuperDetailsById/${superId}`;
    //console.log(superId);
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (data) => {
          //console.log(data);
          setSuperDetails({
            StudentId: data.StudentId,
            FullName: data.FullName,
            ImagePath: data.ImagePath,
            Description: data.Description,
            DepartmentName: data.DepartmentName,
            StudyYear: data.StudyYear,
            NumOfRanks: data.NumOfRanks,
            RankAverage: data.RankAverage,
            NumOfClass: data.FutreClasses.length,
            FutreClasses: data.FutreClasses,
            Phone: data.Phone,
            Email: data.Email,
          });
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, [superId]);

  const BackToStudentHomePage = () => {
    navigate("/studentHomePage", { state: StudentDetails });
  };
  const BackToSearchClassesPage = () => {
    navigate("/searchClassesPage", { state: StudentDetails });
  };
  return (
    <Container className="d-flex flex-column mw-700 align-items-center">
      <LogoComponent style={{ alignSelf: "center" }} />
      {superDetails !== undefined ? (
        <>
          <FCFormSuperDetails superDetails={superDetails} type="student" />
          <FCShowProfileSuperBtns
            StudentDetails={StudentDetails}
            FutreClasses={superDetails.FutreClasses}
            Phone={superDetails.Phone}
            Email={superDetails.Email}
          />
          {state.type === 1 ? (
            <ReturnPageButton
              GoTo={() =>
                navigate("/searchClassesPage", { state: StudentDetails })
              }
            />
          ) : (
            <ReturnPageButton
              GoTo={() =>
                navigate("/classForStudent", { state: StudentDetails })
              }
            />
          )}
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
