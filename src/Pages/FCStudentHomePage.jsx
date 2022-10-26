import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LogoComponent from "../Elements/LogoComponent";
import FCBottomNavigation from "../FuncionlComps/FCBottomNavigation";
import FCBurgerComp from "../FuncionlComps/FCBurgerComp";

export default function StudentHomePage() {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({});
  const [recommendation, setRecommendation] = useState();
  const location = useLocation();
  const { state } = location;

  const userDetails = {
    Email: state.Email,
    Password: state.Password,
    StudentId: studentDetails.StudentId,
  };

  useEffect(() => {
    const url = "https://proj.ruppin.ac.il/bgroup92/prod/Student/GetStudentLandingPageDetails";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(userDetails),
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
        (result) => {
          //console.log("FETCH PostRequest= ", result);
          setStudentDetails({
            StudentId: result.StudentId,
            FullName: result.FullName,
          });
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, []);

  useEffect(() => {
    const url = "https://proj.ruppin.ac.il/bgroup92/prod/tip/GetRandomTip";
    fetch(url, {
      method: "GET",
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
        (result) => {
          //console.log("FETCH PostRequest= ", result);
          setRecommendation(result.TipContent);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, []);

  return (
    <Container className="min-vh-100 d-flex align-items-center flex-column text-center">
      <LogoComponent />
      <h1>ברוכים הבאים - {studentDetails.FullName}</h1>
      <br />
      <FCBurgerComp userDetails={userDetails} />
      <h3>!המלצה ללמידה נכונה</h3>
      <div
        style={{
          borderRadius: 25,
          // backgroundColor: "#17815A",
          padding: "20PX",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <p dir="rtl" style={{ fontWeight: "bold" }}>
          {recommendation}
        </p>
      </div>
      <br />
      <Button
        style={{
          marginTop: "auto",
          marginBottom: 120,
          padding: "28px 40px 28px 40px",
          fontSize: 20,
          borderRadius: 20,
          background: "#00417E",
          border: "solid #01417E 2px",
        }}
        onClick={() => navigate("/searchClassesPage", { state: userDetails })}
      >
        !מצא את השיעור שמתאים לך
      </Button>
      {userDetails === undefined ? (
        ""
      ) : (
        <FCBottomNavigation UserDetails={userDetails} />
      )}
    </Container>
  );
}
