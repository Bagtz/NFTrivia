import { createApp } from "@deroll/app";
import { createRouter } from "@deroll/router";
import { createWallet } from "@deroll/wallet";
import {
    decodeFunctionData,
    encodeFunctionData,
    parseAbi,
    Address,
    toHex,
} from "viem";
import contractAbi from "./Abi.json";

const ROLLUP_SERVER = process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004";

const app = createApp({ url: ROLLUP_SERVER });

const contractDestination = "0x36C02dA8a0983159322a80FFE9F24b1acfF8B570";

const abi = parseAbi([
    "function addAnswer(address, uint256)",
    "function sendBestScores()",
    "function withdrawEther(uint256)",
    "function safeMint(address,string)",
    "function transferEther(address,uint256)",
    "function withdrawERC20(address,uint256)",
    "function mint(address,uint256,uint256,bytes)",
    "function transferERC20(address,address,uint256)",
]);

type WalletData = {
    address: string;
    score: number;
};

const userScores = [] as any;
  

app.addAdvanceHandler(async ({ payload, metadata }) => {
    try {
        const { functionName, args } = decodeFunctionData({ abi, data: payload });
        let to, amount, token, uri, id, encodedData, data, userAddress: string, userScore;
        switch (functionName) {
            case "addAnswer":
                [userAddress, userScore] = args;
                userScore = Number(userScore);

                const walletIndex = userScores.findIndex( (wallet: WalletData) => wallet.address === userAddress);

                if (walletIndex !== -1) {
                    userScores[walletIndex].score += userScore;
                    console.log('Atualização bem-sucedida:');
                } else {
                    userScores.push({ address: userAddress, score: userScore });
                    console.log('Carteira não registrada. Criando nova carteira:');
                }

                userScores.sort((a: WalletData, b: WalletData) => b.score - a.score);
                console.log(userScores);

                app.createNotice({
                    payload: toHex(
                        `Recieving score ${userScore} from ${userAddress} at ${metadata.timestamp}`
                    ),
                });
                return "accept";
            case "sendBestScores":
                encodedData = encodeFunctionData({
                    abi: contractAbi,
                    functionName: "Award",
                    args: [userScores[0].address],
                })
                
                app.createVoucher({
                    destination: contractDestination,
                    payload: encodedData,
                });
                
                app.createNotice({
                    payload: toHex(
                        'Sending best scores to contract at ${metadata.timestamp}'
                    ),
                });
                return "accept";
            case "transferEther":
                [to, amount] = args;
                wallet.transferEther(metadata.msg_sender, to, amount);
                app.createNotice({
                    payload: toHex(
                        `The account ${metadata.msg_sender} is transferring ${amount
                        } wei from ${metadata.msg_sender} to ${to} at ${metadata.timestamp}`
                    ),
                });
                return "accept";
            case "transferERC20":
                [token, to, amount] = args;
                wallet.transferERC20(token, metadata.msg_sender, to, amount);
                app.createNotice({
                    payload: toHex(
                        `The account ${metadata.msg_sender} is transferring ${amount
                        } tokens ${token} from ${metadata.msg_sender} to ${to} at ${metadata.timestamp}`
                    ),
                });
                return "accept";
            case "withdrawEther":
                [amount] = args;
                app.createVoucher(wallet.withdrawEther(metadata.msg_sender, amount));
                app.createNotice({
                    payload: toHex(
                        `The account ${metadata.msg_sender} is withdrawing ${amount
                        } wei at ${metadata.timestamp}.`
                    ),
                });
                return "accept";
            case "withdrawERC20":
                [token, amount] = args;
                app.createVoucher(
                    wallet.withdrawERC20(token, metadata.msg_sender, amount)
                );
                app.createNotice({
                    payload: toHex(
                        `The account ${metadata.msg_sender} is withdrawing ${amount
                        } tokens of ${token} at ${metadata.timestamp}.`
                    ),
                });
                return "accept";
            case "safeMint":
                [to, uri] = args;
                encodedData = encodeFunctionData({
                    abi: abi,
                    functionName: "safeMint",
                    args: [to, uri],
                });
                app.createVoucher({
                    destination: "0xF320e7a3416Ee6B4DEe29333451b17534833F9cC",
                    payload: encodedData,
                });
                app.createNotice({
                    payload: toHex(
                        `The account ${metadata.msg_sender} is minting a token with uri ${uri} to ${to} at ${metadata.timestamp}.`
                    ),
                });
                return "accept";
            case "mint":
                [to, id, amount, data] = args;
                encodedData = encodeFunctionData({
                    abi: abi,
                    functionName: "mint",
                    args: [to, id, amount, data],
                });
                app.createVoucher({
                    destination: "0x4c4d35E8bf193183c1E5D66397A475c3c78C4F9D",
                    payload: encodedData,
                });
                app.createNotice({
                    payload: toHex(
                        `The account ${metadata.msg_sender} is minting ${amount} tokens of id ${id} to ${to} at ${metadata.timestamp}.`
                    ),
                });
                return "accept";
        }
    } catch (e) {
        return "reject";
    }
});

// create wallet
const wallet = createWallet();

app.addAdvanceHandler(wallet.handler);

const router = createRouter({ app });

router.add("quiz/leaderboard", () => {
    return JSON.stringify(Object.entries(userScores));
});

router.add<{ sender: string }>(
    "wallet/nft/:sender",
    ({ params: { sender } }) => {
        return JSON.stringify({
            balance: `${wallet.etherBalanceOf(sender).toString()} wei`,
        });
    }
);

router.add<{ sender: string }>(
    "wallet/ether/:sender",
    ({ params: { sender } }) => {
        return JSON.stringify({
            balance: `${wallet.etherBalanceOf(sender).toString()} wei`,
        });
    }
);

router.add<{ token: Address; sender: string }>(
    "wallet/erc20/:token/:sender",
    ({ params: { token, sender } }) => {
        return JSON.stringify({
            balance: `${wallet.erc20BalanceOf(token, sender).toString()}`,
        });
    }
);

app.addInspectHandler(router.handler);

// start app
app.start().catch((e) => {
    console.error("Error starting the app:", e);
    process.exit(1);
});