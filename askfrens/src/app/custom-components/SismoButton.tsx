import {
  SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";

const ASK_LENS_APP_ID = "0x639312ba6099cd3a698a33416a25d345";
const LENS_HANDLE_HOLDER_GROUP_ID = "0x945e9e7b1f95899328bf9c4490aba9fc";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: ASK_LENS_APP_ID,
  devMode: {
    enabled: true,
  },

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
        claims={[{ groupId: LENS_HANDLE_HOLDER_GROUP_ID }]}
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
