import {
  SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import { encodeAbiParameters } from "viem";
import { useAccount } from 'wagmi'
const ASK_LENS_APP_ID = "0x639312ba6099cd3a698a33416a25d345";
const LENS_HANDLE_HOLDER_GROUP_ID = "0x945e9e7b1f95899328bf9c4490aba9fc";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: ASK_LENS_APP_ID,
  devMode: {
    enabled: true,
  },

};
export default function SismoButton() {

  const signAnswer = (answerer: any, questioner: string, questionId: any, ipfsHash: string) => {
    return encodeAbiParameters(
      [
        { type: "address", name: "answererAddress" },
        { type: "address", name: "questionerAddress" },
        { type: "uint256", name: "questionId" },
        { type: "string", name: "ipfsHash" },
      ],
      [
        answerer,
        questioner as `0x${string}`,
        questionId,
        ipfsHash
      ]
    );
  };

  //hardcoded bullshit
  const setResponse = (response: any) => {
    console.log("My friends this is the response:");
    console.log(response);
    return response;
  };
  const { address } = useAccount();
  const questioner = "0x0000000000000000000000000000000000000002"; // Account where we wanna send the question
  const ipfsHash = "myIpfsHash"; // IPFS hash of the question
  const questionid = 1; // Question id retrieved from the question
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
        signature={{ message: signAnswer(address, questioner, questionid, ipfsHash) }}
        // onResponseBytes calls a 'setResponse' function
        // with the responseBytes returned by the Sismo Vault
        onResponseBytes={(responseBytes: string) => setResponse(responseBytes)}
        // Some text to display on the button
        text={"Log in with Sismo"}
      />
    </>
  );
}
