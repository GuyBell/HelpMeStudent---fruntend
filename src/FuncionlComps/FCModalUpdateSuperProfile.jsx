import React from 'react';
import {Modal,Button } from 'react-bootstrap';
import { FcOk } from "react-icons/fc";
import "../StyleSheets/Modal.css";

function FCModalUpdateSuperProfile({Description,modalOpen,BackToHomePage}) {
  return (
    <Modal show={modalOpen}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>עריכת פרופיל התבצעה בהצלחה</Modal.Title>
        </Modal.Header>

        <Modal.Body className='ModalBody' >
          <div>
            <h2>
              <FcOk className='iconModal'></FcOk>
            </h2>
          </div>
          <hr />
          <h3>:תיאור</h3>
          <p>{Description}</p>
        </Modal.Body>

        <Modal.Footer className='divBackToHomePage'>
          <Button onClick={BackToHomePage} className='btnBackToHome' variant="success"><b>חזור לדף הבית</b></Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default FCModalUpdateSuperProfile