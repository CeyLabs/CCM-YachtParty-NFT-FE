import {
  NFT_ABI,
  NFT_CONTRACT_ADDRESS,
  USDC_ABI,
  USDC_CONTRACT_ADDRESS,
  USDT_ABI,
  USDT_CONTRACT_ADDRESS,
} from "@/config/blockchain";
import { createPublicClient, getContract, Hex, http } from "viem";
import { arbitrum, arbitrumSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain:
    process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? arbitrumSepolia
      : arbitrum,
  transport: http(),
});

const contract = getContract({
  address: NFT_CONTRACT_ADDRESS,
  abi: NFT_ABI,
  client: {
    public: publicClient,
  },
});

const USDCContract = getContract({
  address: USDC_CONTRACT_ADDRESS,
  abi: USDC_ABI,
  client: {
    public: publicClient,
  },
});

const USDTContract = getContract({
  address: USDT_CONTRACT_ADDRESS,
  abi: USDT_ABI,
  client: {
    public: publicClient,
  },
});

export const getMaxSupply = async () => {
  try {
    return contract.read.MAX_PHYSICAL_SUPPLY();
  } catch (error) {
    console.log("Error while fetching max supply", error);
  }
};

export const getETHPriceForToken = async () => {
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
    console.log('meow', result, address)
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

export const getUSDCTokenDecimals = async () => {
  try {
    const result = await USDCContract.read.decimals();
    return result;
  } catch (error) {
    console.log("Error while fetching usdc token decimals", error);
  }
};

export const getUSDTTokenDecimals = async () => {
  try {
    const result = await USDTContract.read.decimals();
    return result;
  } catch (error) {
    console.log("Error while fetching usdt token decimals", error);
  }
};

export const getApprovedUSDTAmount = async (address: string) => {
  try {
    const result = await USDTContract.read.allowance([
      address,
      NFT_CONTRACT_ADDRESS,
    ]);
    console.log('meow', result, address);
    return result;
  } catch (error) {
    console.log("Error while checking is approved usdt", error);
  }
};

export const getApprovedUSDCAmount = async (address: string) => {
  try {
    const result = await USDCContract.read.allowance([
      address,
      NFT_CONTRACT_ADDRESS,
    ]);
    console.log('hello', result, address, NFT_CONTRACT_ADDRESS)
    return result;
  } catch (error) {
    console.log("Error while checking is approved usdc", error);
  }
}
