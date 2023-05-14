//@ts-ignore
import QuestionCard from "./QuestionCard";
import "./Actors.css";
import React, { useState, useEffect } from "react";
export default function RootLayout({
  sender,
  receiver,
}: {
  sender: any;
  receiver: string;
}) {
  const [privateState, setPrivateState] = useState(false);
  const togglePrivateState = () => setPrivateState(!privateState);

  const cids = [
    "bafybeidmtyxkghze3gsirlm6l4ydfb4hvvvk3o2bsrz7fivohlggufeiyu",
    "bafybeigw3mjlxfwk6o2vudilg6cbj547zaipuyvwpumxk6dcf25phuunxa",
    "bafybeibsoednknhtnqkrepk5tuolgpejl2xbv2smlpip4ovrxsgnjbs5vy",
    "bafybeifwh2bgj4d5xxtdrnjfwkpcooevqxtodgrxkrsgx342s4oyrc2epq",
    "bafybeianvapgaj53b3wtgkbwmtmxa4nzptboffsbatdzem2djbiklkdvfe",
    "bafybeibpk4ll3ez7b7vcn3vls4ervucar5svsapaiwoflqojmiv4c3enras",
  ];
  const [questionData, setQuestionData] = useState([]);
  //code for lens
  const [profileData, setProfileData] = useState(null);
  // Custom functions to fetch profile data by address and handle
  const fetchProfileDataByAddress = (address: any) => {
    return fetch(`http://localhost:3001/profile-data/${address}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };
  // should be sender outside of testing
  fetchProfileDataByAddress(receiver).then((data) => setProfileData(data));

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = cids.map(async (cid) => {
        const res = await fetch(`http://localhost:3001/read/${cid}`);
        const content = await res.json();
        return content;
      });

      const allData = await Promise.all(dataPromises);
      setQuestionData(allData);
    };

    fetchData();
  }, []);

  return (
    <div className={`Main__Content ${privateState ? "Private" : ""}`}>
      <div className="Card__User Background1">
        <div className="Avatar__Container">
          <img
            className="Card__UserAvatar"
            src={profileData ? profileData.pictureUrl : ""}
            alt="avatar"
          />
        </div>
        <div className="Card__UserDescription">
          {profileData ? profileData.bio : "Brief description example "}
        </div>
      </div>

      <div className="Questions__DisplayContent">
        {questionData.map((item, index) => (
          <QuestionCard
            key={index}
            sender={item.sender}
            receiver={item.receiver}
            question={item.question}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
