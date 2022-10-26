import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import FCInput from "../Elements/FCInput";
import LogoComponent from "../Elements/LogoComponent";

export default function FCLoginForm({
  UpdateEmail,
  UpdatePassword,
  VerifyUser,
  navigateToRegister,
  navigateToChangePassword,
}) {

  return (
    <Container style={{ flexDirection: "column", maxWidth: "700px", paddingTop: 150 }} >
      <Card style={{ textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 25 }}>
        <div>
          <LogoComponent />
        </ div>
        <Card.Body>
          <h2 className="text-center mb-4">התחברות</h2>
          <FCInput type="text" label='שם משתמש' onChange={UpdateEmail} />
          <FCInput type="password" label='סיסמא' onChange={UpdatePassword} />
          <Button
            style={{ display: "block", textAlign: "right", fontSize: "14px" }}
            className="w-100 text-right"
            variant="link"
            onClick={navigateToChangePassword}
          >
            ?שכחתם את הסיסמא
          </Button>
          <Button
            className="w-100 text-center mt-2"
            variant="success"
            onClick={VerifyUser}
            style={{ borderRadius: 25 }}
          >
            התחבר
          </Button>
        </Card.Body>
        <div id="errMsgLogin" style={{ display: "none", margin: "0 auto", color: "red" }}>
          שם משתמש או סיסמה שגויים
        </div>
        <div className="w-100 text-center mt-2">
          <b>?לא רשומים למערכת</b>
        </div>
        <Button
          className="w-100 text-center mt-2"
          variant="link"
          onClick={navigateToRegister}
        >
          <b>!לחצו כאן להירשם</b>
        </Button>
      </Card>
    </Container>
  );
}
