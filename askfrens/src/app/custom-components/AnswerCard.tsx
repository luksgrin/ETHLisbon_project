//@ts-ignore
import React, { useState, ReactNode } from "react";
import "./QACards.css";
import DonationModal from "./Donate";

export default function AnswerCard({}: {}) {
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
    <>
      <div className="Card">
        <div className="Card__Header">
          <div className="WrapperImage">
            <img className="AvatarImage" src="avatar" alt="avatar"></img>
          </div>
          Question default title
        </div>
        <div className="Card__Content">
          <div className="Card__Footer">
            <div>UserName</div>
            <div>Text time</div>
            <button>Donate</button>
            <button>Solve</button>
          </div>
          <button
            onClick={() => openModal(<DonationModal closeModal={closeModal} />)}
          >
            Donate
          </button>
          ;
          {modalContent && (
            <div className="modal">
              <button onClick={closeModal}>Close</button>
              {modalContent}
            </div>
          )}
          <button>Solve</button>
        </div>
      </div>
    </>
  );
}
