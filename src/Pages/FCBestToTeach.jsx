import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoComponent from "../Elements/LogoComponent";
import { Container } from "react-bootstrap";
import ReturnPageButton from "../Elements/ReturnPageButton";
import FCHotTagsList from "../FuncionlComps/FCHotTagsList";

export default function FCBestToTeach() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userDetails = {
    Email: state.Email,
    Password: state.Password,
    StudentId: state.StudentId,
  };
  const [hotTags, setHotTags] = useState([])

  useEffect(() => {
    const url = `https://proj.ruppin.ac.il/bgroup92/prod/HotTags/GetTop5HotTags`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res.ok", res.ok);
        if (res.ok === false) {
          setHotTags([]);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(
        (result) => {
          //console.log(result);
          setHotTags(result);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, []);


  const returnTags = () => {
    let str = "";
    for (let index = 0; index < hotTags.length; index++) {
      str += hotTags[index].TagName;
    }
    return str;
  }

  return (
    <Container style={{ textAlign: "center", flexDirection: "column", maxWidth: "700px" }} >
      <div>
        <LogoComponent />
        <ReturnPageButton GoTo={() => navigate("/superHomePage", { state: userDetails })} />
        <h1>הנושאים המבוקשים ללימוד על ידי הסטודנטים</h1>
      </ div>
      {hotTags.length !== 0 && hotTags.length !== undefined ? (
        <FCHotTagsList tags={hotTags} />
      ) : ("אין כרגע נושאים מבוקשים במערכת")}
    </Container>
  )
}
