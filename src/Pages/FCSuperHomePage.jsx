import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FCFormSuperDetails from "../FuncionlComps/FCFormSuperDetails";
import { Container } from "react-bootstrap";
import FCButtonsForSuperHomePage from "../FuncionlComps/FCButtonsForSuperHomePage";
import LogoComponent from "../Elements/LogoComponent";
import FCBurgerComp from "../FuncionlComps/FCBurgerComp";
import FCModalUpdateSuperProfileImage from "../FuncionlComps/FCModalUpdateSuperProfileImage";
import FCModalDeleteImage from "../FuncionlComps/FCModalDeleteImage";

export default function FCSuperHomePage() {
  const { state } = useLocation();
  const UserDetails = state;

  const [superDetails, setSuperDetails] = useState({});
  const [classHistory, setClassHistory] = useState([]);
  const [classFutre, setClassFutre] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [renderAgain, setRenderAgain] = useState(null);
  const [isOpenDeleteImage, SetIsOpenDeleteImage] = useState(false);

  useEffect(() => {
    //console.log(UserDetails);
    const urlGetSuperDetails =
      "https://proj.ruppin.ac.il/bgroup92/prod/SuperStudent/GetSuperLandingPageDetails";
    fetch(urlGetSuperDetails, {
      method: "POST",
      body: JSON.stringify(UserDetails),
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
          //console.log("FETCH PostRequest= ", result);
          setSuperDetails({
            StudentId: result.StudentId,
            FullName: result.FullName,
            ImagePath: result.ImagePath,
            Description: result.Description,
            DepartmentName: result.DepartmentName,
            StudyYear: result.StudyYear,
            NumOfRanks: result.NumOfRanks,
            RankAverage: result.RankAverage,
            NumOfClass: result.ClassesHistory.length,
          });
          setClassHistory(result.ClassesHistory);
          setClassFutre(result.FutreClasses);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, [renderAgain]);

  const userDetailsWithId = {
    Email: UserDetails.Email,
    Password: UserDetails.Password,
    StudentId: superDetails.StudentId,
  };
  const ShowModal = () => {
    setIsOpen(true);
  };
  const CloseModal = () => {
    setIsOpen(false);
  };
  const UpdateImage = (newFileToUpload) => {
    //UrlApi
    const urlApi = "https://proj.ruppin.ac.il/bgroup92/prod/Files/UpdateImage";
    //Name Of image.
    const imageName = "ProfileImage-" + superDetails.StudentId + ".jpg";
    //Image file
    const file = newFileToUpload;
    //Type of file.need to be-{image/jpeg}
    const fileType = newFileToUpload.type;
    if (fileType === "image/jpeg") {
      //console.log("this is image/jpeg !! continue");
      //Create FormData.
      const formData = new FormData();
      formData.append(imageName, file);
      //Fetch
      fetch(urlApi, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) //console.log("Success");
          //setRenderAgain for activate useEffect.
          setIsOpen(false);
          setRenderAgain(file);
        })
        .then(
          (result) => {
            //console.log("Result =>" + result);
          },
          (error) => {
            //console.log("Error!!! " + error);
          }
        );
    } else {
      //console.log("this is not image/jpeg");
    }
  };
  const CloseModalDelete = () => {
    SetIsOpenDeleteImage(false);
  }
  const ShowModalDelete = () => {
    SetIsOpenDeleteImage(true);
  }
  const DeleteImage = () => {   
    //Student id for delete image.
    const superId = superDetails.StudentId;
    //UrlApi
    const urlApi = `https://proj.ruppin.ac.il/bgroup92/prod/Files/DeleteImage/${superId}`;
    fetch(urlApi, {
      method: "PUT",
    }).then((response) => {
      if (response.ok) {
        //console.log("Success");
        CloseModalDelete();
        setRenderAgain('renderAgain!');
      }
    }).then((result) => {
      //console.log("Result =>" + result);
    }, (error) => {
      //console.log("Error!!! " + error);
    });
  }

  return (
    <>
      {superDetails !== undefined ? (
        <Container className="d-flex align-items-center justify-content-center flex-column">
          <LogoComponent />
          <FCModalUpdateSuperProfileImage
            isOpen={isOpen}
            CloseModal={CloseModal}
            ImagePath={superDetails.ImagePath}
            UpdateImage={UpdateImage}
          />
          <FCModalDeleteImage
            modalOpen={isOpenDeleteImage}
            CloseModalDelete={CloseModalDelete}
            DeleteImage={DeleteImage}
          />
          <FCBurgerComp userDetails={userDetailsWithId} type="super" />
          <FCFormSuperDetails
            ShowModal={ShowModal}
            ShowModalDelete={ShowModalDelete}
            superDetails={superDetails}
          />
          <FCButtonsForSuperHomePage
            DepartmentName={superDetails.DepartmentName}
            Description={superDetails.Description}
            StudyYear={superDetails.StudyYear}
            UserDetails={userDetailsWithId}
            superName={superDetails.FullName}
            HistoryClass={classHistory}
            FutreClass={classFutre}
          />
        </Container>
      ) : (
        ""
      )}
    </>
  );
}
