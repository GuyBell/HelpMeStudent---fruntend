import React, { useState, useEffect } from "react";
import FCTagsRequestTable from "../FuncionlComps/FCTagsRequestTable";
export default function FCTgasRequestPage() {

  const [tagsRequests, setTagsRequests] = useState([]);
  let newId = 0

  useEffect(() => {
    const TagsRequestsUrl =
      "https://proj.ruppin.ac.il/bgroup92/prod/tagRequest/getAll";
    fetch(TagsRequestsUrl, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        //console.log("res=", res);
        //console.log("res.status", res.status);
        //console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          //console.log("fetch Get Tags Requests= ", result);
          result.map(r => {
            r.TagRequestNum = newId
            newId++
            return r
          })
          setTagsRequests(result);
        },
        (error) => {
          //console.log("err post=", error);
        }
      );
  }, []);
  
  return (
    <div>
      <h3 style={{textAlign: "center", padding:"20px", marginTop: 150}}>דף בקשות של תגיות חדשות</h3>
      <FCTagsRequestTable tagsRequestArr={tagsRequests}/>
    </div>
  )
}