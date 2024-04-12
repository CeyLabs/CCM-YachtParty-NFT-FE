"use client";

import MintingCard from "@/components/home/MintingCard";
import { Checkbox, Col, Image, Row, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import axios from "axios";

const HomeView: React.FC = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  const [walletAgeChecked, setWalletAgeChecked] = useState(false);
  const [walletAgeDisabled, setWalletAgeDisabled] = useState(true);

  const [PortfolioBalanceChecked, setPortfolioBalanceChecked] = useState(false);
  const [PortfolioBalanceDisabled, setPortfolioBalanceDisabled] =
    useState(true);

  const [holdingNftsChecked, setHoldingNftsChecked] = useState(true);
  const [holdingNftsDisabled, setHoldingNftsDisabled] = useState(true);

  const [profileInBTC, setProfileInBTC] = useState(0);

  const getProfileInBTC = async () => {
    try {
      const options = {
        headers: {
          accept: "application/json",
          authorization: `Basic ${process.env.NEXT_PUBLIC_ZERION_API_KEY}`,
        },
      };
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_ZERION_BASE_URL
        }/wallets/${`${address}`}/portfolio?currency=btc`,
        options
      );

      if (response.status === 200) {
        setProfileInBTC(
          response?.data?.data?.attributes?.positions_distribution_by_type
            ?.wallet
        );
      }
      console.log(
        "response btc",
        response?.data?.data?.attributes?.positions_distribution_by_type?.wallet
      );
    } catch (error) {
      console.log("Error while fetching profile", error);
    }
  };

  useEffect(() => {
    if (address) {
      getProfileInBTC();
    }
  }, [address, chainId]);

  useEffect(() => {
    if (profileInBTC > 1) {
      setPortfolioBalanceChecked(true);
      setPortfolioBalanceDisabled(false);
    } else {
      setPortfolioBalanceChecked(false);
      setPortfolioBalanceDisabled(true);
    }
  }, [profileInBTC]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Row>
        <Col
          className="col-hidden"
          xs={24}
          sm={24}
          md={7}
          lg={7}
          xl={8}
          xxl={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "5px",
            marginTop: "20px",
          }}
        >
          <Space direction="vertical" size={30}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Image
                src="/images/point.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <div style={{ fontSize: "16px" }}>
                Ceylon Halving Yacht Party
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Image
                src="/images/point.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <div style={{ fontSize: "16px" }}>
                Ceylon Halving Yacht Party
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Image
                src="/images/point.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <div style={{ fontSize: "16px" }}>
                Ceylon Halving Yacht Party
              </div>
            </div>
          </Space>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          xl={8}
          xxl={8}
          style={{ padding: "5px", marginTop: "20px" }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              fontFamily:"Exo",
              textAlign: "center",
              marginBottom: "20px",
              color:"#F6931A"
            }}
          >
            Mint Your NFT
          </h1>
          <MintingCard />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={7}
          lg={7}
          xl={8}
          xxl={8}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "5px",
            marginTop: "20px",
          }}
        >
          <Space direction="vertical" size={30}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Checkbox checked={walletAgeChecked} disabled={walletAgeDisabled}>
                Wallet Aged more than (XXX) Days
              </Checkbox>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Checkbox
                checked={PortfolioBalanceChecked}
                disabled={PortfolioBalanceDisabled}
              >
                Portfolio Balance is More than 1 BTC ({profileInBTC} BTC)
              </Checkbox>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Checkbox
                checked={holdingNftsChecked}
                disabled={holdingNftsDisabled}
              >
                Holding the{" "}
                <Link
                  target="_blank"
                  href="https://opensea.io/collection/ceylon-crypto-meetup"
                  style={{color:"#F6931A"}}
                >
                  Genesis CCM NFT
                </Link>{" "}
                (25% Offer)
              </Checkbox>
            </div>
          </Space>
        </Col>
        <Col
          className="col-show-mobile"
          xs={24}
          sm={24}
          md={7}
          lg={7}
          xl={8}
          xxl={8}
          style={{
            display: "none",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "5px",
            marginTop: "20px",
          }}
        >
          <Space direction="vertical" size={30}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Image
                src="/images/point.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <div style={{ fontSize: "16px" }}>
                Ceylon Halving Yacht Party
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Image
                src="/images/point.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <div style={{ fontSize: "16px" }}>
                Ceylon Halving Yacht Party
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Image
                src="/images/point.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <div style={{ fontSize: "16px" }}>
                Ceylon Halving Yacht Party
              </div>
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default HomeView;
