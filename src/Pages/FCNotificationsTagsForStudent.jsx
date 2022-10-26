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
import { AiOutlinePlus } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

export default function NotificationsTagsForStudent() {
  const { state } = useLocation();
  const userDetails = {
    Email: state.Email,
    Password: state.Password,
    StudentId: state.StudentId,
  };

  const [tags, setTags] = useState([]);
  const [tagsNotifications, setTagsNotifications] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/notification/GetNotificationsTags/${userDetails.StudentId}`;
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
          setTagsNotifications([]);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(
        (result) => {
          //console.log(result);
          setTagsNotifications(result);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, []);

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

  const InsertNewTagsToArray = () => {
    let newTagsArray = tagsNotifications;
    for (let index = 0; index < tags.length; index++) {
      let tag = {
        TagName: tags[index].label,
      };
      newTagsArray = [...newTagsArray, tag];
    }
    setTagsNotifications(newTagsArray);

    const url = `https://proj.ruppin.ac.il/bgroup92/prod/notification/UpdateTagsNotifications/${userDetails.StudentId}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newTagsArray),
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
          //console.log(result);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  };

  const removeTag = (tagName) => {
    //console.log(tagName);
    let newTagsArray = tagsNotifications.filter((t) => t.TagName !== tagName);
    setTagsNotifications(newTagsArray);
    //console.log(newTagsArray);

    const url = `https://proj.ruppin.ac.il/bgroup92/prod/notification/UpdateTagsNotifications/${userDetails.StudentId}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newTagsArray),
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
          //console.log(result);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  };

  useEffect(() => {
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/Class/GetClassesByTags/${userDetails.StudentId}`;
    if (tagsNotifications.length !== 0) {
      // let tagList = tagsNotifications.map((tag) => ({ TagName: tag.label }));

      fetch(url, {
        method: "POST",
        body: JSON.stringify(tagsNotifications),
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
              setClasses([]);
            } else {
              //console.log(result);
              setClasses(result);
            }
          },
          (error) => {
            //console.log("err post=", error);
          }
        );
    }
  }, [tagsNotifications]);

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
      <h4>הוסף תגיות וקבל התראה כאשר נוסף שיעור למערכת בנושא שאתה רוצה</h4>
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
          onClick={InsertNewTagsToArray}
        >
          <AiOutlinePlus />
        </Button>
      </div>
      {tagsNotifications.length !== 0 ? (
        <>
          <div>
            {tagsNotifications.map((t, i) => (
              <>
                <span
                  key={i}
                  style={{ background: "#00417E" }}
                  className="badge rounded-pill"
                >
                  {t.TagName}{" "}
                  <TiDelete
                    onClick={() => removeTag(t.TagName)}
                    style={{ height: 20, width: 20 }}
                  />
                </span>{" "}
              </>
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      {classes.length !== 0 ? (
        <>
          <div
            style={{
              width: "100%",
              height: 500,
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
        "במידה ויהיה שיעורים מתאימים הם יופיעו פה"
      )}
      {userDetails === undefined ? (
        ""
      ) : (
        <FCBottomNavigation UserDetails={userDetails} />
      )}
    </Container>
  );
}
