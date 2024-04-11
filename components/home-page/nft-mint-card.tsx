"use client"
import React, { useState } from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { NFT_ABI, NFT_CONTRACT_ADDRESS } from "@/config/blockchain";
import { parseEther } from "viem";
import { useConfig } from 'wagmi'
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation";

const CoinSelectorDropdown = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>("ETH")

  const coins = [
    {
      value: "ETH",
      label: "ETH",
      image: "/images/coins/eth.png"
    },
    {
      value: "USDC",
      label: "USDC",
      image: "/images/coins/usdc.png"
    },
    {
      value: "USDT",
      label: "USDT",
      image: "/images/coins/usdt.png"
    },
  ]

  return (
    <Select onValueChange={(coin) => setSelectedCoin(coin)} value={selectedCoin}>
      <SelectTrigger className="w-[150px] border border-white/[0.2] text-slate-200">
        <SelectValue placeholder="Select a coin" />
      </SelectTrigger>
      <SelectContent className="border border-white/[0.2]" onSelect={(e) => console.log(e)}>
        <SelectGroup className="text-slate-200 ">
          {
            coins.map((coin, index) => (
              <SelectItem key={index} value={coin.value}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image src={coin.image} alt={coin.label} width={20} height={20} className="mr-2" />
                    <div>{coin.label}</div>
                  </div>
                </div>
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const MintingCard = () => {

  const [isNFTMinting, setIsNFTMinting] = useState<boolean>(false)
  // const { writeContractAsync } = useWriteContract()
  const config = useConfig()
  const { toast } = useToast()
  const router = useRouter()

  const handleTxView = (transactionReceipt: any) => {
    router.push(`https://sepolia.etherscan.io/tx/${transactionReceipt.transactionHash}`)
    console.log("transactionReceipt", transactionReceipt)
  }

  const handleMinting = async () => {
    try {
      setIsNFTMinting(true)
      const result = await writeContract(config, {
        abi: NFT_ABI,
        address: NFT_CONTRACT_ADDRESS,
        functionName: 'mintToken',
        args: [
          'ETH',
          false
        ],
        value: parseEther('0.0225')
      })
      console.log("result", result)
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      })
      setIsNFTMinting(false)
      toast({
        title: "Congratulations!",
        style: { background: "#061021", color: "#FFF", border: "1px solid #061021" },
        description: "Token minted successfully.",
        action: <ToastAction onClick={() => handleTxView(transactionReceipt)} altText="Try again">View Tx</ToastAction>
      })
    } catch (e: any) {
      setIsNFTMinting(false)
      toast({
        title: "Uh oh! Something went wrong.",
        style: { background: "#061021", color: "#FFF", border: "1px solid #061021" },
        description: e?.errorMessage || "There was a problem with your request.",
      })
      console.warn("ERROR while minting the NFT", e)
    }
  }

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
                0/50
              </div>
            </div>
            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">Virtual Attendant</div>
              <div className="controller-input">
                <Switch />
              </div>
            </div>

            <div className="controller-row flex text-slate-200 justify-between items-center my-2">
              <div className="controller-label">Cost</div>
              <div className="controller-input">
                0.001 ETH
              </div>
            </div>

            <div className="minting-button-section flex w-full space-x-1 mt-4">
              <div className="coin-selector">
                <CoinSelectorDropdown />
              </div>
              <div className="minting-button w-full">
                {
                  isNFTMinting ? (
                    <Button
                      disabled
                      className="bg-[#061021] text-white hover:bg-[#F6931A] hover:text-white w-full">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleMinting}
                      className="bg-[#061021] text-white hover:bg-[#F6931A] hover:text-white w-full">Mint</Button>
                  )
                }

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export default MintingCard;