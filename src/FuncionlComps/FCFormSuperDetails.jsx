import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import FCStarsToReturn from "./FCStarsToReturn";
const emptyImage =
  "https://proj.ruppin.ac.il/bgroup92/prod/ImageFiles/ProfileImage-empty.jpg";

export default function FCFormSuperDetails({
  superDetails,
  ShowModal,
  ShowModalDelete,
  type,
}) {
  let profileSuperImage = `https://proj.ruppin.ac.il/bgroup92/prod/ImageFiles/ProfileImage-${superDetails.ImagePath}.jpg`;
  return (
    <Container className="d-flex justify-content-center" style={{ maxWidth: "700px" }}>
      <Card
        style={{
          borderRadius: 25,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <Card.Img
          variant="top"
          style={{
            alignSelf: "center",
            height: "140px",
            width: "140px",
            marginTop: 10,
            borderRadius: "50%",
            border: "solid 6px white",
          }}
          src={
            superDetails.ImagePath !== undefined
              ? profileSuperImage
              : emptyImage
          }
          alt={emptyImage}
        />
        <Row>
          {type !== "student" ? (
            <>
              <Col xs={6}>
                <FaUserEdit
                  onClick={ShowModal}
                  style={{
                    width: 25,
                    height: 25,
                    background: "white",
                    marginLeft: "70%",
                    borderRadius: 50,
                  }}
                />
              </Col>
              <Col xs={6}>
                {superDetails.ImagePath !== undefined &&
                  superDetails.ImagePath !== "empty" ? (
                  <>
                    <FaUserTimes
                      onClick={ShowModalDelete}
                      style={{
                        width: 25,
                        height: 25,
                        marginLeft: 25,
                        background: "white",
                        borderRadius: 50,
                      }}
                    />
                  </>
                ) : (
                  ""
                )}
              </Col>
            </>
          ) : (
            ""
          )};
        </Row>
        <Card.Body align="center">
          <Card.Title>{superDetails.FullName}</Card.Title>
          <Card.Text>
            {superDetails.StudyYear} <b>:סטודנט שנה</b>
            <br />
            <b>מסלול לימודים:</b> {superDetails.DepartmentName}
          </Card.Text>
          <hr />
          <div className="d-flex justify-content-between  flex-nowrap">
            <div
              className="d-flex flex-column justify-content-between pe-1" //pe-1
              style={{ borderRight: "thin solid gray" }}
            >
              <span>
                <b>&nbsp;דירוג</b>
              </span>
              <FCStarsToReturn numbersOfStars={superDetails.RankAverage} />
            </div>
            <div
              className="d-flex flex-column justify-content-between px-1 " //ms-1 pe-1
              style={{ borderRight: "thin solid gray" }}
            >
              <span>
                <b>&nbsp;מדרגים</b>
              </span>
              <span>{superDetails.NumOfRanks}</span>
            </div>
            <div className="d-flex flex-column ps-1">
              <span>
                <b>&nbsp;מספר&nbsp;שיעורים</b>
              </span>
              <span>{superDetails.NumOfClass}</span>
            </div>
          </div>
          <hr />
          <Card.Text>
            <b>:קצת עלי</b>
            <br />
            {superDetails.Description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
