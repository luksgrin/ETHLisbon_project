"use client";

// import React, { useState } from "react";
import { Account } from "../components/Account";
import { Balance } from "../components/Balance";
import { BlockNumber } from "../components/BlockNumber";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { ReadContract } from "../components/ReadContract";
import { ReadContracts } from "../components/ReadContracts";
import { ReadContractsInfinite } from "../components/ReadContractsInfinite";
import { SendTransaction } from "../components/SendTransaction";
import { SendTransactionPrepared } from "../components/SendTransactionPrepared";
import { SignMessage } from "../components/SignMessage";
import { SignTypedData } from "../components/SignTypedData";
import { Token } from "../components/Token";
import { WatchContractEvents } from "../components/WatchContractEvents";
import { WatchPendingTransactions } from "../components/WatchPendingTransactions";
import { WriteContract } from "../components/WriteContract";
import { WriteContractPrepared } from "../components/WriteContractPrepared";

import Alice from "./custom-components/Alice";
import Quevedo from "./custom-components/Quevedo";

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
        return null;
    }
  };

  return (
    <div>
      <h1>Ask Frens</h1>
      <Quevedo></Quevedo>
      <Connect />
      <Connected>
        {/* <button onClick={() => setView("answers")}>My Answers</button> */}
        {/* <button onClick={() => setView("questions")}>My Questions</button> */}
        {/* {renderContent()} */}
      </Connected>
    </div>
  );
};

export default Page;
