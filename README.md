<div align="center">
    <img src="https://github.com/Mugen-Builders/.github/assets/153661799/7ed08d4c-89f4-4bde-a635-0b332affbd5d" width="150" height="150">
</div>
<br>
<div align="center">
    <i>A Farcaster based social feed where loyal fans are rewarded with exclusive NFTs</i>
</div>
<div align="center">
</div>
<br>

# How to use:
This guide will not include each instance of the ```npm install``` command in each separate folder, neither will it go in depth about the installation process of Hardhat and Cartesi specific dependencies.

## Run the Cartesi Machine
This is necessary to create the Foundry local blockchain and iniciate the Cartesi Machine proper, where the scores will be calculated.
```Bash
cd dapp/
cartesi build
cartesi run
```

## Run the Farcaster frame
This will start a running frame on your localhost.
```Bash
cd frame/
npm install
npm .env
npm run dev
```
Make sure that the port being used 

## Run the secondary backend
This process will act as the middleware between the Farcaster frontend and the Cartesi Machine backend. 

First, we need to change the port being used by the backend:
```Bash
cd backend/NFTrivia/frame/app/api/[[...routes]]/
vim route.tsx
```

Then, we exchange the port argument in line 487:
```Bash
    const response = await fetch('http://localhost:3002/api/add-answer', {
```
For:
```Bash
    const response = await fetch('http://localhost:3001/api/add-answer', {
```

Finally, we can run the backend:
```Bash
cd backend/
node index.js
```

## Usage demo
[NFTrivia Demo](https://drive.google.com/drive/folders/16RIFc13d1s0pCfSSfdb89fLavsVd7XwS)
