import React, { useState } from "react";
import "./Donate.css";

export default function DonationModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  const handleClickInside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="DonationModal__Overlay" onClick={handleClickOutside}>
      <div className="DonationModal" onClick={handleClickInside}>
        <button className="DonationModal__CloseButton" onClick={closeModal}>
          &times; {/* or use an icon */}
        </button>

        <div className="DonationModal__Left">
          <h2>Title</h2>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            {/* Add your tokens here */}
            <option value="rrusd">RRUSD</option>
            <option value="gho">GHO</option>
            <option value="apecoin">APE</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="DonationModal__Right">
          <h2>Donation Details</h2>
          <p>Address: {/* Display address here */}</p>
          <p>Lens Name: {/* Display lens name here */}</p>

          <div className="DonationModal__Buttons">
            <button>ZkBob Donate</button>
            <button>SafeFiat Donate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
