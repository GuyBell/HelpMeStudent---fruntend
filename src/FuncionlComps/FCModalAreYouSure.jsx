import React from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import "../StyleSheets/Modal.css";

export default function FCModalAreYouSure({
  text,
  isOpen,
  btnFunc,
  modalHide,
  parameter,
}) {
  return (
    <Modal show={isOpen} centered>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title className="modalHeader">{text}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex align-items-center justify-content-evenly">
          <Button
            className="rounded-pill w-25"
            onClick={modalHide}
            variant="danger"
          >
            <b>לא</b>
          </Button>
          <Button
            className="rounded-pill w-25"
            onClick={() => btnFunc(parameter)}
            variant="success"
          >
            <b>כן</b>
          </Button>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}
