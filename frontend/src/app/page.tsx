"use client";
// import "./shim";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";

import Alice from "./custom-components/Alice";
import Quevedo from "./custom-components/Quevedo";
// import SismoButton from "./custom-components/SismoButton";
import "./general.css";
// import all other components...

import React, { useState } from "react";

const Page: React.FC = () => {
  const [view, setView] = useState<string>("answers");

  const renderContent = () => {
    switch (view) {
      case "answers":
        return <Alice />; // replace with your answer related components
      case "questions":
        return <Quevedo />; // replace with your question related components
      default:
        return <Alice />;
    }
  };

  return (
    <div>
      <h1>Ask Frens</h1>
      {/* <SismoButton></SismoButton> */}
      <Connect />
      <Connected>
        <button onClick={() => setView("answers")}>My Answers</button>
        <button onClick={() => setView("questions")}>My Questions</button>
        {renderContent()}
      </Connected>
    </div>
  );
};

export default Page;
