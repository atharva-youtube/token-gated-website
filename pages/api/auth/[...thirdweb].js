import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BigNumber, ethers } from "ethers";
import { contractAbi, contractAddress } from "../../../contract";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.ADMIN_PRIVATE_KEY || "",
  domain: "localhost",
});

export const checkEligibility = async (req) => {
  try {
    const user = await getUser(req);

    if (!user) return false;

    const sdk = new ThirdwebSDK("goerli");
    const contract = await sdk.getContractFromAbi(contractAddress, contractAbi);

    const balance = await contract.call("balanceOf", user.address);

    console.log("balance", ethers.utils.formatEther(balance));

    if (ethers.utils.formatEther(balance) > BigNumber.from(1000)) {
      return true;
    }

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default ThirdwebAuthHandler();
