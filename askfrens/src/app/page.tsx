"use client";
import React, { useState } from "react";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import Alice from "./custom-components/Alice";
import Quevedo from "./custom-components/Quevedo";
import SismoButton from "./custom-components/SismoButtonQuestion";
import SismoButton2 from "./custom-components/SismoButtonAnswer";
import "./general.css";
import "./page.css";
import { useAccount } from "wagmi";
const Page: React.FC = () => {
  const [view, setView] = useState<string>("answers");
  const [search, setSearch] = useState<string>("");
  const [searchedAddress, setSearched] = useState<string>("");
  const { address } = useAccount();

  const renderContent = () => {
    switch (view) {
      case "answers":
        return <Alice receiver={searchedAddress} sender={address} />;
      case "questions":
        return <Quevedo receiver={searchedAddress} sender={address} />;
      default:
        return <Alice receiver={searchedAddress} sender={address} />;
    }
  };

  const lookForFrens = () => {
    if (search.length === 42) {
      console.log("ASDASDJKL", search);
      setSearched(search);
      setView("answers");
    } else
      console.log(
        "Not good length, try",
        "0x0000000000000000000000000000000000000002"
      );
  };

  return (
    <div className="AskFrens__MainPage">
      <header className="header">
        <div className="Header__Main">
          <h1>Ask Frens</h1>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => lookForFrens()}>Look For Frens</button>
        </div>
        <div className="Connect__Buttons buttons ">
          <Connect />
        </div>
      </header>
      <Connected>
        <div className="Options__Container">
          <button onClick={() => setView("answers")}>My Answers</button>
          <button onClick={() => setView("questions")}>My Questions</button>
        </div>
        {/* <SismoButton /> */}
        <div className="Rendered__Content">{renderContent()}</div>
      </Connected>
    </div>
  );
};

export default Page;
