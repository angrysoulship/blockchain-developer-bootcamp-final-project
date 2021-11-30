# blockchain-developer-bootcamp-final-project - Digital T-Rex Factory 
## Deployed version url:
https://trexfactory.vercel.app/
## How to run this project locally:
### Prerequisites
* Node.js: v14.15.0
* npm package manager: 7.19.1
* `git checkout master`
### Contracts Deployment
1. Run `npm install hardhat` to install harthat
1. Run `npx hardhat node` in project root to spin up a localtest network
2. Open another terminal window and run `npx hardhat run scripts/deploy.js --network localhost` to delopy the contract

### Contract Test
1. Run `npx hardhat test`

### Frontend
1. Run `npm run dev`
2. Open `http://localhost:3000


## Screencast link
https://youtu.be/hDzOXQgyOdA

## Public Ethereum wallet for certification:

## Project description
User could create their custom designed t-rex cartoon images and save to the blockchain.
And they could also see their collections, breed and trade them as well(breed and trading is working in progress).

## Directory structure 
* `pages` and `components`: project's frontend
* `contracts`: Smart contracts that are deployed in the Mumbai testnet
* `artifacts`: Migration files.
* `test`: test scripts.

## TODO features
* breeding
* trading
