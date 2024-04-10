import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Row,
  Space,
  Select,
  Switch,
  notification,
  NotificationArgsProps,
} from "antd";
import React, { useState, useEffect, useMemo } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  RadiusUpleftOutlined,
} from "@ant-design/icons";
import {
  getETHDiscountPriceForToken,
  getETHPrivceForToken,
  getMaxSupply,
  getPhysicalTokenIds,
  getUSDDiscountPriceForToken,
  getUSDPriceForToken,
  getVirtualTokenIds,
  isDiscountedCheck,
  isWhitelistedCheck,
  mintNft,
} from "@/services/blockchain.service";
import {
  createWalletClient,
  custom,
  formatEther,
  Hex,
  http,
  parseEther,
} from "viem";
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { sepolia } from "viem/chains";
import { ABIS } from "@/constants/ABIS";

type NotificationPlacement = NotificationArgsProps["placement"];

const Context = React.createContext({ name: "Default" });

const MintingCard = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  const { writeContract } = useWriteContract();

  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [isDiscounted, setIsDiscounted] = useState<boolean>(false);
  const [isVirtualAttendent, setIsVirtualAttendent] = useState<boolean>(false);
  const [physicalAttendentCount, setPhysicalAttendentCount] = useState(0);
  const [virtualAttendentCount, setVirtualAttendentCount] = useState(0);
  const [maxSupply, setMaxSupply] = useState<string | undefined>("0");
  const [mintCurrency, setMintCurrency] = useState("ETH");
  const [ethPrice, setEthPrice] = useState("0");
  const [discountEthPrice, setDiscountEthPrice] = useState("0");
  const [usdPrice, setUsdPrice] = useState("0");
  const [discountUsdPrice, setDiscountUsdPrice] = useState("0");
  const [totalEthPrice, setTotalEthPrice] = useState("0");
  const [isMintingLoading, setIsMintingLoading] = useState(false);

  const [txHash, setTxHash] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any>(null);

  const [api, contextHolder] = notification.useNotification();

  const successNotification = ({ message }: { message: string }) => {
    const placement: NotificationPlacement = "topRight";
    api.success({
      message: `${message}`,
      // description: <Context.Consumer>{({name}) => `${name}`}</Context.Consumer>,
      placement,
    });
  };

  const errorNotification = (message: any) => {
    const placement: NotificationPlacement = "topRight";
    api.error({
      message: `${message}`,
      // description: <Context.Consumer>{({name}) => `${name}`}</Context.Consumer>,
      placement,
    });
  };

  const fetchMaxSupply = async () => {
    const data = await getMaxSupply();
    console.log("max supply", data?.toString());

    setMaxSupply(data?.toString());
  };

  const fetchPhysicalAttendentCount = async () => {
    const data = await getPhysicalTokenIds();
    setPhysicalAttendentCount(data?.length || 0);
  };

  const fetchVirtualAttendentCount = async () => {
    const data = await getVirtualTokenIds();
    setVirtualAttendentCount(data?.length || 0);
  };

  const fetchEthPriceForToken = async () => {
    const data = await getETHPrivceForToken();
    setEthPrice(data ? formatEther(data) : "0");
  };

  const fetchETHDiscountPriceForToken = async () => {
    const data = await getETHDiscountPriceForToken();
    setDiscountEthPrice(data ? formatEther(data) : "0");
  };

  const fetchUSDPriceForToken = async () => {
    const data = await getUSDPriceForToken();
    setUsdPrice(
      (parseInt(data?.toString() || "0") / 1000000).toString() || "0"
    );
  };

  const fetchUSDDiscountPriceForToken = async () => {
    const data = await getUSDDiscountPriceForToken();
    setDiscountUsdPrice(
      (parseInt(data?.toString() || "0") / 1000000).toString() || "0"
    );
  };

  const fetchIsWhitelisted = async () => {
    const data = await isWhitelistedCheck(address as Hex);
    console.log("is whitelisted", data);
    setIsWhitelisted(data || false);
  };

  const fetchIsDiscounted = async () => {
    const data = await isDiscountedCheck(address as Hex);
    setIsDiscounted(data || false);
  };

  useEffect(() => {
    fetchMaxSupply();
    fetchEthPriceForToken();
    fetchETHDiscountPriceForToken();
    fetchUSDPriceForToken();
    fetchUSDDiscountPriceForToken();
  }, []);

  useEffect(() => {
    if (address && !isVirtualAttendent) {
      fetchIsWhitelisted();
      fetchIsDiscounted();
    }
  }, [address, isVirtualAttendent]);

  useEffect(() => {
    if (isVirtualAttendent) {
      setMaxSupply("∞");
      fetchVirtualAttendentCount();
    } else {
      fetchMaxSupply();
      fetchPhysicalAttendentCount();
    }
  }, [isVirtualAttendent]);

  useEffect(() => {
    if (isVirtualAttendent) {
      setIsDiscounted(true);
    }
  }, [isVirtualAttendent]);

  useEffect(() => {
    if (mintCurrency === "ETH" && !isDiscounted) {
      setTotalEthPrice(ethPrice);
    } else if (mintCurrency === "ETH" && isDiscounted) {
      setTotalEthPrice(discountEthPrice);
    }

    if (mintCurrency === "USDT" || (mintCurrency === "USDC" && !isDiscounted)) {
      setTotalEthPrice(usdPrice);
    } else if (
      mintCurrency === "USDT" ||
      (mintCurrency === "USDC" && isDiscounted)
    ) {
      setTotalEthPrice(discountUsdPrice);
    }
  }, [
    mintCurrency,
    isDiscounted,
    ethPrice,
    discountEthPrice,
    usdPrice,
    discountUsdPrice,
  ]);

  const handleMint = async () => {
    setIsMintingLoading(true);
    // const result = await mintNft(
    // totalEthPrice,
    // mintCurrency,
    // !isVirtualAttendent
    // );

    // console.log("mint result ###", result);

    // if (result?.status === "success") {
    // successNotification({ message: "Successfully Minted" });
    // } else {
    // errorNotification(result?.data?.cause?.shortMessage);
    // }

    setIsMintingLoading(true);
    const hash: string = await writeContract({
      abi: ABIS.NFT,
      address: process.env.NEXT_PUBLIC_NFT_CONTRACT as Hex,
      functionName: "mintToken",
      args: [mintCurrency, !isVirtualAttendent],
      value: parseEther("0.0225"),
    });

    console.log("hash", hash);
    setTxHash(hash);
    setIsMintingLoading(false);


    const result = useWaitForTransactionReceipt({
      hash: hash as unknown as Hex,
    });

    console.log("mint result ###", result);

    setIsMintingLoading(false);
  };

  const contextValue = useMemo(() => ({ name: "Successfully Minted" }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Card
        size={"small"}
        className="minting-card mx-auto "
        data-aos="fade-up"
        style={{
          maxWidth: "338px",
          padding: "3px",
          margin: "auto",
        }}
      >
        <Space direction="vertical" size={20}>
          <Image
            preview={false}
            src="/images/logo.png"
            alt="logo"
            width={"100%"}
            style={{
              border: "1px solid #222",
              padding: "20px",
              background: "#222",
              borderRadius: "8px",
            }}
          />
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              Remaining
            </div>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              {isVirtualAttendent
                ? virtualAttendentCount + " "
                : physicalAttendentCount}
              / {maxSupply}
            </div>
          </Space>
          {/* <Space
  direction="horizontal"
  style={{
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  }}
  >
  <Button
  size="large"
  onClick={() => handleChange(mintingNftCount, "sub")}
  style={{
  backgroundColor: "#4648d8",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  }}
  >
  <MinusOutlined />
  </Button>
  <Input
  size="large"
  style={{ textAlign: "center" }}
  value={mintingNftCount}
  readOnly
  />
  <Button
  size="large"
  onClick={() => handleChange(mintingNftCount, "add")}
  style={{ backgroundColor: "#4648d8", border: "none" }}
  >
  <PlusOutlined />
  </Button>
  </Space> */}
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              Virtual Attendent
            </div>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              value={isVirtualAttendent}
              onChange={setIsVirtualAttendent}
            />
          </Space>
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>Total</div>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              {totalEthPrice} {mintCurrency}
            </div>
          </Space>
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Select
              size="large"
              value={mintCurrency}
              onChange={setMintCurrency}
              style={{ width: "100%" }}
              options={[
                {
                  disabled: false,
                  value: "USDC",
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        gap: "2px",
                      }}
                    >
                      <img src={"/images/usdc.png"} width={20} height={20} />
                      {isDiscounted ? discountUsdPrice : usdPrice} USDC
                    </div>
                  ),
                },
                {
                  disabled: false,
                  value: "ETH",
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        gap: "2px",
                      }}
                    >
                      <img src={"/images/eth.png"} width={20} height={20} />
                      {isDiscounted ? discountEthPrice : ethPrice} ETH
                    </div>
                  ),
                },
                {
                  disabled: false,
                  value: "USDT",
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        gap: "2px",
                      }}
                    >
                      <img src={"/images/usdt.png"} width={20} height={20} />
                      {isDiscounted ? discountUsdPrice : usdPrice} USDT
                    </div>
                  ),
                },
              ]}
            />

            <Button
              className="orangeButton"
              size="large"
              type="primary"
              style={{
                backgroundColor: "#F6931A",
                fontWeight: "bold",
                width: "100%",
              }}
              disabled={!isVirtualAttendent && !isWhitelisted}
              onClick={() => handleMint()}
              loading={isMintingLoading}
            >
              Mint Now
            </Button>
          </Space>
        </Space>
      </Card>
    </Context.Provider>
  );
};

export default MintingCard;