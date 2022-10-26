import React from "react";
import { AiFillStar } from "react-icons/ai";

export default function FCStarsToReturn({ numbersOfStars }) {
  // let stars = "";
  // // const numOfStars
  // if (numbersOfStars !== undefined) {
  //   stars = "";
  //   for (let index = 0; index < { numbersOfStars }; index++) {
  //     stars += <p>h</p>
  //   }
  // }else{
  //   <div></div>
  //  }

  // return (
  //   <div>
  //     {numbersOfStars !== undefined ?
  //       <>
  //         {stars}
  //       </>
  //       : ""}
  //   </div>
  // )

  switch (numbersOfStars) {
    case 1:
      return <AiFillStar />;
    case 2:
      return (
        <div className="d-flex">
          <AiFillStar />
          <AiFillStar />
        </div>
      );
    case 3:
      return (
        <div className="d-flex">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      );
    case 4:
      return (
        <div className="d-flex">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      );
    case 5:
      return (
        <div className="d-flex">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      );

    default:
      return "";
  }
}
