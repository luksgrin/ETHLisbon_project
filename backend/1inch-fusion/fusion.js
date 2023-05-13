import { FusionSDK } from "@1inch/fusion-sdk";

export default async function placeOrder(
  blockchainProvider,
  network,
  fromTokenAddress,
  toTokenAddress,
  amount,
  makerAddress
  //takingFeeBps = 100
) {
  const sdk = new FusionSDK({
    url: "https://fusion.1inch.io",
    network: network, // chainId: 1 for mainnet, 4 for rinkeby
    blockchainProvider, // web3 provider
  });
  const OrderInfo = await sdk.placeOrder({
    fromTokenAddress: fromTokenAddress, //"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    toTokenAddress: toTokenAddress, // "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    amount: amount, // "50000000000000000", // 0.05 ETH
    walletAddress: makerAddress,
    // fee is an optional field
    // fee: {
    //   takingFeeBps: 0, // 1% as we use bps format, 1% is equal to 100bps
    //   takingFeeReceiver: "0x0000000000000000000000000000000000000000", //  fee receiver address
    // },
  });
  console.log(
    `Order: ${OrderInfo.order} \n OrderHash: ${OrderInfo.orderHash} \n QuoteId: ${OrderInfo.quoteId}`
  );
}
