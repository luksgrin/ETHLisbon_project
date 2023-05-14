// // "use client";
// // import { GetServerSideProps } from "next";
// // // import "./shim";
// // import { Connect } from "../../components/Connect";
// // import { Connected } from "../../components/Connected";

// // import Alice from "../custom-components/Alice";
// // import Quevedo from "../custom-components/Quevedo";
// // import SismoButton from "../custom-components/SismoButton";

// // import React, { useState } from "react";
// // import "./general.css";
// // interface AnswerPageProps {
// //   answer: string;
// // }

// // export default function AnswerPage({ answer }: AnswerPageProps) {
// //   return (
// //     <div>
// //       <h1>Answer</h1>
// //       <p>{answer}</p>
// //     </div>
// //   );
// // }

// // // // Storing data
// // // async function storeData(data) {
// // //   const response = await fetch("http://localhost:3000/store", {
// // //     method: "POST",
// // //     headers: {
// // //       "Content-Type": "application/json",
// // //     },
// // //     body: JSON.stringify(data),
// // //   });

// // //   if (!response.ok) {
// // //     throw new Error(`Failed to store data: ${response.statusText}`);
// // //   }

// // //   const { cid } = await response.json();
// // //   return cid;
// // // }

// // // // Retrieving data
// // // async function readData(cid) {
// // //   const response = await fetch(`http://localhost:3000/read/${cid}`);

// // //   if (!response.ok) {
// // //     throw new Error(`Failed to read data: ${response.statusText}`);
// // //   }

// // //   const data = await response.json();
// // //   return data;
// // // }

// "use client";
// // import "./shim";
// import { Connect } from "../components/Connect";
// import { Connected } from "../components/Connected";

// import Alice from "./custom-components/Alice";
// import Quevedo from "./custom-components/Quevedo";
// import SismoButton from "./custom-components/SismoButton";
// import "./general.css";
// // import all other components...

// import React, { useState } from "react";

// import React from "react";
// import { useParams } from "react-router-dom";

// const SomeStringPage: React.FC = () => {
//   const { someString } = useParams<{ someString: string }>();

//   return (
//     <div>
//       You're on the page: {someString}
//     </div>
//   );
// };

// export default SomeStringPage;

// const Page: React.FC = () => {
//   const [view, setView] = useState<string>("answers");

//   const renderContent = () => {
//     switch (view) {
//       case "answers":
//         return <Alice />; // replace with your answer related components
//       case "questions":
//         return <Quevedo />; // replace with your question related components
//       default:
//         return <Alice />;
//     }
//   };

//   return (
//     <div>
//       <h1>Ask Frens</h1>
//       <SismoButton></SismoButton>
//       <Connect />
//       <Connected>
//         <button onClick={() => setView("answers")}>My Answers</button>
//         <button onClick={() => setView("questions")}>My Questions</button>
//         {renderContent()}
//       </Connected>
//     </div>
//   );
// };

// export default Page;
