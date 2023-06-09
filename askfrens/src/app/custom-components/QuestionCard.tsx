//@ts-ignore
import React, { useState, ReactNode } from "react";
import "./QACards.css";
import DonationModal from "./Donate";

export default function QuestionCard({
  sender,
  receiver,
  question,
  date,
}: {
  sender: any;
  receiver: any;
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

  const getLens = () => {
    return "test.lens";
  };

  return (
    <>
      <div className="Card">
        <div className="Card__Header">
          <div className="WrapperImage">
            <img
              className="AvatarImage"
              src="data:image/png;base64,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"
              alt="avatar"
            ></img>
          </div>
          {question}
        </div>
        <div className="Card__Content">
          <div className="Card__Text">
            <input
              className="Card__Textarea"
              placeholder="Solve this question"
            />
          </div>
          <div className="Card__Footer">
            <div>{sender}</div>
            <div>Written at {date}</div>
            <button
              onClick={() =>
                openModal(
                  <DonationModal
                    address={sender}
                    lens={getLens(sender)}
                    closeModal={closeModal}
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
            <button>Solve</button>
          </div>
        </div>
      </div>
    </>
  );
}
