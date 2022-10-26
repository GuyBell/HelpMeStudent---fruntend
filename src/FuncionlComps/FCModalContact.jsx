import React from "react";
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";

export default function FCModalContact(props) {
  const wazap = (
    <a
        className="btn btn-success"
        href={`https://wa.me/${props.phone}`}
        role="button"
      >
       פתח ווטסאפ
    </a>
  )
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          יצירת קשר עם המורה
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <b> ווטסאפ: </b> {wazap}  <br /> <br />
       <b> מספר טלפון: </b> {props.phone} <br /> <br />
       <b> מייל: </b> {props.email}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">סגור</Button>
      </Modal.Footer>
    </Modal>
  );
}