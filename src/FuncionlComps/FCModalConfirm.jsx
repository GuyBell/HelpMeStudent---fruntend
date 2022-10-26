import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FcOk } from "react-icons/fc";
import "../StyleSheets/Modal.css";

function FCModalConfirm({
  BackToHomePage,
  modalOpen,
  ClassDetailsForModal,
  text,
}) {
  return (
    <Modal show={modalOpen}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title className="modalHeader">{text}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="ModalBody">
          <div>
            <h2>
              <FcOk className="iconModal"></FcOk>
            </h2>
          </div>
          <hr />
          <h3 className="modalHeader">:פרטי השיעור</h3>
          <p>
            <b>נושא: </b> {ClassDetailsForModal.className}
          </p>

          <p>
            <b>תאריך: </b>
            {new Date(ClassDetailsForModal.classDate).toLocaleDateString(
              "en-GB"
            )}{" "}
          </p>

          <p>
            <b>שעת התחלה: </b>
            {ClassDetailsForModal.classStartTime}{" "}
          </p>

          <p>
            <b>שעת סיום: </b>
            {ClassDetailsForModal.classEndTime}{" "}
          </p>

          <p>
            <b>פרטני/קבוצתי: </b>
            {ClassDetailsForModal.classParticipants > 1 ? (
              <span>קבוצתי</span>
            ) : (
              <span>פרטני</span>
            )}
          </p>
        </Modal.Body>

        <Modal.Footer className="divBackToHomePage">
          <Button
            className="btnBackToHome"
            onClick={BackToHomePage}
            variant="success"
          >
            <b>חזור לדף הבית</b>
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default FCModalConfirm;
