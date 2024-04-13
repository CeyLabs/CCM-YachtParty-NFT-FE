"use client";
import React, { useEffect, useState, useCallback } from "react";
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
import { useAccount, useCall, useConfig } from "wagmi";
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
  disabled,
}: {
  selectedCoin: string;
  setSelectedCoin: Function;
  disabled: boolean;
}) => {
  const coins = [
    {
      value: "0",
      label: "ETH",
      image: "/images/coins/eth.png",
    },
    {
      value: "1",
      label: "USDT",
      image: "/images/coins/usdt.png",
    },
    {
      value: "2",
      label: "USDC",
      image: "/images/coins/usdc.png",
    },
  ];

  return (
    <Select
      onValueChange={(coin) => setSelectedCoin(coin)}
      value={selectedCoin}
      disabled={disabled}
    >
      <SelectTrigger className="w-[150px] border border-white/[0.2] text-slate-200">
        <SelectValue placeholder="Select a coin" />
      </SelectTrigger>
      <SelectContent
        className="border border-white/[0.2] bg-stone-950"
        onSelect={(e) => console.log(e)}
      >
        <SelectGroup className="text-slate-200">
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
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [isDiscounted, setIsDiscounted] = useState<boolean>(false);
  const [isVirtualAttendee, setIsVirtualAttendee] = useState<boolean>(false);

  const config = useConfig();
  const router = useRouter();

  const { toast } = useToast();
  const { address } = useAccount();

  const [maxSupply, setMaxSupply] = useState<number>(0);
  const [physicalAttendeeCount, setPhysicalAttendeeCount] = useState(0);
  const [virtualAttendeeCount, setVirtualAttendeeCount] = useState(0);

  const [ethPricePerToken, setEthPricePerToken] = useState("0");
  const [discountEthPrice, setDiscountEthPrice] = useState("0");
  const [usdPrice, setUsdPrice] = useState("0");
  const [discountUsdPrice, setDiscountUsdPrice] = useState("0");
  const [selectedCoin, setSelectedCoin] = useState<string>("0");
  const [totalPrice, setTotalPrice] = useState("0");
  const [approvedAmount, setApprovedAmount] = useState("");

  // GET PHYSICAL TICKET MAX SUPPLY
  const fetchMaxSupply = async () => {
    const data = await getMaxSupply();
    setMaxSupply(Number(data));
  };

  // GET ETH PRICE
  const fetchEthPriceForToken = async () => {
    const data = await getETHPriceForToken();
    setEthPricePerToken(formatEther(data as bigint));
  };

  // GET DISCOUNTED ETH PRICE
  const fetchETHDiscountPriceForToken = async () => {
    const data = await getETHDiscountPriceForToken();
    setDiscountEthPrice(formatEther(data as bigint));
  };

  // GET USD PRICE
  const fetchUSDPriceForToken = useCallback(async () => {
    let decimal;
    if (selectedCoin === "1") {
      decimal = await getUSDTTokenDecimals();
    }
    if (selectedCoin === "2") {
      decimal = await getUSDCTokenDecimals();
    }
    const data = await getUSDPriceForToken();
    setUsdPrice(formatUnits(data as bigint, decimal as number));
  }, [selectedCoin]);

  // GET DISCOUNTED USD PRICE
  const fetchUSDDiscountPriceForToken = useCallback(async () => {
    let decimal;
    if (selectedCoin === "1") {
      decimal = await getUSDTTokenDecimals();
    }
    if (selectedCoin === "2") {
      decimal = await getUSDCTokenDecimals();
    }
    const data = await getUSDDiscountPriceForToken();
    setDiscountUsdPrice(formatUnits(data as bigint, decimal as number));
  }, [selectedCoin]);

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
  const fetchIsWhitelisted = useCallback(async () => {
    const data = await isWhitelistedCheck(address as Hex);
    setIsWhitelisted(data as boolean);
  }, [address]);

  // CHECK IF ADDRESS IS DISCOUNTED
  const fetchIsDiscounted = useCallback(async () => {
    const data = await isDiscountedCheck(address as Hex);
    setIsDiscounted(data as boolean);
  }, [address]);

  // CHECK IF ADDRESS HAVE ALLOWANCE IN USDC
  const fetchApprovedUSDCAmount = useCallback(async () => {
    const decimal = await getUSDCTokenDecimals();
    const data = await getApprovedUSDCAmount(address as Hex);
    console.log("Approved USDC amount: ", formatUnits(data as bigint, decimal as number));
    setApprovedAmount(formatUnits(data as bigint, decimal as number));
  }, [address]);

  // CHECK IF ADDRESS HAVE ALLOWANCE IN USDT
  const fetchApprovedUSDTAmount = useCallback(async () => {
    const decimal = await getUSDTTokenDecimals();
    const data = await getApprovedUSDTAmount(address as Hex);
    console.log("Approved USDT amount: ", formatUnits(data as bigint, decimal as number));
    setApprovedAmount(formatUnits(data as bigint, decimal as number));
  }, [address]);

  useEffect(() => {
    if (address) {
      selectedCoin === "1" && fetchApprovedUSDTAmount();
      selectedCoin === "2" && fetchApprovedUSDCAmount();
    }
  }, [address, selectedCoin, isApproving, isNFTMinting, fetchApprovedUSDTAmount, fetchApprovedUSDCAmount]);

  useEffect(() => {
    fetchPhysicalAttendeeCount();
    fetchVirtualAttendeeCount();
  }, [isNFTMinting]);

  useEffect(() => {
    if (address) {
      fetchIsWhitelisted();
      fetchIsDiscounted();
    }
  }, [address, fetchIsWhitelisted, fetchIsDiscounted]);

  useEffect(() => {
    fetchMaxSupply();
    fetchEthPriceForToken();
    fetchETHDiscountPriceForToken();
  }, []);

  useEffect(() => {
    fetchUSDPriceForToken();
    fetchUSDDiscountPriceForToken();
  }, [selectedCoin, fetchUSDPriceForToken, fetchUSDDiscountPriceForToken]);

  // CALCULATE TOTAL ETH PRICE
  useEffect(() => {
    if (isVirtualAttendee || isDiscounted) {
      if (selectedCoin === "0") {
        setTotalPrice(discountEthPrice);
      } else if (selectedCoin === "1" || selectedCoin === "2") {
        setTotalPrice(discountUsdPrice);
      }
    } else {
      if (selectedCoin === "0") {
        setTotalPrice(ethPricePerToken);
      } else if (selectedCoin === "1" || selectedCoin === "2") {
        setTotalPrice(usdPrice);
      }
    }
  }, [
    isVirtualAttendee,
    isDiscounted,
    selectedCoin,
    ethPricePerToken,
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

      if (selectedCoin === "0") return;

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
          throw Error('Unknown token selected')
      }

      const result: any = await writeContract(config, {
        abi: abi,
        address: contract as Hex,
        functionName: "approve",
        args: [
          NFT_CONTRACT_ADDRESS,
          parseUnits(totalPrice, decimal as number),
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
          e.toString() || "There was a problem with your request.",
      });
      console.warn("ERROR while approve", e);
    }
  };

  // REDIRECT TO MINTED NFT TX
  const handleTxView = (transactionReceipt: any) => {
    router.push(
      `https://arbiscan.io/tx/${transactionReceipt.transactionHash}`
    );
  };

  // REDIRECT TO OPEN SEA
  const handleOpenSeaView = () => {
    router.push(`https://opensea.io/assets/arbitrum/${NFT_CONTRACT_ADDRESS}/${physicalAttendeeCount + virtualAttendeeCount}`);
  };

  // MINTING NFT
  const handleMint = async () => {
    try {
      setIsNFTMinting(true);
      const result = await writeContract(config, {
        abi: NFT_ABI,
        address: NFT_CONTRACT_ADDRESS,
        functionName: "mintToken",
        args: [parseInt(selectedCoin), !isVirtualAttendee],
        value: parseEther(selectedCoin === "0" ? totalPrice : "0"),
      });
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
          <>
            <ToastAction
              onClick={() => handleTxView(transactionReceipt)}
              altText="Try again"
            >
              View Tx
            </ToastAction>
            <ToastAction
              onClick={() => handleOpenSeaView()}
              altText="Try again"
            >
              Open sea
            </ToastAction>
          </>
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
           e.toString() || "There was a problem with your request.",
      });
      console.warn("ERROR while minting the NFT", e);
    }
  };

  const isApproveAmountIsEnoughForMint = parseInt(approvedAmount) >= parseInt(totalPrice);
  const physicalTokensAvailableToMint = maxSupply <= physicalAttendeeCount;
  const hasPendingAction = isNFTMinting || isApproving;
  const showApproveButton = selectedCoin !== '0' && !isApproveAmountIsEnoughForMint && !hasPendingAction;
  const buttonDisabled = (!isVirtualAttendee && (!isWhitelisted || physicalTokensAvailableToMint)) || hasPendingAction || !address;

  return (
    <div className="minting-card-container">
      <div className="flex flex-col items-center justify-center">
        <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-500 rounded">
          {/* <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" /> */}

          <EvervaultCard text="hover" />

          <div className="minting-controls flex flex-col min-w-[300px]">
            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">Minting Status</div>
              <div className="controller-input">
                {isVirtualAttendee ? virtualAttendeeCount : physicalAttendeeCount}{" "} / {isVirtualAttendee ? "∞" : maxSupply}
              </div>
            </div>
            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">{isVirtualAttendee ? "Virtual" : "Physical"} Attendee</div>
              <div className="controller-input">
                <Switch
                  disabled={hasPendingAction}
                  checked={isVirtualAttendee}
                  onCheckedChange={setIsVirtualAttendee}
                />
              </div>
            </div>

            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">Cost</div>
              <div className="controller-input">
                {totalPrice}{" "}
                {selectedCoin === "0" && "ETH"}
                {selectedCoin === "1" && "USDT"}
                {selectedCoin === "2" && "USDC"}
              </div>
            </div>
            <div className="minting-button-section flex w-full space-x-1 mt-4">
              <div className="coin-selector">
                <CoinSelectorDropdown
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                  disabled={hasPendingAction}
                />
              </div>
              <div className="minting-button w-full">
                <Button
                  onClick={!hasPendingAction && isApproveAmountIsEnoughForMint ? handleMint : handleApprove}
                  disabled={buttonDisabled}
                  className="bg-[#061021] text-white hover:bg-[#F6931A] hover:text-white w-full"
                >
                  {!hasPendingAction && (showApproveButton ? "Approve" : "Mint")}
                  {hasPendingAction && <Loader2 className="w-4 h-4 animate-spin" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintingCard;
