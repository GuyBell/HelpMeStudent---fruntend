import React from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axios from "axios";
import validator from "validator";
import FCButton from "../Elements/FCButton";
import LogoComponent from "../Elements/LogoComponent";
import ReturnPageButton from "../Elements/ReturnPageButton";

export default function FCDetailsForStudentSignUp(props) {
  const navigate = useNavigate();

  const [sID, setSID] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sFullName, setSFullName] = useState("");
  const [nameError, setNameError] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sGender, setSGender] = useState("");
  const [sBirthdate, setSBirthdate] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [sCity, setSCity] = useState("");
  const [message, setMessage] = useState(<div></div>);

  const checkFields = () => {
    const newStudentRequest = {
      StudentId: sID,
      FullName: sFullName,
      Email: sEmail,
      Phone: sPhone,
      Gender: sGender,
      BirthDate: sBirthdate,
      City: sCity,
    };
    //console.log(newStudentRequest);
    if (
      sID === "" ||
      sFullName === "" ||
      sEmail === "" ||
      sPhone === "" ||
      sGender === "" ||
      sBirthdate === "" ||
      sCity === ""
    ) {
      alert("כל השדות חובה! נא למלות את כולן בתקינות.");
    } else {
      if (props.type === "type1") {
        btnPostStudentRequest();
      } else {
        navigate("/SuperStudentRequestPage2", { state: newStudentRequest });
      }
    }
  };

  // post new student request to db - fetch post
  const btnPostStudentRequest = () => {
    const LocalUrl = "https://proj.ruppin.ac.il/bgroup92/prod/requestToJoin/newRequest";
    const currentDate = new Date();
    const newStudentRequest = {
      StudentId: sID,
      FullName: sFullName,
      Email: sEmail,
      Phone: sPhone,
      Gender: sGender,
      BirthDate: sBirthdate,
      City: sCity,
      RequestStatus: "onHold",
      RequestDate: currentDate,
    };
    //console.log(newStudentRequest);

    //console.log("start");
    fetch(LocalUrl, {
      method: "POST",
      body: JSON.stringify(newStudentRequest),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.ok", res.ok);
        msgBox(res.ok);
        return res.json();
      })
      .then(
        (result) => {
          //console.log("FETCH PostRequest= ", result);
          //console.log(result.RequsetNum);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
    //console.log("end");
  };

  const fetchCities = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(async () => {
        const { data } = await axios.get(
          "https://proj.ruppin.ac.il/bgroup92/prod/city/getCitiesByInput/" + inputValue
        );
        const tempArray = [];
        data.forEach((element) => {
          tempArray.push({
            label: `${element.CityName}`,
            value: element.CityName,
          });
        });
        callback(tempArray);
      });
    }
  };

  const isEmailExist = (email) => {
    const Url = "https://proj.ruppin.ac.il/bgroup92/prod/requestToJoin/isEmailExist";
    const user = {
      Email: email,
    };
    //console.log(user);
    fetch(Url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.status", res.status);
        //console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          //console.log(result);
          if (result === "found") {
            setEmailError("!מייל זה קיים במערכת");
            setSEmail("");
          } else {
            setEmailError("(: מייל תקין");
            setSEmail(email);
          }
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  };

  //Notification
  const handleID = (e) => {
    if (!Number(e.target.value) && e.target.value !== "0") {
      let str = e.target.value.substring(0, e.target.value.length - 1);
      e.target.value = str;
    } else if (
      e.target.value === "" ||
      e.target.value === 0 ||
      e.target.value.length < 9
    ) {
      e.target.style.border = "2px solid red";
      setSID("");
    } else {
      e.target.style.border = "";
      setSID(e.target.value);
    }
  };
  const handleEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      isEmailExist(email);
    } else {
      setEmailError("!מייל לא תקין");
      setSEmail("");
    }
  };
  const emailMessage = () => {
    let block = <Form.Text className="text-success">{emailError}</Form.Text>;
    if (emailError === "(: מייל תקין") {
      return block;
    } else {
      let block = <Form.Text className="text-danger">{emailError}</Form.Text>;
      return block;
    }
  };
  const handleFullName = (e) => {
    let name = e.target.value;
    let res = name.match(" ");
    if (
      res === null ||
      res.index < 2 ||
      res.input[res.input.length - 1] === " " ||
      res.input.includes("  ")
    ) {
      setNameError("!שם לא תקין");
      setSFullName("");
    } else {
      setSFullName(name);
      setNameError("");
    }
  };
  const preventNumbers = (e) => {
    for (let i = 0; i < e.target.value.length; i++) {
      if (Number(e.target.value[i])) {
        let str = e.target.value.substring(0, e.target.value.length - 1);
        e.target.value = str;
      }
    }
  };
  const nameMessage = () => {
    let block = <Form.Text className="text-danger">{nameError}</Form.Text>;
    if (nameError === "!שם לא תקין") {
      return block;
    } else {
      return null;
    }
  };
  const handlePhone = (e) => {
    let res = e.target.value.match("05");
    if (
      e.target.value === "" ||
      e.target.value === 0 ||
      e.target.value.length < 10 ||
      res === null ||
      res.index !== 0
    ) {
      setPhoneError("!מספר הטלפון אינו תקין");
      setSPhone("");
    } else {
      setSPhone(e.target.value);
      setPhoneError("");
    }
  };
  const preventLetters = (e) => {
    if (!Number(e.target.value) && e.target.value !== "0") {
      let str = e.target.value.substring(0, e.target.value.length - 1);
      e.target.value = str;
    }
  };
  const phoneMessage = () => {
    let block = <Form.Text className="text-danger">{phoneError}</Form.Text>;
    if (phoneError === "!מספר הטלפון אינו תקין") {
      return block;
    } else {
      return null;
    }
  };
  const handleAge = (e) => {
    let age = 0;
    const today = new Date();
    const birthDate = new Date(e.target.value);
    const yearsDifference = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age = yearsDifference - 1;
    } else {
      age = yearsDifference;
    }

    if (e.target.value === "" || age < 18) {
      setBirthDateError("!תאריך לידה אינו תקין");
      setSBirthdate("");
    } else {
      setSBirthdate(birthDate);
      setBirthDateError("");
    }
  };
  const birthDateMessage = () => {
    let block = <Form.Text className="text-danger">{birthDateError}</Form.Text>;
    if (birthDateError === "!תאריך לידה אינו תקין") {
      return block;
    } else {
      return null;
    }
  };

  const msgBox = (isOk) => {
    let box;
    if (isOk) {
      box = (
        <div className="App-header">
          <div>!הבקשה נשלחה בהצלחה</div>
          <div>אנו ניצור איתך קשר לגבי מצב בקשתך בהקדם, המייל ישלח למייל איתו נרשמת למערכת</div>
          <Button variant="success" onClick={() => navigate("/")}>
            סגור
          </Button>
        </div>
      );
    } else {
      box = (
        <div className="App-header">
          <div>!שליחת הבקשה נכשלה</div>
          <div>..נא לנסות שוב מאוחר יותר</div>
          <Button variant="danger" onClick={() => navigate("/")}>
            סגור
          </Button>
        </div>
      );
    }
    document.getElementById("card").style.display = "none";
    setMessage(box);
  };

  return (
    <Container
      style={{
        textAlign: "center",
        flexDirection: "column",
        maxWidth: "700px",
        justifyContent: "center",
        paddingTop: 2,
      }}
    >
      <div className="App">{message}</div>
      <Card
        style={{
          borderRadius: 25,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
        id="card"
      >
        <div style={{ alignSelf: "center" }}>
          <LogoComponent />
          <ReturnPageButton GoTo={() => navigate("/typeOfUser")} />
        </div>
        <h3 className="text-center mt-2">הרשמה</h3>
        <Card.Body>
          <Form className="text-end">
            <Form.Group className="mb-2">
              <Form.Label>תעודת זהות</Form.Label>
              <Form.Control
                className="text-end"
                type="text"
                placeholder="תעודת זהות"
                required
                onChange={(e) => handleID(e)}
                maxLength={9}
                style={{ borderRadius: 25 }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>מייל</Form.Label>
              <Form.Control
                className="text-end"
                type="email"
                placeholder="כתובת מייל"
                required
                onChange={(e) => handleEmail(e)}
                style={{ borderRadius: 25 }}
              />
              <Form.Text>
                המייל ישמש כאמצאי התחברות וקבלת התראות על שיעורים
              </Form.Text>
              <br />
              {emailMessage()}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>שם מלא</Form.Label>
              <Form.Control
                dir="rtl"
                type="text"
                placeholder="שם מלא"
                required
                onBlur={handleFullName}
                onChange={(e) => preventNumbers(e)}
                style={{ borderRadius: 25 }}
              />
              {nameMessage()}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>מספר טלפון</Form.Label>
              <Form.Control
                className="text-end"
                type="text"
                placeholder="מספר טלפון"
                required
                onChange={(e) => preventLetters(e)}
                onBlur={(e) => handlePhone(e)}
                maxLength={10}
                style={{ borderRadius: 25 }}
              />
              {phoneMessage()}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>מין</Form.Label>
              <Form.Select
                dir="rtl"
                size="sm"
                onChange={(e) => setSGender(e.target.value)}
                required
                style={{ borderRadius: 25 }}
              >
                <option value="" defaultValue hidden>
                  בחר
                </option>
                <option value="m"> זכר </option>
                <option value="f"> נקבה </option>
                <option value="o"> אחר </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>תאריך לידה</Form.Label>
              <Form.Control
                type="date"
                placeholder="תאריך לידה"
                required
                onBlur={(e) => handleAge(e)}
                style={{ borderRadius: 25 }}
              />
            </Form.Group>
            {birthDateMessage()}
            <Form.Group className="mb-3">
              <Form.Label>מקום מגורים</Form.Label>
              <AsyncSelect
                isRtl
                loadOptions={fetchCities}
                required
                onChange={(e) => setSCity(e.value)}
              />
            </Form.Group>
          </Form>
          {props.type === "type1" ? (
            <FCButton onClick={checkFields}>שליחה לאימות נתונים</FCButton>
          ) : (
            <FCButton style={{}} onClick={checkFields}>
              המשך למילוי פרופיל אישי
            </FCButton>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
