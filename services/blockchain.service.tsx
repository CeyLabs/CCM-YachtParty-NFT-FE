import { ABIS } from "@/constants/ABIS";
import {
  Account,
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  GetBlockNumberErrorType,
  getContract,
  Hex,
  http,
  parseEther,
} from "viem";
import { arbitrum, mainnet, sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const getWalletClient = () => {
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!),
  });

  return walletClient;
};

const contract = getContract({
  address: process.env.NEXT_PUBLIC_NFT_CONTRACT as Hex,
  abi: ABIS.NFT,
  client: {
    public: publicClient,
    wallet: getWalletClient(),
  },
});

export const getMaxSupply = async () => {
  try {
    const result = await contract.read.MAX_SUPPLY();
    return result;
  } catch (error) {
    console.log("Error while fetching max supply", error);
  }
};

export const getETHPrivceForToken = async () => {
  try {
    const result = await contract.read.ETH_PRICE_PER_TOKEN();
    return result;
  } catch (error) {
    console.log("Error while fetching token eth price", error);
  }
};

export const getETHDiscountPriceForToken = async () => {
  try {
    const result = await contract.read.ETH_PRICE_PER_TOKEN_DISCOUNTED();
    return result;
  } catch (error) {
    console.log("Error while fetching token discount eth price", error);
  }
};

export const getUSDPriceForToken = async () => {
  try {
    const result = await contract.read.USD_PRICE_PER_TOKEN();
    return result;
  } catch (error) {
    console.log("Error while fetching token usd price", error);
  }
};

export const getUSDDiscountPriceForToken = async () => {
  try {
    const result = await contract.read.USD_PRICE_PER_TOKEN_DISCOUNTED();
    return result;
  } catch (error) {
    console.log("Error while fetching token discount usd price", error);
  }
};

export const getPhysicalTokenIds = async () => {
  try {
    const result = await contract.read.getPhysicalTokenIds();
    return result;
  } catch (error) {
    console.log("Error while fetching physical token ids", error);
  }
};

export const getVirtualTokenIds = async () => {
  try {
    const result = await contract.read.getVirtualTokenIds();
    return result;
  } catch (error) {
    console.log("Error while fetching virtual token ids", error);
  }
};

export const isWhitelistedCheck = async (address: string) => {
  try {
    const result = await contract.read.isAddressWhitelisted([address as Hex]);
    return result;
  } catch (error) {
    console.log("Error while checking is whitelisted", error);
  }
};

export const isDiscountedCheck = async (address: Hex) => {
  try {
    const result = await contract.read.isAddressDiscounted([address as Hex]);
    return result;
  } catch (error) {
    console.log("Error while checking is discounted", error);
  }
};

export const mintNft = async (
  amount: string,
  mintAsset: string,
  isVirtual: boolean
) => {
  try {
    const walletClient = getWalletClient();
    const [address] = await walletClient.requestAddresses();

    const hash = await walletClient.writeContract({
      account: address as unknown as Account,
      address: process.env.NEXT_PUBLIC_NFT_CONTRACT as Hex,
      abi: ABIS.NFT,
      functionName: "mintToken",
      args: [mintAsset, isVirtual],
      value: parseEther(amount),
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    return { data: receipt, status: "success" };
  } catch (e: any) {
   
   // Log the error message directly
   console.error("Error while minting nft:", e);
   // Return the error message and status
   return { data: e, status: "error" };
  }
};
