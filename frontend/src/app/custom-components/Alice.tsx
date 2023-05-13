//@ts-ignore
import React, { useState, ReactNode } from "react";
import QuestionCard from "./AnswerCard";
import "./Actors.css";

export default function AliceLayout({}: {}) {
  const [privateState, setPrivateState] = useState(false);
  const togglePrivateState = () => setPrivateState(!privateState);

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className={`Main__Content ${privateState ? "Private" : ""}`}>
      <div className="Card__User Background1">
        <button className="PrivateButton" onClick={togglePrivateState}>
          {privateState ? "Public" : "Private"}
        </button>
        <img className="Card__UserAvatar" src="avatar" alt="avatar" />
        <div className="Card__UserDescription">
          {/* brief description under avatar image */}
        </div>
        <div className="AskMe">
          <label htmlFor="question">Ask me:</label>
          <input type="text" id="question" name="question" />
        </div>
      </div>

      <div className="Questions__DisplayContent">
        {
          // for loop with .
        }
        <QuestionCard></QuestionCard>
        <QuestionCard></QuestionCard>
        <QuestionCard></QuestionCard>
      </div>
    </div>
  );
}
