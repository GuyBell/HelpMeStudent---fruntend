import React from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReturnPageButton from "../Elements/ReturnPageButton";

import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import FCModalUpdateClass from "../FuncionlComps/FCModalUpdateClass";

export default function FCUpdateSuperClassPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const classDetails = state.classToCard;
  const superDetails = state.studentDetails;

  const [tags, setTags] = useState(classDetails.Tags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [className, setClassName] = useState(classDetails.ClassName);
  const [classDescription, setClassDescription] = useState(classDetails.ClassDescription);
  const [classDate, setClassDate] = useState(classDetails.ClassDate);
  const [classStartTime, seTclassStartTime] = useState(classDetails.StartTime);
  const [classEndTime, setClassEndTime] = useState(classDetails.EndTime);
  const [classParticipants, setClassParticipants] = useState(classDetails.NumOfParticipants);
  const [modalOpen, setModalOpen] = useState(false);

  const date = new Date(classDate)
  const stringDate = date.toLocaleDateString("en-CA")

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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://proj.ruppin.ac.il/bgroup92/prod/Tags/getAll");
      let suggestionList = data.map((suggestion, index) => {
        return { value: index, label: suggestion };
      });
      setSuggestions(suggestionList);
      const selected = tags.map(t => {
        let tag = suggestionList.find(tg => tg.label === t)
        return tag
      })
      setSelectedTags(selected)
    };
    fetchData();
  }, []);

  const btnShow = () => {
    const updateClassUrl = "https://proj.ruppin.ac.il/bgroup92/prod/SuperStudent/UpdateClassDetailsSuperStudent"
    const Tags = selectedTags.map(t => t.label)
    const updatedClass = {
      ClassCode: classDetails.ClassCode,
      ClassName: className,
      ClassDate: classDate,
      ClassDescription: classDescription,
      NumOfParticipants: classParticipants,
      StartTime: classStartTime,
      EndTime: classEndTime,
      Tags: Tags
    }
    //console.log(updatedClass)
    //console.log("start")
    fetch(updateClassUrl, {
      method: "PUT",
      body: JSON.stringify(updatedClass),
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
    //console.log("end")
  }

  const BackToHomePage = () => {
    navigate("/SuperHomePage", { state: superDetails });
  };

  return (
    <Container style={{ flexDirection: "column", maxWidth: "700px", justifyContent: "center", paddingTop: 2 }}>
      <Card style={{ paddingTop: 62, borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.7)" }} >
        <Card.Body align="center">
          <ReturnPageButton GoTo={BackToHomePage} />
          <h2 className="text-center mb-4">עדכון שיעור</h2>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>שם השיעור</Form.Label>
              <Form.Control
                type="text"
                style={{ textAlign: "right", borderRadius: 25 }}
                placeholder={className}
                required
                onChange={(e) => setClassName(e.target.value)}
                defaultValue={className}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>תיאור השיעור</Form.Label>
              <Form.Control
                as="textarea"
                style={{ textAlign: "right", borderRadius: 25 }}
                rows={3}
                placeholder={classDescription}
                required
                onChange={(e) => setClassDescription(e.target.value)}
                defaultValue={classDescription}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>תאריך השיעור</Form.Label>
              <Form.Control
                type="date"
                style={{ textAlign: "right", borderRadius: 25 }}
                required
                onChange={(e) => setClassDate(e.target.value)}
                defaultValue={stringDate}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>שעת התחלה</Form.Label>
              <Form.Control
                type="time"
                style={{ textAlign: "right", borderRadius: 25 }}
                required
                onChange={(e) => seTclassStartTime(e.target.value)}
                defaultValue={classStartTime}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>שעת סיום</Form.Label>
              <Form.Control
                type="time"
                style={{ textAlign: "right", borderRadius: 25 }}
                placeholder={classEndTime}
                required
                onChange={(e) => setClassEndTime(e.target.value)}
                defaultValue={classEndTime}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>מספר משתתפים</Form.Label>
              <Form.Select
                size="sm"
                style={{ textAlign: "right", borderRadius: 25 }}
                required
                onChange={(e) => setClassParticipants(e.target.value)}
              >
                <option value={classParticipants} defaultValue hidden>
                  {classParticipants}
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
                value={selectedTags}
                theme={customTheme}
                placeholder="בחר תגיות"
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={setSelectedTags}
                isMulti
                isSearchable
                noOptionsMessage={() => "לא נמצאו תגיות"}
                className="basic-multi-select mb-3"
                options={suggestions}
              />
            </Form.Group>
          </Form>
          <Button
            id="subBtn"
            variant="success"
            onClick={btnShow}
          >
            עדכון שיעור
          </Button>
        </Card.Body>
        <FCModalUpdateClass modalOpen={modalOpen} BackToHomePage={BackToHomePage} />
      </Card>
    </Container>
  );
}