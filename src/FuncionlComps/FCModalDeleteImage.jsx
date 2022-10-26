import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FcCheckmark, FcCancel } from "react-icons/fc";
import "../StyleSheets/Modal.css";

export default function FCModalDeleteImage({ modalOpen, CloseModalDelete,DeleteImage }) {
  return (
    <Modal show={modalOpen}
    size={'md'}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>מחיקת תמונת פרופיל</Modal.Title>
        </Modal.Header>

        <Modal.Body className='ModalBody'  >
          <b><p>?האם אתה בטוח</p></b>
          <Row>
            <Col xs={6}>
              <FcCheckmark
              onClick={DeleteImage}
                style={{
                  width: 45,
                  height: 45,
                  background: "white",
                  borderRadius: 50,
                  marginRight:30
                }}
              >
              </FcCheckmark>
            </Col>
            <Col xs={6}>
              <FcCancel
              onClick={CloseModalDelete}
                style={{
                  width: 45,
                  height: 45,
                  background: "white",
                  borderRadius: 50,
                  marginRight:30
                }}
              >
              </FcCancel>
            </Col>
          </Row>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  )
}
