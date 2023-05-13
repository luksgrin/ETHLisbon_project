# AskLens

![AskLens_logo](./img/AskLens_logo.png)

AskLens is a social media platform where users can ask questions and get answers from other users. The platform is built on top of the Lens Social Graph, employs Sismo Connect as its SSO and it's integrated with other DeFi protocols to allow users to donate to other users and to trade their donations.

---

The sismo group employed has the following groupId: 0x945e9e7b1f95899328bf9c4490aba9fc

## Setup
```bash
git clone https://github.com/luksgrin/ETHLisbon_project && \
cd ETHLisbon_project
```
### Frontend 
```bash
cd frontend && \
npm install && \ # if not done before
npm run dev
```
## Actors
- People who do questions (Quevedo)
- People who answers (Alice)
- All actors (General) 

## Others
- RRUSD - Really Real USD -> Our stablecoin with oracles for price feed (not final name)

## Specs
- Alice:
  - Must be a Lens user
  - Must be verified with Sismo to be a Lens user
  - Can answer questions or not
  - Can receive donations by Lens Handler -> ETH address
  - Can trade received donations (RRUSD, GHO, APE) using our AMM that uses 1inch Fusion
  - Can ask Airstack AI bot questions about doubts may appear while reading Quevedo questions.
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
  - Can ask Airstack AI bot questions about doubts may appear while writing questions ??
  - Can donate via FIAT thanks to SAFE ??
  - Can donate via ZkBob 

- General
  - Answers/questions will go to FEVM and/or TheGraph storage
  - Can mint their nft for lens in ZKEvm if they hold LENS nft ??
  - Time of the questions / address should be addressed

# Architecture

## Glossary
- Purple: Bounty likely to build  
- White: Feature with no bounty
- Pink: Bounty not likely to build

## Concepts


- Social media features

![img2](https://i.ibb.co/ccz8nck/Lisbon-May.png)

- Donation / swap features
 
![img](https://i.ibb.co/b3cQfVQ/Lisbon-May-1.png)

- Deployments

![img](https://i.ibb.co/0QtY8QW/Lisbon-May-3.png.png)

## Prizes
Glossary:
- Types of prizes
  - Pool -> Typical pool shared by anyone who fits requirements
  - Bo -> Best of
  - BoPool -> Pool around best teams
- Others
  - ?? -> Not sure to implement
  - -Number -> amount of Number
  - (D) -> Deivitto would be who implements this 100%

### Authentication
- Sismo: Bo-1
- Lens: Bo-8
- Worldcoin: Pool ?? restrict some area to real users like drops? (future ideas) (D)

### Money / DeFi
- ZkBob: Bo / Pool: deposit (do the donation operation) using zkbob deposit function.
- Safe: Bo-8 use of sdk to perform
- 1nch Fusion: Bo3 
- AAVE Use of GHO: Bo3 + Bo5
- APE Use of coin / infraestructure improve: Bo2 WrappedAPE -> at all these cool chains lol

### Deploy
We can deploy all AMM / stable coin related operations and even store operations I guess
- Scroll: Pool
- Polygon wherever: Pool
- Optimism Mainnet: Pool
- Linea: Bo-5
- Mantle (Defi / nft): Bo-3
- Gnosis: Bo-1

### Utility
- Metamask SDK: Bo-2 ?? ask if wagmi includes it (D)
- UMA oracle price feed: Pool + Bo2
- Chainlink oracle price feed: Bo-5 ??
- Airstack AI assitance / check some social data like if X address have a nft (i.e.: ENS / lens): Bo-5 (D)
- Minting NFT at ZKEvm if you hold Lens NFT / Minting drops at ZKEvm if you hold some shit / authenticate? - BoPool

### Storage
- FEVM store data of questions (Question + answer + user + date) - Bo-10 + Bo-1
- TheGraph Build and deploy / Use an existing subgraph: Pool + Bo 
