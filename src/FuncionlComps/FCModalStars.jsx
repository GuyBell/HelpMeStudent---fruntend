import React from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function FCModalStars({
  isOpen,
  starsModalHide,
  classCode,
  studentId,
  btnFunc,
}) {
  const [rating, setRating] = useState(0); // initial rating value
  const [ratingDescription, setRatingDescription] = useState("");

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <Modal show={isOpen} style={{ textAlign: "center" }}>
      <Modal.Dialog>
        <Modal.Header>
          <Rating onClick={handleRating} ratingValue={rating} />
          <Modal.Title>דירוג שיעור</Modal.Title>
          <br />
        </Modal.Header>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label>:תכתוב לנו איך היה השיעור</Form.Label>

          <Form.Control
            as="textarea"
            style={{ textAlign: "right" }}
            rows={3}
            placeholder="הערות לשיפור / שימור"
            required
            onChange={(e) => setRatingDescription(e.target.value)}
          />
        </Form.Group>
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <Row>
            <Col xs={6}>
              <Button onClick={starsModalHide} variant="danger">
                <b>אולי בפעם אחרת</b>
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant="success"
                onClick={() =>
                  btnFunc({ studentId, classCode, rating, ratingDescription })
                }
              >
                <b>שלח דירוג</b>
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}
