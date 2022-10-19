import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BigNumber, ethers } from "ethers";
import { contractAbi, contractAddress } from "../../contract";
import { checkEligibility, getUser } from "./auth/[...thirdweb]";

export default async function handler(req, res) {
  try {
    const eligible = await checkEligibility(req);

    if (eligible) return res.json({ message: "Eligible" });
    res.status(401).json({ message: "Not eligible" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
