import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import Select from "react-select";
import makeAnimate from "react-select/animated";
import FCClassCard from "../FuncionlComps/FCClassCard";
import "../StyleSheets/searchClassesStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import FCModalConfirm from "../FuncionlComps/FCModalConfirm";
import FCBottomNavigation from "../FuncionlComps/FCBottomNavigation";
import LogoComponent from "../Elements/LogoComponent";
import spiner from '../Elements/Spiner';

export default function SearchClassesPage() {
  const { state } = useLocation();
  const userDetails = {
    Email: state.Email,
    Password: state.Password,
    StudentId: state.StudentId,
  };

  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [suggestionsClasses, setSuggestionsClasses] = useState([]);
  const navigate = useNavigate();
  const [msNoClasses, setMsNoClasses] = useState(false);

  //Modal
  const [confirmModal, setConfirmModal] = useState(false);
  const [classDetails, setClassDetails] = useState();

  const animatedComponents = makeAnimate();
  const customTheme = (theme) => {
    return {
      ...theme,

      color: {
        ...theme.colors,
        primary25: "green",
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
    };
    fetchData();
  }, []);

  // Get suggestions for lessons if the student has previously registered for other lessons in the system.
  useEffect(() => {
    //console.log(state.StudentId);
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/Class/GetSuggestionsClasses/${state.StudentId}`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.ok", res.ok);
        if (res.ok === false) {
          setSuggestionsClasses([]);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(
        (result) => {
          //console.log("FETCH PostRequest= ", result);
          setSuggestionsClasses(result);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, []);

  const searchByTags = () => {
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/Class/GetClassesByTags/${userDetails.StudentId}`;
    if (tags.length !== 0) {
      let tagList = tags.map((tag) => ({ TagName: tag.label }));

      fetch(url, {
        method: "POST",
        body: JSON.stringify(tagList),
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
            if (
              result ===
              "Sorry there are still no classes with tags that you sended. please try another tags."
            ) {
              //console.log("not found");
              setMsNoClasses(true);
              setClasses([]);
            } else {
              //console.log(result);
              setMsNoClasses(false);
              setClasses(result);
            }
          },
          (error) => {
            //console.log("err post=", error);
          }
        );
    }
  };

  const register = (classCode, RegistrationPoint) => {
    //console.log(classCode);
    const requestToRegister = {
      StudentId: userDetails.StudentId, //state.StudentId
      ClassCode: classCode,
    };
    //console.log(requestToRegister);
    if (RegistrationPoint === "suggestionsClasses") {
      const classToModal = suggestionsClasses.find(
        (c) => c.ClassCode === classCode
      );
      let classToConfirmModal = {
        classCode: classToModal.ClassCode,
        classDate: classToModal.ClassDate,
        classEndTime: classToModal.EndTime,
        className: classToModal.ClassName,
        classParticipants: classToModal.NumOfParticipants,
        classStartTime: classToModal.StartTime,
      };
      setClassDetails(classToConfirmModal);
    } else {
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
    }
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
      <h4>!מצא את השיעור שמתאים לך</h4>
      <div className="d-flex w-100 m-3">
        <Select
          theme={customTheme}
          placeholder="בחר תגיות"
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={setTags}
          isMulti
          isSearchable
          noOptionsMessage={() => "לא נמצאו תגיות"}
          className="basic-multi-select w-100"
          options={suggestions}
        />
        <Button
          className="flex-shrink-1"
          style={{
            background: "#A2D5AB",
            border: "solid #4B8673 1px",
            margin: 0,
          }}
          onClick={searchByTags}
        >
          🔍
        </Button>
      </div>
      {msNoClasses === true ? (
        <>
          <div style={{ margin: "0 auto", color: "black" }}>
            כרגע לא קיימים שיעורים עם תגית זו, אנו ממליצים להוסיף את התגית
            להתראות כדי להיות מעודכנים ברגע שהתוסף שיעור בנושא זה
          </div>
        </>
      ) : (
        ""
      )}
      {classes.length !== 0}

      {classes.length !== 0 ? (
        <>
          <div
            style={{
              width: "100%",
              height: "62vh",
              overflow: "auto",
              borderRadius: 25,
            }}
          >
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
        </>
      ) : (
        <>
          {suggestionsClasses.length !== 0 ? (
            <>
              <h5>הצעות לשיעורים שאולי מתאימים לך</h5>
              <div
                style={{
                  width: "100%",
                  height: "62vh",
                  overflow: "auto",
                  borderRadius: 25
                }}
              >
                {suggestionsClasses.map((c) => (
                  <FCClassCard
                    key={c.ClassCode}
                    classToCard={c}
                    type="SearchClass"
                    btnFunction={register}
                    RegistrationPoint="suggestionsClasses"
                    studentDetails={userDetails}
                  />
                ))}
              </div>
            </>
          ) :
            ""
          }
        </>
      )}
      {userDetails === undefined ? (
        ""
      ) : (
        <FCBottomNavigation UserDetails={userDetails} />
      )}
    </Container>
  );
}
