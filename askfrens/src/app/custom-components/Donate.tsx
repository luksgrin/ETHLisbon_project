import React, { useState } from "react";
import { parseEther } from 'viem'

import { 
  useSendTransaction,
  useWaitForTransaction
 } from 'wagmi'

import "./Donate.css";


export default function DonationModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  // use our RRUSD stablecoint by default
  const [selectedToken, setSelectedToken] = useState<string>("0xC516EA1e64C8000a1F623C4d8cc1E841EC2e7994");
  const [amount, setAmount] = useState<any>(0);

  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  const handleClickInside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
    
  const { data, error, isLoading, isError, sendTransaction } = useSendTransaction()

  const handleUserInput = () => {
    var selected_amount = amount;
    var selected_token = selectedToken;

    console.log("token: ", selected_token)
<<<<<<< HEAD
=======
    // if()

>>>>>>> bafdb5f (a)
    sendTransaction({
      //chainId: 80001,
      to: selected_token,
      value: parseEther(selected_amount.toString()),
    })
  }


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
            onChange={(e) => { 
              setSelectedToken(e.target.value); 
              //console.log('aa')  
            } 
            }
          >
            {/* Add your tokens here */}
            <option value="0xC516EA1e64C8000a1F623C4d8cc1E841EC2e7994">RRUSD</option>
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
            <button onClick={handleUserInput}>Donate</button>
            {/* <button onClick={handleUserInput}> Donate</button>
            <button>SafeFiat Donate</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
