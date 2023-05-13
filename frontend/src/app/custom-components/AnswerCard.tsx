//@ts-ignore
import React, { useState, ReactNode } from "react";
import "./QACards.css";

export default function AnswerCard({}: {}) {
  return (
    <>
      <div className="Card">
        <div className="Card__Header">
          <div className="WrapperImage">
            <img className="AvatarImage" src="avatar" alt="avatar"></img>
          </div>
          Question default title
        </div>
        <div className="Card__Content">
          <div className="Card__Text">default text of an amazing question</div>
          <div className="Card__Footer">
            <div>UserName</div>
            <div>Text time</div>
            <button>Donate</button>
            <button>Solve</button>
          </div>
        </div>
      </div>
    </>
  );
}
