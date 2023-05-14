//@ts-ignore
import React, { useState, ReactNode } from "react";
import QuestionCard from "./AnswerCard";
import "./Actors.css";
import SismoButton from "./SismoButtonQuestion";

export default function Alice({
  sender,
  receiver,
}: {
  sender: any;
  receiver: string;
}) {
  const [privateState, setPrivateState] = useState(false);
  const [sismo, setSismo] = useState(false);
  const [_cid, setCid] = useState("");
  const togglePrivateState = () => setPrivateState(!privateState);

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const [question, setQuestion] = useState<string>("");

  const createQuestion = () => {
    console.log("QuestionCreated");
    var isoDateString = new Date().toISOString();
    storeIPFS(sender, receiver, question, isoDateString);
  };

  const storeIPFS = async (
    sender: any,
    receiver: any,
    question: any,
    date: any
  ) => {
    const data = { sender, receiver, question, date };
    console.log(data);
    try {
      const response = await fetch("http://localhost:3001/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { cid } = await response.json();
        console.log(`Stored file with CID: ${cid}`);
        setSismo(true);
        setCid(String(cid));
      } else {
        console.error("Failed to store file");
      }
    } catch (err) {
      console.error(`Failed to store file: ${err}`);
    }
  };

  return (
    <div className={`Main__Content ${privateState ? "Private" : ""}`}>
      <div className="Card__User Background1">
        <button className="PrivateButton" onClick={togglePrivateState}>
          {privateState ? "Public" : "Private"}
        </button>
        <div className="Avatar__Container">
          <img className="Card__UserAvatar" src="avatar" alt="avatar" />
        </div>
        <div className="Card__UserDescription">
          Lorem ipsim description
          {/* brief description under avatar image */}
        </div>
        <div className="AskMe">
          <label htmlFor="question">Ask me:</label>
          <div className="Form">
            <input
              type="text"
              id="question"
              name="question"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={() => createQuestion()}>Submit</button>
            {sismo ? "Ready" : "Not ready to sismo"}
            <SismoButton cid={_cid} receiver={receiver} />{" "}
            {/* SismoButton will only render when sismo state is true */}
          </div>
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
