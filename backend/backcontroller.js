import { localSigner, provider } from "./ethers.js";
import { BigNumber, ethers } from "ethers";
import { INPUTBOX_ABI } from "./inputBoxAbi.js";
import { parseEther } from "@ethersproject/units";

export const sendTransaction = async (req, res) => {
  try {


    const connectedLocalSigner = localSigner.connect(provider);

    const tx = {
      to: process.env.RECEIVER_ADDRESS,
      value: ethers.utils.parseEther('0.000777')
    }

    const transaction = await connectedLocalSigner.sendTransaction(tx);
    const receipt = await transaction.wait();

    res.status(200).json({ message: 'Transaction sent successfully', receipt });
  } catch (err) {
    console.log(err);
  }
}

export const addAnswer = async (req, res) => {
  try {
    const { userScore, userAddress } = req.body;

    console.log(req.body)

    const iface = new ethers.utils.Interface(["function addAnswer(address userAddress, uint256 userScore)"]);

    const encoded = iface.encodeFunctionData('addAnswer', [userAddress, userScore])

    console.log(encoded)
    
    const connectedLocalSigner = localSigner.connect(provider);

    // Usa o signer para chamar o smart contract inputBox
    const inputBoxContract = new ethers.Contract(
      process.env.INPUTBOX_ADDRESS || '0x59b22D57D4f067708AB0c00552767405926dc768',
      INPUTBOX_ABI,
      connectedLocalSigner
    );
    console.log('Connected to inputBox contract');

    const tx = await inputBoxContract.addInput(
      process.env.DAPP_ADDRESS || '0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e',
      encoded.toString() //calldata em bytes
    );

    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.error(error);
  }
}