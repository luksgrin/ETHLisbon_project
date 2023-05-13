// "use client";
// import { GetServerSideProps } from "next";
// // import "./shim";
// import { Connect } from "../../components/Connect";
// import { Connected } from "../../components/Connected";

// import Alice from "../custom-components/Alice";
// import Quevedo from "../custom-components/Quevedo";
// import SismoButton from "../custom-components/SismoButton";

// import React, { useState } from "react";
// import "./general.css";
// interface AnswerPageProps {
//   answer: string;
// }

// export default function AnswerPage({ answer }: AnswerPageProps) {
//   return (
//     <div>
//       <h1>Answer</h1>
//       <p>{answer}</p>
//     </div>
//   );
// }

// // // Storing data
// // async function storeData(data) {
// //   const response = await fetch("http://localhost:3000/store", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(data),
// //   });

// //   if (!response.ok) {
// //     throw new Error(`Failed to store data: ${response.statusText}`);
// //   }

// //   const { cid } = await response.json();
// //   return cid;
// // }

// // // Retrieving data
// // async function readData(cid) {
// //   const response = await fetch(`http://localhost:3000/read/${cid}`);

// //   if (!response.ok) {
// //     throw new Error(`Failed to read data: ${response.statusText}`);
// //   }

// //   const data = await response.json();
// //   return data;
// // }
