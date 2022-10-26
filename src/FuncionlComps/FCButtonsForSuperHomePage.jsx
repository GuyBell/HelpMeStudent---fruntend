import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../StyleSheets/btnSuperStyle.css";

export default function FCButtonsForSuperHomePage({
  UserDetails,
  superName,
  DepartmentName,
  Description,
  StudyYear,
  HistoryClass,
  FutreClass,
}) {
  const navigate = useNavigate();
  const superDetails = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    superName: superName,
    superId: UserDetails.StudentId,
  };

  const superDetailsForUpdateProfile = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    DepartmentName: DepartmentName,
    Description: Description,
    StudyYear: StudyYear,
  };

  const superDetailsForHistoryClass = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    HistoryClass: HistoryClass,
  };

  const superDetailsForFutreClass = {
    superEmail: UserDetails.Email,
    superPassword: UserDetails.Password,
    FutreClass: FutreClass,
  };

  return (
    <Container className="d-flex align-items-center justify-content-center flex-column">
      <div className="d-flex">
        <Button
          className="btnSuper"
          onClick={() =>
            navigate("/FutreClasses", { state: superDetailsForFutreClass })
          }
        >
          שיעורים עתידיים שלי
        </Button>
        <Button
          className="btnSuper"
          onClick={() => navigate("/CreateNewClass", { state: superDetails })}
          style={{ backgroundColor: "#90EE90" }}
        >
          + יצירת שיעור חדש
        </Button>
      </div>
      <div className="d-flex">
        <Button
          className="btnSuper"
          onClick={() =>
            navigate("/UpdateProfileSuper", {
              state: superDetailsForUpdateProfile,
            })
          }
        >
          עריכת הפרופיל שלי
        </Button>
        <Button
          className="btnSuper"
          onClick={() =>
            navigate("/HistoryClassSuper", {
              state: superDetailsForHistoryClass,
            })
          }
        >
          היסטורית שיעורים
        </Button>
      </div>
    </Container>
  );
}
