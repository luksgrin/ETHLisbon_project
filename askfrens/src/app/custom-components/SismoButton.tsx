import {
  SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x639312ba6099cd3a698a33416a25d345",
  devMode: {
    enabled: true,
  },

  //   bytes16 APP_ID = 0x639312ba6099cd3a698a33416a25d345;
  // bytes16 GROUP_ID = 0x945e9e7b1f95899328bf9c4490aba9fc;
};
export default function SismoButton() {
  //hardcoded bullshit
  const signMessage = (account: any) => {
    return account;
  };
  const setResponse = (response: any) => {
    return response;
  };
  const account = "hardcoded_account";
  return (
    <>
      <SismoConnectButton
        // the client config created
        config={sismoConnectConfig}
        // the auth request we want to make
        // here we want the proof of a Sismo Vault ownership from our users
        auths={[{ authType: AuthType.VAULT }]}
        // we ask the user to sign a message
        // it will be used onchain to prevent front running
        signature={{ message: signMessage(account) }}
        // onResponseBytes calls a 'setResponse' function
        // with the responseBytes returned by the Sismo Vault
        onResponseBytes={(responseBytes: string) => setResponse(responseBytes)}
        // Some text to display on the button
        text={"Claim with Sismo"}
      />
    </>
  );
}
