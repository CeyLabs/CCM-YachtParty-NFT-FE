"use client";
import React, { useEffect, useState } from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NFT_ABI,
  NFT_CONTRACT_ADDRESS,
  USDC_ABI,
  USDC_CONTRACT_ADDRESS,
  USDT_ABI,
  USDT_CONTRACT_ADDRESS,
} from "@/config/blockchain";
import { formatEther, formatUnits, Hex, parseEther, parseUnits } from "viem";
import { useAccount, useConfig } from "wagmi";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  getETHDiscountPriceForToken,
  getETHPriceForToken,
  getApprovedUSDCAmount,
  getApprovedUSDTAmount,
  getMaxSupply,
  getPhysicalTokenIds,
  getUSDCTokenDecimals,
  getUSDDiscountPriceForToken,
  getUSDPriceForToken,
  getUSDTTokenDecimals,
  getVirtualTokenIds,
  isDiscountedCheck,
  isWhitelistedCheck,
} from "@/services/blockchain.service";

const CoinSelectorDropdown = ({
  selectedCoin,
  setSelectedCoin,
}: {
  selectedCoin: string;
  setSelectedCoin: Function;
}) => {
  const coins = [
    {
      value: "0",
      label: "ETH",
      image: "/images/coins/eth.png",
    },
    {
      value: "2",
      label: "USDC",
      image: "/images/coins/usdc.png",
    },
    {
      value: "1",
      label: "USDT",
      image: "/images/coins/usdt.png",
    },
  ];

  return (
    <Select
      onValueChange={(coin) => setSelectedCoin(coin)}
      value={selectedCoin}
    >
      <SelectTrigger className="w-[150px] border border-white/[0.2] text-slate-200">
        <SelectValue placeholder="Select a coin" />
      </SelectTrigger>
      <SelectContent
        className="border border-white/[0.2]"
        onSelect={(e) => console.log(e)}
      >
        <SelectGroup className="text-slate-200 ">
          {coins.map((coin, index) => (
            <SelectItem key={index} value={coin.value}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={coin.image}
                    alt={coin.label}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <div>{coin.label}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const MintingCard = () => {
  const [isNFTMinting, setIsNFTMinting] = useState<boolean>(false);
  const config = useConfig();
  const { toast } = useToast();
  const router = useRouter();
  const { address } = useAccount();

  const [maxSupply, setMaxSupply] = useState<string | undefined>("0");
  const [ethPrice, setEthPrice] = useState("0");
  const [discountEthPrice, setDiscountEthPrice] = useState("0");
  const [usdPrice, setUsdPrice] = useState("0");
  const [discountUsdPrice, setDiscountUsdPrice] = useState("0");
  const [physicalAttendeeCount, setPhysicalAttendeeCount] = useState(0);
  const [virtualAttendeeCount, setVirtualAttendeeCount] = useState(0);
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [isDiscounted, setIsDiscounted] = useState<boolean>(false);
  const [isVirtualAttendee, setIsVirtualAttendee] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string>("0");
  const [totalEthPrice, setTotalEthPrice] = useState("0");
  const [approvedAmount, setApprovedAmount] = useState("");
  const [isApproving, setIsApproving] = useState<boolean>(false);

  // GET PHYSICAL TICKET MAX SUPPLY
  const fetchMaxSupply = async () => {
    const data = await getMaxSupply();
    setMaxSupply(data?.toString());
  };

  // GET ETH PRICE
  const fetchEthPriceForToken = async () => {
    const data = await getETHPriceForToken();
    setEthPrice(formatEther(data as bigint));
  };

  // GET DISCOUNTED ETH PRICE
  const fetchETHDiscountPriceForToken = async () => {
    const data = await getETHDiscountPriceForToken();
    setDiscountEthPrice(formatEther(data as bigint));
  };

  // GET USD PRICE
  const fetchUSDPriceForToken = async () => {
    let decimal;
    if (selectedCoin === "1") {
      decimal = await getUSDTTokenDecimals();
    }
    if (selectedCoin === "2") {
      decimal = await getUSDCTokenDecimals();
    }
    const data = await getUSDPriceForToken();
    setUsdPrice(formatUnits(data as bigint, decimal as number));
  };

  // GET DISCOUNTED USD PRICE
  const fetchUSDDiscountPriceForToken = async () => {
    let decimal;
    if (selectedCoin === "1") {
      decimal = await getUSDTTokenDecimals();
    }
    if (selectedCoin === "2") {
      decimal = await getUSDCTokenDecimals();
    }
    const data = await getUSDDiscountPriceForToken();
    setDiscountUsdPrice(formatUnits(data as bigint, decimal as number));
  };

  // GET PHYSICAL TICKET COUNT
  const fetchPhysicalAttendeeCount = async () => {
    const data = await getPhysicalTokenIds();
    setPhysicalAttendeeCount((data as Array<any>).length);
  };

  // GET VIRTUAL TICKET COUNT
  const fetchVirtualAttendeeCount = async () => {
    const data = await getVirtualTokenIds();
    setVirtualAttendeeCount((data as Array<any>).length);
  };

  // CHECK IF ADDRESS IS WHITELISTED
  const fetchIsWhitelisted = async () => {
    const data = await isWhitelistedCheck(address as Hex);
    setIsWhitelisted(data as boolean);
  };

  // CHECK IF ADDRESS IS DISCOUNTED
  const fetchIsDiscounted = async () => {
    const data = await isDiscountedCheck(address as Hex);
    setIsDiscounted(data as boolean);
  };

  // CHECK IF ADDRESS HAVE ALLOWENCE IN USDC
  const fetchApprovedUSDCAmount = async () => {
    const decimal = await getUSDCTokenDecimals();
    const data = await getApprovedUSDCAmount(address as Hex);
    console.log("data", formatUnits(data as bigint, decimal as number));
    setApprovedAmount(formatUnits(data as bigint, decimal as number));
  };

  // CHECK IF ADDRESS HAVE ALLOWENCE IN USDT
  const fetchApprovedUSDTAmount = async () => {
    const decimal = await getUSDTTokenDecimals();
    const data = await getApprovedUSDTAmount(address as Hex);
    console.log("data", formatUnits(data as bigint, decimal as number));
    setApprovedAmount(formatUnits(data as bigint, decimal as number));
  };

  useEffect(() => {
    if (address) {
      selectedCoin === "1" && fetchApprovedUSDTAmount();
      selectedCoin === "2" && fetchApprovedUSDCAmount();
    }
  }, [address, selectedCoin, isApproving, isNFTMinting]);

  useEffect(() => {
    fetchPhysicalAttendeeCount();
    fetchVirtualAttendeeCount();
  }, [isNFTMinting]);

  useEffect(() => {
    if (address) {
      fetchIsWhitelisted();
      fetchIsDiscounted();
    }
  }, [address]);

  useEffect(() => {
    fetchMaxSupply();
    fetchEthPriceForToken();
    fetchETHDiscountPriceForToken();
  }, []);

  useEffect(() => {
    fetchUSDPriceForToken();
    fetchUSDDiscountPriceForToken();
  }, [selectedCoin]);

  // CALCULATE TOTAL ETH PRICE
  useEffect(() => {
    if (isVirtualAttendee || isDiscounted) {
      if (selectedCoin === "0") {
        setTotalEthPrice(discountEthPrice);
      } else if (selectedCoin === "1" || selectedCoin === "2") {
        setTotalEthPrice(discountUsdPrice);
      }
    } else {
      if (selectedCoin === "0") {
        setTotalEthPrice(ethPrice);
      } else if (selectedCoin === "1" || selectedCoin === "2") {
        setTotalEthPrice(usdPrice);
      }
    }
  }, [
    isVirtualAttendee,
    isDiscounted,
    selectedCoin,
    ethPrice,
    usdPrice,
    discountEthPrice,
    discountUsdPrice,
  ]);

  // APPROVE FOR NFT MINT USING USDT OR USDC
  const handleApprove = async () => {
    try {
      setIsApproving(true);

      let decimal;
      let contract;
      let abi;

      switch (selectedCoin) {
        case "1":
          decimal = await getUSDTTokenDecimals();
          contract = USDT_CONTRACT_ADDRESS;
          abi = USDT_ABI;
          break;

        case "2":
          decimal = await getUSDCTokenDecimals();
          contract = USDC_CONTRACT_ADDRESS;
          abi = USDC_ABI;
          break;

        default:
          decimal = 6;
          contract = USDC_CONTRACT_ADDRESS;
          abi = USDC_ABI;
          break;
      }

      const result: any = await writeContract(config, {
        abi: abi,
        address: contract as Hex,
        functionName: "approve",
        args: [
          NFT_CONTRACT_ADDRESS,
          parseUnits(totalEthPrice, decimal as number),
        ],
      });

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      setIsApproving(false);

      toast({
        title: "Approved Successfully!",
        style: {
          background: "#061021",
          color: "#FFF",
          border: "1px solid #061021",
        },
        description: "You can mint your NFT.",
      });
    } catch (e: any) {
      setIsApproving(false);
      toast({
        title: "Uh oh! Something went wrong.",
        style: {
          background: "#061021",
          color: "#FFF",
          border: "1px solid #061021",
        },
        description:
          e?.errorMessage || "There was a problem with your request.",
      });
      console.warn("ERROR while approve", e);
    }
  };

  // REDIRECT TO MINTED NFT TX
  const handleTxView = (transactionReceipt: any) => {
    router.push(
      `https://sepolia.arbiscan.io/tx/${transactionReceipt.transactionHash}`
    );
  };

  // MINTING NFT
  const handleMinting = async () => {
    try {
      setIsNFTMinting(true);
      const result = await writeContract(config, {
        abi: NFT_ABI,
        address: NFT_CONTRACT_ADDRESS,
        functionName: "mintToken",
        args: [parseInt(selectedCoin), !isVirtualAttendee],
        value: parseEther(selectedCoin === "0" ? totalEthPrice : "0"),
      });
      console.log("result", result);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      setIsNFTMinting(false);
      toast({
        title: "Congratulations!",
        style: {
          background: "#061021",
          color: "#FFF",
          border: "1px solid #061021",
        },
        description: "Token minted successfully.",
        action: (
          <ToastAction
            onClick={() => handleTxView(transactionReceipt)}
            altText="Try again"
          >
            View Tx
          </ToastAction>
        ),
      });
    } catch (e: any) {
      setIsNFTMinting(false);
      toast({
        title: "Uh oh! Something went wrong.",
        style: {
          background: "#061021",
          color: "#FFF",
          border: "1px solid #061021",
        },
        description:
          e?.errorMessage || "There was a problem with your request.",
      });
      console.warn("ERROR while minting the NFT", e);
    }
  };

  return (
    <div className="minting-card-container">
      <div className="flex flex-col items-center justify-center">
        <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[25rem]">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

          <EvervaultCard text="hover" />

          <div className="minting-controls flex flex-col min-w-[300px]">
            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">Remaining</div>
              <div className="controller-input">
                {isVirtualAttendee
                  ? virtualAttendeeCount
                  : physicalAttendeeCount}{" "}
                / {isVirtualAttendee ? "∞" : maxSupply}
              </div>
            </div>
            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">Virtual Attendant</div>
              <div className="controller-input">
                <Switch
                  checked={isVirtualAttendee}
                  onCheckedChange={setIsVirtualAttendee}
                />
              </div>
            </div>

            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">Cost</div>
              <div className="controller-input">
                {totalEthPrice}{" "}
                {selectedCoin === "0"
                  ? "ETH"
                  : selectedCoin === "2"
                  ? "USDC"
                  : "USDT"}
              </div>
            </div>

            <div className="minting-button-section flex w-full space-x-1 mt-4">
              <div className="coin-selector">
                <CoinSelectorDropdown
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                />
              </div>
              <div className="minting-button w-full">
                {(isNFTMinting || isApproving) && (
                  <Button
                    disabled
                    className="bg-[#061021] text-white hover:bg-[#08273A] hover:text-white w-full"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </Button>
                )}

                {!isNFTMinting &&
                  (selectedCoin === "0" ||
                    (selectedCoin != "0" &&
                      parseInt(approvedAmount) >= parseInt(totalEthPrice))) && (
                    <Button
                      onClick={handleMinting}
                      disabled={
                        !isVirtualAttendee &&
                        (!isWhitelisted ||
                          parseInt(maxSupply as string) <=
                            physicalAttendeeCount)
                      }
                      className="bg-[#061021] text-white hover:bg-[#08273A] hover:text-white w-full"
                    >
                      Mint
                    </Button>
                  )}

                {!isApproving &&
                  selectedCoin != "0" &&
                  !(parseInt(approvedAmount) >= parseInt(totalEthPrice)) && (
                    <Button
                      className="bg-[#061021] text-white hover:bg-[#08273A] hover:text-white w-full"
                      onClick={handleApprove}
                      disabled={
                        !isVirtualAttendee && (!isWhitelisted || isApproving)
                      }
                    >
                      Approve
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintingCard;
