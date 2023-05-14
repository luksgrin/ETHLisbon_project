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
import Web3 from "web3";
const STATIC_TEST =
  "0x0000000000000000000000000000000000000000000000000000000000000020639312ba6099cd3a698a33416a25d34500000000000000000000000000000000b8e2054f8a912367e38a22ce773328ff000000000000000000000000000000007369736d6f2d636f6e6e6563742d76310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000064defa36cd321a44adddad64414a9060d1d985990000000000000000000000004d62c70facbdb63d55ad03b1b4d483fa0d1af3da0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000003b6261667962656965746e6665337066726a773234616d347a76346d36356a7534727966797872676e786e656d617032746675656963716d65336d34000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c068796472612d73322e310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000004c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000945e9e7b1f95899328bf9c4490aba9fc000000000000000000000000000000006c617465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c00dd23535ffd27a9e60ae56d869a5b2e5242d85e4d0d2f92501cf2897129a174d05402e7364eb686e975d562e5a3da54fedbfa7574ea33b5d1d52b26a255324dd04bd31b1a22affa648e7badc8ce47d7d23e994e876e7e2231ee3b1b4e0d852f11f96c16571aba437023cd8669e729500d1773e89ab516733d1821d51f0ed6e272d3ed15654563277fb1b89baa46725fc7e5d7eda6398acf158e8fed3deabb70f29feba6463c15c08de6e04218eb11e5830b9871c7cd125956376a9281492eb81048e718d390205ac1d03869b117e3cb691fe3df9e94e27843e81f06517509e1027831797ef1eb8e5af5f633accf872c6a8e2d652b29a27217f256442c822c51000000000000000000000000000000000000000000000000000000000000000001b1e95ddc27be7bba33bcfb60965c2abecc66b61c53fd7c0e1b178c57b8f32d72ab71fb864979b71106135acfa84afc1d756cda74f8f258896f896b4864f025630423b4c502f1cd4179a425723bf1e15c843733af2ecdee9aef6a0451ef2db74116e77b5683fc3b477bb267a4cb400794abdd295da5aab486e09b6759affc86f12c068bd387b5d1faf55e91eb14bf8a90ed7d095718fec78e20b7692fc1a6503270539b202824807737b73a9fd9ac304c38d5807d57793fcea067af64359c2ec00000000000000000000000000000000000000000000000000000000000000010331b3227c00a915ffcecb210c27a0e4f3c5bb8c0647ae4c345a1f442ffffffd00000000000000000000000000000000000000000000000000000000000000002f9583cc91989d812dd4ef073fe0afe792d80245f8c1ded7126350082a70319a2cc12b3c7ba9df2a9d56390e915547a4287c81e02dd6b5285938bb1b7c30e29300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a068796472612d73322e310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000004a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012f9583cc91989d812dd4ef073fe0afe792d80245f8c1ded7126350082a70319a00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c00ee68c768d220991459f3f5bed6a8ac81cb003dd62a68b88a4066df2406973b91d8285267f016b579aa5894c5a0a70fa54b179460f2b665b47f036e02d2c03c01b0217166f43ecf0aac3f0caf1ee66dd0638505717781d01ca645c2ff5c38ae62b411440d87906b22954e3a281e45d03deb20b8f5e838dba7946746584626a042ff0d374fce5a3ae9b08cc81d8380327d25bb742029d64e9280046598a34475a1ccd1138dfc670b7d5e694a9ff4d6800db737fc1d9988c4d4a7e3e02e86191e02cc64ff8296c9993f9be45a1a3138cf2c95fd2ae3450293901dcdb3c2d69223621ad9262ab6c2f54d5e345dd41db399fd85516ba48b571db8fe615289ec3ea5800000000000000000000000000000000000000000000000000000000000000001b1e95ddc27be7bba33bcfb60965c2abecc66b61c53fd7c0e1b178c57b8f32d72ab71fb864979b71106135acfa84afc1d756cda74f8f258896f896b4864f025630423b4c502f1cd4179a425723bf1e15c843733af2ecdee9aef6a0451ef2db740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002f9583cc91989d812dd4ef073fe0afe792d80245f8c1ded7126350082a70319a2cc12b3c7ba9df2a9d56390e915547a4287c81e02dd6b5285938bb1b7c30e293000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
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
  var web3: any;
  const checkReceiver = (receiver: any) => {
    if (receiver.length === 42) return receiver;
    console.log(
      "receiver has no good address length, returning by default 0x0000000000000000000000000000000000000002"
    );
    return "0x0000000000000000000000000000000000000002"; //should not happen when working fine, just not to crash
  };
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
    let newReceiver = checkReceiver(receiver);
    try {
      const res = await fetch("http://localhost:3001/sismo-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response, newReceiver, cid }),
      });

      const data = await res.json();

      // Handle the response data from the server here
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }

    return response;
  };

  const getMetaTransaction: any = async (
    receiver: string,
    cid: string,
    bytesData: string // Assuming bytes data is passed as a hex string
  ) => {
    // This is the data you want to sign.
    const data = web3.eth.abi.encodeParameters(
      ["address", "string", "bytes"],
      [receiver, cid, bytesData]
    );
    var window;
    // Create the signature
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const signature = await web3.eth.personal.sign(data, account, ""); // Replace 'test password' with the actual password if necessary
    let newReceiver = checkReceiver(receiver);
    try {
      const res = await fetch("http://localhost:3001/sismo-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response: signature,
          newReceiver,
          cid,
          bytesData,
        }),
      });

      const resultData = await res.json();

      // Handle the response data from the server here
      console.log(resultData);
    } catch (error) {
      console.error("Error:", error);
    }

    return signature;
  };

  //hardcoded bullshit
  const setResponse = async (response: any) => {
    console.log("My friends this is the response:");
    console.log(response, receiver, cid);
    await getMetaTransaction(response, receiver, cid);
    // response byte + cid +
    return response;
  };
  const { address } = useAccount();
  console.log(receiver);
  console.log(typeof receiver); //0x0000000000000000000000000000000000000002
  let newReceiver = checkReceiver(receiver);
  const answerer = newReceiver; // Account where we wanna send the question
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
        className="ButtonIfWorks"
        onClick={() => {
          console.log("Mint nfts");
          setResponse(_response);
          // setResponse(STATIC_TEST);
        }}
      >
        Click if sismo worked
      </button>
    </>
  );
}
