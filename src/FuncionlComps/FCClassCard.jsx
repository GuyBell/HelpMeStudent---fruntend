import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FCModalContact from "./FCModalContact";
import FCStarsToReturn from "./FCStarsToReturn";

export default function FCClassCard({
  classToCard,
  type,
  ShowModaAreYouSure,
  btnFunction,
  studentDetails,
  ShowModalStarsBtn,
  RegistrationPoint,
}) {
  const navigate = useNavigate();

  const [superDetails, setSuperDetails] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const bringPhoneNumber = async (classToCard) => {
    const superId = classToCard.SuperStudentId;
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/SuperStudent/ShowSuperDetailsById/${superId}`;
    await fetch(url, {
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
            Phone: data.Phone,
            Email: data.Email,
          });
          setModalShow(true)
          //window.location.replace(`https://wa.me/${superDetails.Phone}`);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  };

  switch (type) {
    case "history":
      return (
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(208, 201, 192, 0.8)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #7F8487 1px",
          }}
        >
          <Card.Body className="text-end">
            <Row>
              <Col xs={4} style={{ alignSelf: "center" }}>
                {classToCard.RankResults != null &&
                classToCard.RankResults.length > 0 ? (
                  <>
                    5 / {classToCard.RankResults[0].RankValue} <b>:דירוג</b>
                  </>
                ) : (
                  ""
                )}
              </Col>
              <Col xs={8}>
                <b>שם השיעור:</b> {classToCard.ClassName}
                <br />
                <b>תאריך:</b>{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                <br />
                <b>משעה:</b> {classToCard.StartTime.slice(0, 5)} <b>עד שעה:</b> {classToCard.EndTime.slice(0, 5)}
                <br />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    case "studentFutre":
      return (
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(218, 234, 241, 0.8)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #1C658C 1px",
          }}
        >
          <Card.Body className="w-100 d-flex align-items-center justify-content-between">
            <div>
              <Button
                className="m-1"
                size="sm"
                onClick={() => ShowModaAreYouSure(classToCard)}
                variant="outline-danger"
              >
                מחיקה
              </Button>
              <Button
                className="m-1"
                size="sm"
                variant="outline-primary"
                onClick={() => bringPhoneNumber(classToCard)}
              >
                צור קשר
              </Button>
              <FCModalContact show={modalShow} onHide={() => setModalShow(false)} phone={superDetails.Phone} email={superDetails.Email} style={{direction: "rtl"}}/>
            </div>
            <div className="text-end">
              <b>שם השיעור:</b> {classToCard.ClassName}
              <br />
              <b>תאריך:</b>{" "}
              {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
              <br />
              <b>משעה:</b> {classToCard.StartTime.slice(0, 5)} <b>עד שעה:</b> {classToCard.EndTime.slice(0, 5)}
              {studentDetails !== undefined ? (
                <Button
                  className="badge rounded-pill"
                  style={{ background: "#A2D5AB", border: "solid #4B8673 1px" }}
                  size="sm"
                  onClick={() =>
                    navigate("/ShowProfileSuperStudent", {
                      state: { classToCard, studentDetails },
                    })
                  }
                >
                  {classToCard.SuperName}
                </Button>
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </Card>
      );
    case "Futre":
      return (
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(218, 234, 241, 0.9)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #1C658C 1px",
          }}
        >
          <Card.Body className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              {classToCard.NumOfRegistered > 0 ? (
                <Button
                  size="sm"
                  onClick={() => ShowModaAreYouSure(classToCard)}
                  variant="outline-danger"
                >
                  מחיקה
                </Button>
              ) : (
                <>
                  {studentDetails !== undefined ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        navigate("/UpdateSuperClassPage", {
                          state: { classToCard, studentDetails },
                        })
                      }
                    >
                      עדכון
                    </Button>
                  ) : (
                    ""
                  )}

                  <Button
                    size="sm"
                    onClick={() => ShowModaAreYouSure(classToCard)}
                    variant="outline-danger"
                  >
                    מחיקה
                  </Button>
                </>
              )}
            </div>
            <div className="text-end">
              <b>שם השיעור:</b> {classToCard.ClassName}
              <br />
              <b>תיאור:</b> {classToCard.ClassDescription}
              <br />
              <b>תאריך:</b>{" "}
              {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
              <br />
              <b>משעה:</b> {classToCard.StartTime.slice(0, 5)} <b>עד שעה:</b> {classToCard.EndTime.slice(0, 5)}
              <br />
              <b>:תגיות השיעור</b>
              <br />
              {classToCard.Tags.map((t) => (
                <span
                  key={t}
                  style={{ background: "#00417E" }}
                  className="badge rounded-pill"
                >
                  {t}
                </span>
              ))}
            </div>
          </Card.Body>
        </Card>
      );
    case "SearchClass":
      return (
        <>
          <Card
            style={{
              width: "98%",
              marginTop: 4,
              backgroundColor: "rgba(218, 234, 241, 0.9)",
              marginLeft: 4,
              borderRadius: 20,
              border: "solid #1C658C 1px",
            }}
          >
            <Card.Body className="w-100 d-flex align-items-center justify-content-between">
              <div>
                {classToCard.NumOfParticipants - classToCard.NumOfRegistered >
                0 ? (
                  <Button
                    onClick={() =>
                      btnFunction(classToCard.ClassCode, RegistrationPoint)
                    }
                    style={{
                      borderRadius: 15,
                      background: "#A2D5AB",
                      border: "solid #4B8673 2px",
                    }}
                  >
                    הרשמה
                  </Button>
                ) : (
                  <b>לא נותרו מקומות</b>
                )}
              </div>
              <div className="text-end">
                <b>שם השיעור:</b> {classToCard.ClassName}
                <br />
                <b>תיאור:</b> {classToCard.ClassDescription}
                <br />
                <b>תאריך:</b>{" "}
                {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                <br />
                <b>משעה:</b> {classToCard.StartTime.slice(0, 5)} <b>עד שעה:</b> {classToCard.EndTime.slice(0,5)}
                <br />
                <b>מחיר:</b> 60 - 90 ש"ח (בתיאום עם המורה)
                <br />
                <b>:תגיות השיעור</b>
                <br />
                <b>
                  {classToCard.Tags.map((t) => (
                    <span
                      key={t}
                      style={{ background: "#00417E" }}
                      className="badge rounded-pill"
                    >
                      {t}
                    </span>
                  ))}
                </b>
                {studentDetails !== undefined ? (
                  <div>
                    <div className="d-flex flex-row-reverse align-items-center flex-nowrap">
                      <span>
                        <b>&nbsp;:דירוג&nbsp;המורה</b>
                      </span>
                      <FCStarsToReturn
                        numbersOfStars={classToCard.SuperStudentRank}
                      />
                    </div>
                    <Button
                      className="badge rounded-pill"
                      style={{
                        background: "#A2D5AB",
                        border: "solid #4B8673 2px",
                        marginLeft: 8,
                      }}
                      size="sm"
                      onClick={() =>
                        navigate("/ShowProfileSuperStudent", {
                          state: { classToCard, studentDetails, type: 1 },
                        })
                      }
                    >
                      {classToCard.SuperName}
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Card.Body>
          </Card>
        </>
      );
    case "studentHistory":
      return (
        <Card
          style={{
            width: "98%",
            marginTop: 4,
            backgroundColor: "rgba(208, 201, 192, 0.8)",
            marginLeft: 4,
            borderRadius: 20,
            border: "solid #7F8487 1px",
          }}
        >
          <Card.Body className="w-100 d-flex align-items-center justify-content-between">
            <div>
              {classToCard.RankResults[0].RankValue === 0 ? (
                <Button
                  className="m-1"
                  size="sm"
                  onClick={() => ShowModalStarsBtn(classToCard.ClassCode)}
                  variant="outline-primary"
                >
                  דירוג
                </Button>
              ) : (
                <b>דורג</b>
              )}
            </div>
            <div className="text-end">
              <b>שם השיעור:</b> {classToCard.ClassName}
              <br />
              <b>תאריך:</b>{" "}
              {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
              <br />
              <b>משעה:</b> {classToCard.StartTime.slice(0, 5)} <b>עד שעה:</b> {classToCard.EndTime.slice(0, 5)}
            </div>
          </Card.Body>
        </Card>
      );
    default:
      return (
        <>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={2}>
                  <Button variant="secondary">עדכון</Button>
                </Col>
                <Col xs={2}>
                  <Button
                    onClick={() => ShowModaAreYouSure(classToCard)}
                    variant="outline-danger"
                  >
                    מחיקה
                  </Button>
                </Col>
                <Col xs={8}>
                  <b>שם השיעור:</b> {classToCard.ClassName}
                  <br />
                  <b>תאריך:</b>{" "}
                  {new Date(classToCard.ClassDate).toLocaleDateString("en-GB")}{" "}
                  <br />
                  <b>שעת התחלה:</b> {classToCard.StartTime}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      );
  }
}
