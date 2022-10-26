import React from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FCModalConfirm from "./FCModalConfirm";
import ReturnPageButton from "../Elements/ReturnPageButton";

import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function FCCreateNewClass() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const superId = state.superId;
  const superName = state.superName;
  const superEmail = state.superEmail;
  const superPassword = state.superPassword;
  const UserDetails = {
    Email: superEmail,
    Password: superPassword,
  };

  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classDate, setClassDate] = useState("");
  const [classStartTime, seTclassStartTime] = useState("");
  const [classEndTime, setClassEndTime] = useState("");
  const [classParticipants, setClassParticipants] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const animatedComponents = makeAnimated();
  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "limegreen",
        primaty: "green",
      },
    };
  };

  //Class Details for Modal!
  const ClassDetailsForModal = {
    className: className,
    classDate: classDate,
    classStartTime: classStartTime,
    classEndTime: classEndTime,
    classParticipants: classParticipants,
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://proj.ruppin.ac.il/bgroup92/prod/Tags/getAll");
      let suggestionList = data.map((suggestion, index) => {
        return { value: index, label: suggestion };
      });

      setSuggestions(suggestionList);
    };
    fetchData();
    if (JSON.parse(localStorage.getItem("classDets")) !== null) {
      const dets = JSON.parse(localStorage.getItem("classDets"));
      //console.log(dets);
      let elemnts = document.getElementsByName("hold");
      //console.log(elemnts);
      elemnts[0].value = dets.ClassName;
      setClassName(dets.ClassName);
      elemnts[1].value = dets.ClassDescription;
      setClassDescription(dets.ClassDescription);
      elemnts[2].value = dets.ClassDate;
      setClassDate(dets.ClassDate);
      elemnts[3].value = dets.StartTime;
      seTclassStartTime(dets.StartTime);
      elemnts[4].value = dets.EndTime;
      setClassEndTime(dets.EndTime);
      elemnts[5].value = dets.NumOfParticipants;
      setClassParticipants(dets.NumOfParticipants);
      elemnts[6].value = dets.Tags;
    }
  }, []);

  const postNewClass = () => {
    let dtStart = new Date(classDate)
    dtStart.setHours(Number(classStartTime.slice(0,2)))
    let dtEnd = new Date(classDate)
    dtEnd.setHours(Number(classEndTime.slice(0,2)))
    if (className === "" || classDate === "" || classDescription === "" || classStartTime === "" || classEndTime === "" || classParticipants === 0 || tags.length === 0) {
      alert("כל השדות חובה! עליך למלות את כולן.")
    }
    else if (new Date(classDate).getDate() < new Date().getDate()) {
      alert("תאריך שיעור שגוי!")
    }
    else if (new Date(classDate).toLocaleDateString("en-GB") === new Date().toLocaleDateString("en-GB") && dtStart.getHours() <= (new Date().getHours() + 1)) {
      alert("שעת שיעור מוקדמת מדי! מומלץ לקבוע שעתיים מראש")
    }
    else if (dtEnd.getHours() < dtStart.getHours()) {
      alert("שעת סיום חייבת להיות מאוחרת יותר משעת התחלה..")
    }
    else {
      const url = "https://proj.ruppin.ac.il/bgroup92/prod/Class/PostNewClass";
      let tagList = tags.map((tag) => tag.label);
      const newClassObj = {
        ClassDate: classDate,
        StartTime: classStartTime,
        EndTime: classEndTime,
        ClassName: className,
        SuperStudentId: superId,
        NumOfParticipants: classParticipants,
        ClassDescription: classDescription,
        SuperName: superName,
        Tags: tagList,
      };
  
      //console.log(newClassObj);
      //console.log("start");
      fetch(url, {
        method: "POST",
        body: JSON.stringify(newClassObj),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          //console.log("res.ok", res.ok);
          if (res.ok) {
            localStorage.removeItem("classDets");
            setModalOpen(true);
          }
          return res.json();
        })
        .then(
          (result) => {
            //console.log("FETCH PostRequest= ", result);
          },
          (error) => {
            //console.log("err post=", error);
          }
        );
      //console.log("end");
    }
  };

  const BackToHomePage = () => {
    navigate("/SuperHomePage", { state: UserDetails });
  };
  const tagsRelatedDetails = {
    StudentId: superId,
    StudentName: superName,
    ClassName: className,
    superEmail: superEmail,
    superPassword: superPassword,
  };

  const holdInputAndNav = () => {
    let tagList = tags.map((tag) => tag.label);
    const newClassObj = {
      ClassDate: classDate,
      StartTime: classStartTime,
      EndTime: classEndTime,
      ClassName: className,
      SuperStudentId: superId,
      NumOfParticipants: classParticipants,
      ClassDescription: classDescription,
      SuperName: superName,
      Tags: tagList,
    };
    localStorage.setItem("classDets", JSON.stringify(newClassObj));
    navigate("/insertTagsPage", { state: tagsRelatedDetails });
  };

  return (
    <Container
      style={{
        flexDirection: "column",
        maxWidth: "700px",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          paddingTop: 62,
          borderRadius: 25,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <Card.Body align="center">
          <ReturnPageButton GoTo={BackToHomePage} />
          <h2 className="text-center mb-4">יצירת שיעור חדש</h2>
          <Form>
            <Form.Group className="mb-3">
              {/* <Form.Label>שם השיעור</Form.Label> */}
              <Form.Control
                dir="rtl"
                type="text"
                style={{ textAlign: "right", borderRadius: 25 }}
                placeholder="שם השיעור"
                required
                onChange={(e) => setClassName(e.target.value)}
                name="hold"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Label>תיאור השיעור</Form.Label> */}
              <Form.Control
                dir="rtl"
                as="textarea"
                style={{ textAlign: "right", borderRadius: 25 }}
                rows={3}
                placeholder="הכנס את תיאור השיעור / מערך השיעור"
                required
                onChange={(e) => setClassDescription(e.target.value)}
                name="hold"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>תאריך השיעור</Form.Label>
              <Form.Control
                type="date"
                placeholder="תאריך השיעור"
                required
                onChange={(e) => setClassDate(e.target.value)}
                style={{ borderRadius: 25 }}
                name="hold"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>שעת התחלה</Form.Label>
              <Form.Control
                type="time"
                placeholder="שעת התחלה"
                required
                onChange={(e) => seTclassStartTime(e.target.value)}
                style={{ borderRadius: 25 }}
                name="hold"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>שעת סיום</Form.Label>
              <Form.Control
                type="time"
                placeholder="שעת סיום"
                required
                onChange={(e) => setClassEndTime(e.target.value)}
                style={{ borderRadius: 25 }}
                name="hold"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>מספר משתתפים</Form.Label>
              <Form.Select
                dir="rtl"
                size="sm"
                style={{ textAlign: "right", borderRadius: 25 }}
                required
                onChange={(e) => setClassParticipants(e.target.value)}
                name="hold"
              >
                <option value="" defaultValue hidden>
                  בחר
                </option>
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
                <option value="4"> 4 </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>בחר תגיות</Form.Label>
              <Select
                theme={customTheme}
                placeholder="בחר תגיות"
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={setTags}
                isMulti
                isSearchable
                noOptionsMessage={() => "לא נמצאו תגיות"}
                className="basic-multi-select mb-3"
                options={suggestions}
                name="hold"
              />
              <Form.Text>
                <div>?רצית תגית ולא מצאת</div>
                <Button variant="link" onClick={() => holdInputAndNav()}>
                  !שלח לנו הצעות לתגיות חדשות
                </Button>
              </Form.Text>
            </Form.Group>
          </Form>
          <Button id="subBtn" variant="success" onClick={() => postNewClass()}>
            יצירת שיעור
          </Button>
        </Card.Body>
        <FCModalConfirm
          BackToHomePage={BackToHomePage}
          modalOpen={modalOpen}
          ClassDetailsForModal={ClassDetailsForModal}
          text="!השיעור התווסף/ עודכן בהצלחה"
        />
      </Card>
    </Container>
  );
}
