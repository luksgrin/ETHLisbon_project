"use client";
import React, { useState } from "react";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import SismoButton from "./custom-components/SismoButton";
import Alice from "./custom-components/Alice";
import Quevedo from "./custom-components/Quevedo";
import "./general.css";
import "./page.css";

const Page: React.FC = () => {
  const [view, setView] = useState<string>("answers");
  const [search, setSearch] = useState<string>("");

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
      <header className="header">
        <h1>Ask Frens</h1>
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="buttons">
          <SismoButton />
          <Connect />
        </div>
      </header>
      <Connected>
        <button onClick={() => setView("answers")}>My Answers</button>
        <button onClick={() => setView("questions")}>My Questions</button>
        {renderContent()}
      </Connected>
    </div>
  );
};

export default Page;
