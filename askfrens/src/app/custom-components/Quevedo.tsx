//@ts-ignore
import React, { useState, ReactNode } from "react";
import QuestionCard from "./QuestionCard";
import "./Actors.css";

export default function RootLayout({
  sender,
  receiver,
}: {
  sender: any;
  receiver: string;
}) {
  const [privateState, setPrivateState] = useState(false);
  const togglePrivateState = () => setPrivateState(!privateState);

  return (
    <div className={`Main__Content ${privateState ? "Private" : ""}`}>
      <div className="Card__User Background1">
        <button className="PrivateButton" onClick={togglePrivateState}>
          {privateState ? "Public" : "Private"}
        </button>
        <div className="Avatar__Container">
          <img className="Card__UserAvatar" src="avatar" alt="avatar" />
        </div>{" "}
        <div className="Card__UserDescription">
          brief description under avatar image
        </div>
      </div>

      <div className="Questions__DisplayContent">
        {
          // for loop with .
        }
        {/* <QuestionCard></QuestionCard>
        <QuestionCard></QuestionCard>
        <QuestionCard></QuestionCard> */}
      </div>
    </div>
  );
}
