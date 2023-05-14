//@ts-ignore
import React, { useState, useEffect } from "react";

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

  const cids = [
    "bafybeig35gz2s7k6qjmfxk7onmtsg2rvurxp4h4dnrbokl5doqillpjkme",
    "bafybeigsp4yac4pchbqjly7bcjafthenfxvfkrb3x6g7m7qxunlhil7fda",
    "bafybeiat6kboodlvocjgggtnvaoyl2jj5db5udv4uanjxmkrjhk4bpcpqu",
  ];
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = cids.map(async (cid) => {
        const res = await fetch(`http://localhost:3001/read/${cid}`);
        const content = await res.json();
        return content;
      });
      const allData = await Promise.all(dataPromises);
      console.log(allData);
      setQuestionData(allData);
    };

    fetchData();
  }, []);

  //code for lens
  const [profileData, setProfileData] = useState(null);
  const [profileDataByHandle, setProfileDataByHandle] = useState(null);
  // Custom functions to fetch profile data by address and handle
  const fetchProfileDataByAddress = (address: any) => {
    return fetch(`http://localhost:3001/profile-data/${address}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  const fetchProfileDataByHandle = (handle: any) => {
    return fetch(`http://localhost:3001/profile-handle/${handle}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  const createQuestion = () => {
    console.log("QuestionCreated");
    var isoDateString = new Date().toISOString();
    storeIPFS(sender, receiver, question, isoDateString);
  };

  const feedQuestionAnswer = () => {
    var add = "0xf12d31b798db234c55d9b50c3854f99db6bddaea";
    var receiver = "0xa322bD417154D04d5704952E550288f0f91044Bd";
    var question = "How are you doing on foundry?";
    var answer =
      "ine thanks, worth the time to learn it, easy to use the fuzzing feature";
    var isoDateString = new Date().toISOString();
    storeIPFS2(sender, receiver, answer, question, isoDateString);
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

  // store question + answer
  const storeIPFS2 = async (
    sender: any,
    receiver: any,
    question: any,
    answer: any,
    date: any
  ) => {
    const data = { sender, receiver, question, date, answer };

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

  // feedQuestionAnswer();

  return (
    <div className={`Main__Content ${privateState ? "Private" : ""}`}>
      <div className="Card__User Background1">
        <button className="PrivateButton" onClick={togglePrivateState}>
          {privateState ? "Public" : "Private"}
        </button>
        <div className="Avatar__Container">
          <img
            className="Card__UserAvatar"
            src={profileData ? profileData.pictureUrl : ""}
            alt="avatar"
          />
        </div>
        <div className="Card__UserDescription">
          {profileData ? profileData.bio : "Lorem "}
          Lorem ipsim description Address:
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
            <SismoButton cid={_cid} receiver={receiver} />
            {/* SismoButton will only render when sismo state is true */}
          </div>
        </div>
      </div>

      <div className="Questions__DisplayContent">
        {questionData.map((item, index) => (
          <QuestionCard
            key={index}
            sender={item.sender}
            receiver={item.receiver}
            question={item.question}
            answer={item.answer}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
