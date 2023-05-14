import {
  SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import { encodeAbiParameters } from "viem";
import { useAccount } from "wagmi";
import React, { useState, ReactNode } from "react";
const ASK_LENS_APP_ID = "0x639312ba6099cd3a698a33416a25d345";
const LENS_HANDLE_HOLDER_GROUP_ID = "0x945e9e7b1f95899328bf9c4490aba9fc";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: ASK_LENS_APP_ID,
  devMode: {
    enabled: true,
  },
};
export default function SismoButton({
  cid,
  receiver,
}: {
  cid: any;
  receiver: any;
}) {
  const [_response, setResponseSismo] = useState<any>();

  const signQuestion = (
    questioner: any,
    answerer: string,
    ipfsHash: string
  ) => {
    return encodeAbiParameters(
      [
        { type: "address", name: "questionerAddress" },
        { type: "address", name: "answererAddress" },
        { type: "string", name: "ipfsHash" },
      ],
      [questioner, answerer as `0x${string}`, ipfsHash]
    );
  };

  const setSismoResponse: any = async (
    response: any,
    receiver: string,
    cid: string
  ) => {
    console.log("My friends this is the response:");
    console.log(response, receiver, cid);

    try {
      const res = await fetch("http://localhost:3001/sismo-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response, receiver, cid }),
      });

      const data = await res.json();

      // Handle the response data from the server here
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }

    return response;
  };
  //hardcoded bullshit
  const setResponse = async (response: any) => {
    console.log("My friends this is the response:");
    console.log(response, receiver, cid);
    await setSismoResponse(response, receiver, cid);
    // response byte + cid +
    return response;
  };
  const { address } = useAccount();
  console.log(receiver);
  console.log(typeof receiver); //0x0000000000000000000000000000000000000002
  const answerer = receiver; // Account where we wanna send the question
  const ipfsHash = cid; // IPFS hash of the question
  console.log(ipfsHash, "sismo ipfs hash");
  return (
    <>
      <SismoConnectButton
        // the client config created
        config={sismoConnectConfig}
        // the auth request we want to make
        // here we want the proof of a Sismo Vault ownership from our users
        auths={[{ authType: AuthType.VAULT }]}
        claims={[{ groupId: LENS_HANDLE_HOLDER_GROUP_ID }]}
        // we ask the user to sign a message
        // it will be used onchain to prevent front running
        signature={{ message: signQuestion(address, answerer, ipfsHash) }}
        // onResponseBytes calls a 'setResponse' function
        // with the responseBytes returned by the Sismo Vault
        onResponseBytes={(responseBytes: string) =>
          setResponseSismo(responseBytes)
        }
        // Some text to display on the button
        text={"Log in with Sismo"}
      />
      <button
        onClick={() => {
          console.log("lmao");
          setResponse(_response);
        }}
      >
        Work if sismo
      </button>
    </>
  );
}
