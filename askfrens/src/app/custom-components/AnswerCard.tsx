//@ts-ignore
import React, { useState, ReactNode } from "react";
import "./QACards.css";
import DonationModal from "./Donate";

export default function AnswerCard({
  sender,
  receiver,
  answer,
  question,
  date,
}: {
  sender: any;
  receiver: any;
  answer: any;
  question: any;
  date: any;
}) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };
  const getLens = (lens: any) => {
    return "test.lens";
  };
  return (
    <>
      <div className="Card">
        <div className="Card__Header">
          <div className="WrapperImage">
            <img
              className="AvatarImage"
              src="https://user-images.githubusercontent.com/12957692/193897314-e6d265e2-6951-4799-ad29-5bd881e04fc5.svg"
              alt="avatar"
            ></img>
          </div>
          <div className="WrapperAnswer">
            <div>{answer}</div>
            <div>{question}</div>
          </div>
        </div>
        <div className="Card__Content">
          <div className="Card__Footer">
            <div>{sender}</div>
            <div>Written at {date}</div>
            <button
              onClick={() =>
                openModal(
                  <DonationModal
                    closeModal={closeModal}
                    address={sender}
                    lens={getLens(sender)}
                  />
                )
              }
            >
              Donate
            </button>
            {modalContent && (
              <div className="modal">
                <button onClick={closeModal}>Close</button>
                {modalContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
