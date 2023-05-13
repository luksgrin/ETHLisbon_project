// import {
//   SismoConnectButton,
//   AuthType,
//   SismoConnectClientConfig,
//   SismoConnectResponse,
// } from "@sismo-core/sismo-connect-react";

// export const sismoConnectConfig: SismoConnectClientConfig = {
//   appId: "0x8f347ca31790557391cec39b06f02dc2",
// };
// export default function SismoButton() {
//   return (
//     <SismoConnectButton
//       //You will need to register an appId in the Factory
//       appId={"0x8f347ca31790557391cec39b06f02dc2"}
//       //Request proofs from your users for a groupId
//       claim={{
//         groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a",
//       }}
//       //OR
//       claims={[
//         {
//           groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a",
//         },
//       ]}
//       auth={{
//         authType: AuthType.VAULT,
//       }}
//       //OR
//       auths={[
//         {
//           authType: AuthType.VAULT,
//         },
//       ]}
//       signature={{
//         message: "Your message",
//       }}
//       //After user redirection get a response containing his proofs
//       onResponse={async (response: SismoConnectResponse) => {
//         //Send the response to your server to verify it
//         //thanks to the @sismo-core/sismo-connect-server package
//       }}
//       onResponseBytes={async (bytes: string) => {
//         //Send the response to your contract to verify it
//         //thanks to the @sismo-core/sismo-connect-solidity package
//       }}
//     />
//   );
// }
