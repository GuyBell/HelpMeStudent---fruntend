import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import "../StyleSheets/Modal.css";

export default function FCModalUpdateSuperProfileImage({
  isOpen,
  CloseModal,
  ImagePath,
  UpdateImage,
}) {
  const [tempImage, setTempImage] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null);
  let altImage = `https://proj.ruppin.ac.il/bgroup92/prod/ImageFiles/ProfileImage-${ImagePath}.jpg`;

  const CleanTempImage = () => {
    setTempImage(null);
    setImageToUpdate(null);
    CloseModal();
  };
  return (
    <Modal show={isOpen}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title className="modalHeader">עדכון תמונת פרופיל</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ModalBody">
          <Form>
            <Form.Group className="d-flex align-items-center flex-column">
              <Image
                className="mb-3"
                style={{ width: 300 }}
                src={tempImage ? tempImage : altImage}
                alt={altImage}
              />
              <Form.Control
                type="file"
                id="formFile"
                // style={{ borderRadius: 25 }}
                onChange={(e) => {
                  setTempImage(URL.createObjectURL(e.target.files[0]));
                  setImageToUpdate(e.target.files[0]);
                }}
                required
              />
              <Button
                className="mt-2 w-50"
                onClick={() => UpdateImage(imageToUpdate)}
              >
                עדכן תמונה
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="divBackToHomePage">
          <Button
            onClick={CleanTempImage}
            className="btnBackToHome"
            variant="success"
          >
            <b>אולי בפעם אחרת</b>
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
