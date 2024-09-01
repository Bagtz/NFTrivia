<div align="center">
    <img src="https://github.com/Mugen-Builders/.github/assets/153661799/7ed08d4c-89f4-4bde-a635-0b332affbd5d" width="150" height="150">
</div>
<br>
<div align="center">
    <i>An Typescript example using Cartesi Cli, Nonodo and Deroll as High-Level Framework</i>
</div>
<div align="center">
<b>This example aims to demonstrate the lifecycle of a DApp using Deroll.</b>
</div>
<br>
<div align="center">
    
  <a href="">[![Static Badge](https://img.shields.io/badge/cartesi-1.3.0-5bd1d7)](https://docs.cartesi.io/cartesi-rollups/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/cartesi--cli-0.15.0-5bd1d7)](https://docs.cartesi.io/cartesi-rollups/1.3/quickstart/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/nonodo-1.1.1-blue)](https://www.npmjs.com/package/nonodo)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/@deroll/app-0.7.0-yellow)](https://www.npmjs.com/package/@deroll/app)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/@deroll/router-0.5.0-yellow)](https://www.npmjs.com/package/@deroll/router)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/@deroll/wallet-0.8.0-yellow)](https://www.npmjs.com/package/@deroll/wallet)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/foundry-0.2.0-red)](https://book.getfoundry.sh/getting-started/installation)</a>
</div>

## User Stories:

Here is a list of user stories that the application covers:

| #   | User Story Description                                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------- |
| 1   | As a user, I want to send Ether tokens to my wallet on Layer 2.                                           |
| 2   | As a user, I want to send ERC20 tokens to my wallet on Layer 2.                                           |
| 3   | As a user, I want to transfer Ether tokens between wallets on Layer 2.                                    |
| 4   | As a user, I want to transfer ERC20 tokens between wallets on Layer 2.                                    |
| 5   | As a user, I want to withdraw my deposit in ERC20.                                                         |
| 6   | As a user, I want to withdraw my deposit in Ether.                                                         |
| 7   | As a user, I want to request the balance of Ether in my wallet on Layer 2.                                |
| 8   | As a user, I want to request the balance of ERC20 tokens in my wallet on Layer 2.                         |

## Setup:

#### The system setup is divided into three parts:
1º - Install all dependencies:
   + Cartesi Cli:
   ```bash
   $ npm i -g @cartesi/cli
   ```
   + Nonodo:
   ```bash
   $ npm i nonodo
   ```

2º - Clone this repo using the code below:
```Bash
git clone --recursive https://github.com/Mugen-Builders/learn-deroll.git
```

## Interactions:

Below are the instructions on how to interact with each section of the application, and some metadata of the performed operation. 

#### Send native tokens:

_User story number 1_

_Required past interactions: No past interactions._

##### Step 1:

###### Command:

```shell
cartesi send ether --amount=1000
```

###### Output Similar to:

```shell
? Chain Foundry
? RPC URL http://127.0.0.1:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 9999.969240420387558666 ETH
? DApp address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
✔ Input sent: 0x748c08e26d4898384ab0a0cdea7a41bfc7fe0138300133e6cdcf8733b245acf7
```

> [!NOTE]
> - Request Type: Advance State
> - Contract Name: EtherPortal
> - Contract Function: "depositEther(address app, bytes calldata execLayerData)"
> - Contract Address: 0xFfdbe43d4c855BF7e0f105c400A50857f53AB044

#### Balance of native tokens:

_User story number 7_

_Required past interactions: Send native tokens._

##### Step 1:

###### Command:

```Bash
curl http://localhost:8080/inspect/wallet/ether/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

###### Output Similar to:

```json
{
   "status":"Accepted",
   "exception_payload":null,
   "reports":[
      {
         "payload":"0x7b2262616c616e6365223a2231303030303030303030303030303030303030303030227d"
      }
   ],
   "processed_input_count":1
}
```

> [!NOTE]
>  - Request Type: Inspect State

#### Transfer native tokens:

_User story number 3_

_Required past interactions: Send native tokens._

##### Step 1:

###### Command:
```Bash
cast calldata "transferEther(address,uint256)" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 100ether
cast calldata "transferEther(address,uint256)" 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 100ether
```

###### Output Similar to:
```Bash
0x05b1137b00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000056bc75e2d63100000
```

##### Step 2:

###### Command:
```Bash
cartesi send generic --input=0x05b1137b00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000056bc75e2d63100000
```

###### Output Similar to:
```shell
? Chain Foundry
? RPC URL http://127.0.0.1:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 8999.968880397279934808 ETH
? DApp address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
✔ Input sent: 0xfa798512c244eeee3743aba4ecefb3ba60b180dc8f6a8fbd86832905a3423938
```
  
##### Evidence:

###### Command:

```Bash
curl http://localhost:8080/inspect/wallet/ether/0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

###### Output Similar to:
```json
{
   "status":"Accepted",
   "exception_payload":null,
   "reports":[
      {
         "payload":"0x7b2262616c616e6365223a22313030303030303030303030303030303030303030227d"
      }
   ],
   "processed_input_count":2
}
```

> [!NOTE]
>  - Request Type: Advance State
>  - Contract Name: InputBox
>  - Contract Function: "addInput(address app, bytes calldata payload)"
>  - Contract Address: 0x59b22D57D4f067708AB0c00552767405926dc768

#### Withdraw native tokens:

_User story number 6_ 

_Required past interactions: Send native tokens._

##### Step 1:

###### Command:

```Bash
cartesi send dapp-address
```

###### Output Similar to:

```shell
? Chain Foundry
? RPC URL http://127.0.0.1:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 8999.968561869278177808 ETH
? DApp address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
✔ Input sent: 0x96d438d042aa539bf1f99d1055aa829e8bd1082fff8fcb5929c929abc0e8012c
```

##### Step 2:

###### Command:

```Bash
cast calldata "withdrawEther(uint256)" 500ether
```

###### Output Similar to:

```Bash
0x3bed33ce00000000000000000000000000000000000000000000001b1ae4d6e2ef500000
```

##### Step 3:

###### Command:
```Bash
cartesi send generic --input=0x3bed33ce00000000000000000000000000000000000000000000001b1ae4d6e2ef500000
```

###### Output Similar to:
```Shell
? Chain Foundry
? RPC URL http://127.0.0.1:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 8999.968241325276378472 ETH
? DApp address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
✔ Input sent: 0x758a7653c3429595a46ed0f5857d3c2fd106b67a0360677c2ace073f574a68fe
```

##### Evidence:

###### Command:
```shell
curl http://localhost:8080/inspect/wallet/ether/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

###### Output Similar to:
```json
{
   "status":"Accepted",
   "exception_payload":null,
   "reports":[
      {
         "payload":"0x7b2262616c616e6365223a22343030303030303030303030303030303030303030227d"
      }
   ],
   "processed_input_count":4
}
```

> [!NOTE]
> - Request Type: Advance State
> - Contract Name: InputBox
> - Contract Function: "addInput(address app, bytes calldata payload)"
> - Contract Address: 0x59b22D57D4f067708AB0c00552767405926dc768

#### Send Tokens ERC20:

_User story number 2_

_Required past interactions: No past interactions._

##### Step 1:

###### Command:
```Bash
cast send 0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2 "approve(address,uint256)" 0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB 1000000000ether  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --rpc-url http://localhost:8545
```

###### Output Similar to:
```Shell
blockHash               0x0ad7ca64ebd3bae6de5146b46c2c31583760bea920afaa93c787f69b5c406729
blockNumber             104
contractAddress         
cumulativeGasUsed       46969
effectiveGasPrice       3000001085
gasUsed                 46969
logs                    [{"address":"0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2","topics":["0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925","0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266","0x0000000000000000000000009c21aeb2093c32ddbc53eef24b873bdcd1ada1db"],"data":"0x0000000000000000000000000000000000000000033b2e3c9fd0803ce8000000","blockHash":"0x0ad7ca64ebd3bae6de5146b46c2c31583760bea920afaa93c787f69b5c406729","blockNumber":"0x68","transactionHash":"0xc5b62bad0f91870b17ecf4b0380a9178b42ba04b0368ab4462878239ecc71c48","transactionIndex":"0x0","logIndex":"0x0","transactionLogIndex":"0x0","removed":false}]
logsBloom               0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000800000000000000000000080000000000000000000000000100000000000000000000000000000020000000000000000000000000000000000000000000000800000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000002000000000008000000000000010000000400000000000000000000000000000000000000000000000000000
root                    
status                  1
transactionHash         0xc5b62bad0f91870b17ecf4b0380a9178b42ba04b0368ab4462878239ecc71c48
transactionIndex        0
type                    2
```

##### Step 2:

###### Command:
```Bash
cartesi send erc20
```

###### Output Similar to:
```Shell
? Chain Foundry
? RPC URL http://127.0.0.1:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 8999.967782517274305856 ETH
? DApp address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
? Token address 0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2
✔ Input sent: 0xc9f85574c90461c920972ba5e00de03b05477e022e50f72aebad898af6757a6c
```
  
> [!NOTE]
>  - Request Type: Advance State
>  - Contract Name: ERC20Portal
>  - Contract Function: "depositERC20Tokens(IERC20 token, address app, uint256 amount, bytes calldata execLayerData)"
>  - Contract Address: 0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB

#### Balance of ERC20 tokens:

_User story number 8_

_Required past interactions: Send ERC20 tokens._

##### Step 1:

###### Command:
```Bash
curl http://localhost:8080/inspect/wallet/erc20/0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

###### Output Similar to:
```Bash
{
   "status":"Accepted",
   "exception_payload":null,
   "reports":[
      {
         "payload":"0x7b2262616c616e6365223a2231303030303030303030303030303030303030303030303030303030227d"
      }
   ],
   "processed_input_count":5
}
```

> [!NOTE]
>  - Request Type: Inspect State

#### Transfer tokens ERC20:

_User story number 4_

_Required past interactions: Send ERC20 tokens._

##### Step 1:

###### Command:
```Bash
cast calldata "transferERC20(address,address,uint256)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 10ether
```

###### Output Similar to:
```Bash
0x9db5dbe4000000000000000000000000f39Fd6e51aad88F6F4ce6aB8827279cffFb9226600000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000008ac7230489e80000
```

##### Step 2:

###### Command:
```Shell
cartesi send generic --input=0x9db5dbe4000000000000000000000000f39Fd6e51aad88F6F4ce6aB8827279cffFb9226600000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000008ac7230489e80000
```

###### Output Similar to:
```Shell
? Chain Foundry
? RPC URL http://127.0.0.1:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 8999.967416214271545581 ETH
? DApp address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
✔ Input sent: 0xd49dc708491b48e6789e7dbc635474fa83fb19da2f7a6326a9cb5c4131fdd733`
```

##### Evidence:

###### Command:
```Bash
curl http://localhost:8080/inspect/wallet/erc20/0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

###### Output Similar to:
```json
{
   "status":"Accepted",
   "exception_payload":null,
   "reports":[
      {
         "payload":"0x7b2262616c616e6365223a223130303030303030303030303030303030303030227d"
      }
   ],
   "processed_input_count":6
}
```

> [!NOTE]
>  - Request Type: Advance State
>  - Contract Name: InputBox
>  - Contract Function: "addInput(address app, bytes calldata payload)"
>  - Contract Address: 0x59b22D57D4f067708AB0c00552767405926dc768

#### Withdraw ERC20 tokens:

_User story number 5_

_Required past interactions: Send ERC20 tokens._

##### Step 1:

###### Command:
```Bash
cast calldata "withdrawERC20(address,uint256)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 100ether
```

###### Output Similar to:
```Bash
0xa1db9782000000000000000000000000f39Fd6e51aad88F6F4ce6aB8827279cffFb922660000000000000000000000000000000000000000000000056bc75e2d63100000
```

##### Step 2:

###### Command:
```Bash
cartesi send generic --input=0xa1db9782000000000000000000000000f39Fd6e51aad88F6F4ce6aB8827279cffFb922660000000000000000000000000000000000000000000000056bc75e2d63100000
```

###### Output Similar to:
```Shell
? Chain Foundry
? RPC URL http://127.0.0.1:8545
? Wallet Mnemonic
? Mnemonic test test test test test test test test test test test junk
? Account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 8999.96709703526977491 ETH
? DApp address 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e
✔ Input sent: 0x383138528e451dfb74286e8f84d6282e2718ecc92e66ad91e18f2059437de501
```

##### Evidence:

###### Command:
```Bash
curl http://localhost:8080/inspect/wallet/erc20/0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

###### Output Similar to:
```json
{
   "status":"Accepted",
   "exception_payload":null,
   "reports":[
      {
         "payload":"0x7b2262616c616e6365223a22393939393939383930303030303030303030303030303030303030227d"
      }
   ],
   "processed_input_count":7
}
```

> [!NOTE]
>  - Request Type: Advance State
>  - Contract Name: InputBox
>  - Contract Function: "addInput(address app, bytes calldata payload)"
>  - Contract Address: 0x59b22D57D4f067708AB0c00552767405926dc768

### Executing all generated vouchers

You can use the [Cartesi Explorer](http://localhost:8080/explorer) to execute all the vouchers generated by the interactions performed earlier. Note that in this section, when clicking to obtain the proof, you are collecting the proof of the computation generated at the end of the respective epoch. This is the reason that, if you used the cartesi cli to run the dapp, you needed to use the ```--epoch-length``` flag to control the time until the epoch is completed, in this case, 60 seconds.
