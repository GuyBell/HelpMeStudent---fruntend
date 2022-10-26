import { React, useState } from "react";
import FCLoginForm from "../FuncionlComps/FCLoginForm";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FCLoginPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const Navigate = useNavigate();

  const UpdateEmail = (e) => {
    let NewEmail = e.target.value;
    setEmail(NewEmail);
  };

  const UpdatePassword = (e) => {
    let NewPassword = e.target.value;
    setPassword(NewPassword);
  };

  const VerifyUser = () => {
    const Url = "https://proj.ruppin.ac.il/bgroup92/prod/login/PostFindUser";
    const user = {
      Email: Email,
      Password: Password,
    };
    //console.log(user);
    fetch(Url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.status", res.status);
        //console.log("res.ok", res.ok);
        if (res.ok) {
          PutDetailsToLocalStorage(user);
        }
        return res.json();
      })
      .then(
        (TypeOfUser) => {
          //console.log(TypeOfUser);
          CheckTypeUser(TypeOfUser);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  };

  const PutDetailsToLocalStorage = (userDetails) => {
    if (localStorage.getItem("user") !== undefined) {
      localStorage.removeItem("user");
    }
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const MassegeErrorLogin = () => {
    document.getElementById("errMsgLogin").style.display = "block";
  };

  const CheckTypeUser = (TypeOfUser) => {
    const UserDetails = {
      Email: Email,
      Password: Password,
    };
    if (TypeOfUser === "student") {
      Navigate("/studentHomePage", { state: UserDetails });
    } else if (TypeOfUser === "superStudent") {
      Navigate("/SuperHomePage", { state: UserDetails });
    } else if (TypeOfUser === "admin") {
      Navigate("/adminHomePage", { state: UserDetails });
    } else {
      //console.log("not found");
      MassegeErrorLogin();
    }
  };

  const navigateToRegister = () => {
    Navigate("/typeOfUser");
  };
  const navigateToChangePassword = () => {
    Navigate("/changePasswordPage");
  };

  return (
    <FCLoginForm
      UpdateEmail={UpdateEmail}
      UpdatePassword={UpdatePassword}
      VerifyUser={() => { VerifyUser() }}
      navigateToRegister={navigateToRegister}
      navigateToChangePassword={navigateToChangePassword}
    />
  );
}
