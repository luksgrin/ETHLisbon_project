# **AskLens**: ask your frens!
>_A decentralized social media platform to ask questions and getting answers_

![AskLens_logo](./img/AskLens_logo.png)

_This project was built during the ETH Global Lisbon Hackathon held in Lisbon from May 12-14 2023._

AskLens is a social media platform where users can ask questions and get answers from other users. The platform is built on top of the [**Lens Social Graph**](https://www.lens.xyz/), employs [**Sismo Connect**](https://www.sismo.io/) as its SSO and it's integrated with other DeFi protocols to allow users to donate to other users and to trade their donations.

## Some screenshots!
- Social media questions, technical, influencers... Just enjoy being able to ask people you enjoy talking with or you just respect!

![image](https://i.ibb.co/VDs6xwR/main.png)

- Just for Lens users

![image2](https://i.ibb.co/84LpwS3/milady.png)

- Zk verification of being a Len user via Sismo

![image3](https://i.ibb.co/FYq3147/Only-Lens-User-Powered-BY-sismo.png)

- Donation to good questions or answers!

![image4](https://i.ibb.co/2sHrZYF/Responder-Preguntas-YDonar.png)

## Lets GO Technical!

![Asking and answering questions!](./img/askingQuestions.png)

---

### Sismo Connect utility

Users log in into AskLens via Sismo Connect, which verifies that the user owns a Lens handle NFT (the Data Gem in this usecase) without having to reveal their private wallet (i.e. they can connect to this DApp and with a wallet that does not hold a Lens handle NFT but is in the same data vault as an address that does hold a Lens handle NFT).

![Sismo for auth](./img/sismo_magic.png)

![Stay anon if you want!](./img/vault_makes_anon.png)

The following `bytes16` data are the relevant pieces that connect this DApp to Sismo Connect:

```solidity
bytes16 APP_ID = 0x639312ba6099cd3a698a33416a25d345;
bytes16 GROUP_ID = 0x945e9e7b1f95899328bf9c4490aba9fc;
```

---

### Smart Contracts

All the logic of the platform is implemented in two smart contracts: [`AskLensQuestionWSismo.sol`](./backend/contracts/src/AskLensQuestionWSismo.sol) and [`AskLensThreadWSismo.sol.sol`](./backend/contracts/src/AskLensThreadWSismo.sol.sol). 

Deployed versions of these contracts are found in:

```solidity
// Mumbai testnet
address AskLensQuestionWSismo = 0xb1dabc876cc8e5d599f1362c72cd621b66a5c7f2;
address AskLensThreadWSismo = 0x4e457c172144d4a1f08f61f54a37dd819a6ba28e;
```

_Verification was not possible due to internal RPC errors..._


The workflow of the platform is as follows:

1. A user can create a question to another user by calling the `mint` function of the `AskLensQuestionWSismo` contract. This function will verify that said user can prove ownership of a Lens handle NFT, via Sismo Connect.

![Asking a question](./img/question_mint.png)

2. The question text is stored in the `Filecoin` IPFS storage. The saved data is a JSON schema such as the one provided below:

```json
{
  "question":   "What is the meaning of life?",
  "questioner": "0x1234...",
  "answerer":   "0x5678...",
  "timestamp":  1684004363,
}
```
![Data stored in IPFS and signature made](./img/identified_ask.png)

3. An ERC155 "question" token is minted to both users: the questioner and the answerer, where the token URI is the IPFS hash of the JSON schema above.

4. The answerer will then have the option to answer the question by calling the `mint` function of the `AskLensThreadWSismo` contract. Again, this function will verify that said user can prove ownership of a Lens handle NFT, via Sismo Connect.

5. The question data JSON schema is retrieved from filecoin, the timestamp is updated and the answer's answer is appended to it. The resulting JSON schema is then stored in IPFS again. The saved data is a JSON schema such as the one provided below:

```json
{
  "question":   "What is the meaning of life?",
  "answer":     "The question of the meaning of life is subjective and deeply personal",
  "questioner": "0x1234...",
  "answerer":   "0x5678...",
  "timestamp":  1684004501,
}
```

6. The ERC155 "question" token is burned (for both the answerer and the questioner), and then an ERC1155 "thread" token is minted to both users again. Similarly as for the "question" ERC1155, the token URI is the IPFS hash of the JSON schema above.

![Mint answers!](./img/answer_mint.png)

7. You can visualize these "threads" in the AskLens frontend!


## Setup
```bash
git clone https://github.com/luksgrin/ETHLisbon_project && \
cd ETHLisbon_project
```
### Run the frontend 
```bash
cd askfrens && \
yarn install && \ # if not done before
yarn dev
```
Add .env file to backend folder with
```
WEBSTORAGE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUzRGEyMjRBM2ExNWU2NDUxMjAyNzI3MTNlOTE4NzA4ZkNFYzkwMTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODM5NzU4NDQwNTMsIm5hbWUiOiJMaXNib25IYWNrYXRob24ifQ.RzOwEWFzeJ_2ZqJNlb_oBRpogkNpwBWIqpudsoFHMfM
```
### At backend
```bash
yarn install &&
node server.js

```

## Actors
- People who do questions (Quevedo)
- People who answers (Alice)
- All actors (General) 

## Others
- RRUSD - Really Real USD -> Our stablecoin with oracles for price feed

## Specs
- Alice:
  - Must be a Lens user
  - Must be verified with Sismo to be a Lens user
  - Can answer questions or not
  - Can receive donations by Lens Handler -> ETH address
  - Can trade received donations (RRUSD, GHO, APE) using our AMM that uses 1inch Fusion
  - Might drop nfts in other chains to good questions ??
  - Might donate to nice questions ??

- Quevedo:
  - Must be a Lens user
  - Must be verified with Sismo to be a Lens user
  - Can do questions to other users
  - Can be anonymous question or named one
  - Can receive donations by Lens Handler -> ETH address ??
  - Can trade received donations (RRUSD, GHO, APE) using our AMM that uses 1inch Fusion
  - Can donate to nice answers (RRUSD, GHO, APE)

- General
  - Answers/questions will go to FEVM and/or TheGraph storage
  - Can mint their nft for lens in ZKEvm if they hold LENS nft. Future feature
  - Time of the questions / address should be addressed



