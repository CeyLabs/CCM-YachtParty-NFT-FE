import React, { useEffect, useState } from "react";
import {
  Spin,
  Col,
  Button,
  Card,
  InputNumber,
  Space,
  notification,
  Select,
} from "antd";
import "./MintingCard.css";
// import rfcNftEagle from "../../images/RFC-NFT-Eagle.gif";
// import rfcNftEagle from "../../images/nft-loop.webm";
import image1 from "../../images/shuffle/5.png";
import image2 from "../../images/shuffle/23.png";
import image3 from "../../images/shuffle/29.png";
import image4 from "../../images/shuffle/73.png";
import image5 from "../../images/shuffle/80.png";
import image6 from "../../images/shuffle/126.png";
import image7 from "../../images/shuffle/140.png";
import image8 from "../../images/shuffle/169.png";
import image9 from "../../images/shuffle/367.png";
import image10 from "../../images/shuffle/450.png";
import image11 from "../../images/shuffle/773.png";
import image12 from "../../images/shuffle/852.png";
import image13 from "../../images/shuffle/1003.png";
import usdcLogo from "../../images/coin/usdc.png";
import ethLogo from "../../images/coin/eth.png";
import usdtLogo from "../../images/coin/usdt.png";
import { readContract, writeContract, prepareWriteContract } from "@wagmi/core";
// import { nftConfig } from "../../blockchain/nft.config";
import { useAccount } from "wagmi";
import { formatEther, formatUnits, parseEther } from "viem";
// import { utils } from 'ethers';
// import api from "../../Services/Api";
// import '../TrendingNFTItem/TrendingNFTItem.css'
import WalletConnectMint from "../WalletConnectButton/WalletConnectMint";
// import NumberFormat from 'react-number-format';

function MintingCard(props) {
  const { referralAddress, isHaveReferral } = props;
  const { address, isConnected } = useAccount();

  const [count, setCount] = useState(1);

  const [totalMinted, setTotalMinted] = useState(0);
  const [remainingNfts, setRemainingNfts] = useState(0);
  const [isTotalMintedNftCountLoading, setIsTotalMintedNftCountLoading] =
    useState(false);

  const [totalSupply, setTotalSupply] = useState(0);
  const [isTotalSupplyLoading, setIsTotalSupplyLoading] = useState(false);

  const [mintingPrice, setMintingPrice] = useState(0);
  const [isMintingPirceLoading, setIsMintingPriceLoading] = useState(false);

  const [isMintingAvailable, setIsMintingAvailable] = useState(false);
  const [isMintingLoading, setIsMintingLoading] = useState(false);
  const [mintedNftIds, setMintedNftIds] = useState(0);

  const [availableNFtIds, setAvailableNFtIds] = useState([]);
  const [selectedNftIdsToMint, setSelectedNftIdsToMint] = useState([]);

  const [calculatedTotalAmountInWei, setCalculatedTotalAmountInWei] =
    useState(0);
  const [totalAmountInWei, setTotalAmountInWei] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [totalValue, setTotalValue] = useState(1);
  const [realValue, setRealValue] = useState(1);
  const [referalPercentage, setReferalPercentage] = useState(0);
  const [referralDiscount, setReferralDiscount] = useState(0.05);
  const [totalValueIncludingDiscount, setTotalValueIncludingDiscount] =
    useState(0.95);
  const [isSpecialUser, setIsSpecialUser] = useState(false);
  const [isSpecialUserLoading, setIsSpecialUserLoading] = useState(false);

  useEffect(() => {
    // Start the interval to shuffle images every 3 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 800);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    getIsSpecial();
  }, [address]);

  useEffect(() => {
    if (isSpecialUser) {
      setTotalValueIncludingDiscount(0.09);
      setReferralDiscount(0.01);
    }
  }, [isSpecialUser]);

  const getIsSpecial = async () => {
    setIsSpecialUserLoading(true);
    try {
      // const isSpecialResopnse = await readContract({
      //   address: nftConfig.mintingContractAddress,
      //   abi: nftConfig.MintingContractABI,
      //   functionName: "isSpecial",
      //   args: [address]
      // })

      // getReferalPercentage(isSpecialResopnse)
      // if (isSpecialResopnse) {
      //   setIsSpecialUser(true)
      // } else {
      //   setIsSpecialUser(false)
      // }
      setIsSpecialUserLoading(false);
    } catch (error) {
      console.warn("Error getting isSpecial: ", error);
      // setTotalSupply(0);
      setIsSpecialUserLoading(false);
    }
  };

  useEffect(() => {
    getMaxNFTSupply();
    getMintPrice();
    getTotalMintedNftCount();
    getMintedNftIds();
  }, []);

  // testing purpose
  useEffect(() => {
    getMintedNftIds();
    getTotalMintedNftCount();
  }, [count]);

  // max NFT supply
  const getMaxNFTSupply = async () => {
    console.log("minting price : 2");
    setIsTotalSupplyLoading(true);
    try {
      // const totalSupplyResponse = await readContract({
      //   address: nftConfig.mintingContractAddress,
      //   abi: nftConfig.MintingContractABI,
      //   functionName: "MAX_NFT_SUPPLY",
      //   args: [],
      // });
      // console.log('minting price : 3');

      // setTotalSupply(totalSupplyResponse?.toString());
      // setTotalSupply(1057)

      setIsTotalSupplyLoading(false);
    } catch (e) {
      console.warn("Error getting max NFt supply: ", e);
      // setTotalSupply(0);
      setIsTotalSupplyLoading(false);
    }
  };

  // total minted NFT count
  const getTotalMintedNftCount = async () => {
    setIsTotalMintedNftCountLoading(true);

    try {
      // const totalMintedResponse = await readContract({
      //   address: nftConfig.mintingContractAddress,
      //   abi: nftConfig.MintingContractABI,
      //   functionName: "totalSupply"
      // });

      // setTotalMinted(totalMintedResponse?.toString());
      setIsTotalMintedNftCountLoading(false);
    } catch (e) {
      console.warn("Error getting Total minted NFT count: ", e);
      setTotalMinted(0);
      setIsTotalMintedNftCountLoading(false);
    }
  };

  // get minted NFT IDs
  const getMintedNftIds = async () => {
    try {
      // const getMintedNftIdsResponse = await readContract({
      //   address: nftConfig.mintingContractAddress,
      //   abi: nftConfig.MintingContractABI,
      //   functionName: "getMintedIds",
      // });

      // setMintedNftIds(getMintedNftIdsResponse.toString())
      console.log("minted NFT Ids: ", mintedNftIds);
    } catch (e) {
      console.warn("Error getting Minted NFT Ids: ", e);
    }
  };

  useEffect(() => {
    if (totalSupply && totalMinted) {
      let remaining = parseFloat(totalSupply) - parseFloat(totalMinted);
      setRemainingNfts(remaining);
    }
  }, [totalMinted, totalSupply]);

  // get minting price
  const getMintPrice = async () => {
    console.log("minting price: 1");
    setIsMintingPriceLoading(true);
    try {
      // const mintPriceResponse = await readContract({
      //   address: nftConfig.mintingContractAddress,
      //   abi: nftConfig.MintingContractABI,
      //   functionName: "MINT_PRICE",
      //   args: []
      // })
      // console.log("minting price: ", mintPriceResponse);

      //format the amount to 18 decimals
      // const formattedFeeRate = formatEther(mintPriceResponse?.toString());
      // setMintingPrice(formattedFeeRate)
      // if (isHaveReferral) {
      //   let totalVale = formattedFeeRate - (formattedFeeRate * (parseFloat(referalPercentage) / 100))
      //   let referralDiscount = formattedFeeRate * (parseFloat(referalPercentage) / 100)
      //   setTotalValueIncludingDiscount(totalVale)
      //   setRealValue(formattedFeeRate)
      //   setReferralDiscount(referralDiscount)
      // } else {
      //   setTotalValue(formattedFeeRate)
      // }

      setIsMintingPriceLoading(false);
    } catch (e) {
      console.log("Error getting Minting Price: ".e);
      setIsMintingPriceLoading(true);
    }
  };

  const getReferalPercentage = async (isSpecial) => {
    setIsTotalSupplyLoading(true);
    try {
      let referalPercentage = 0;
      if (isSpecial) {
        // const referalPercentageResponse = await readContract({
        //   address: nftConfig.mintingContractAddress,
        //   abi: nftConfig.MintingContractABI,
        //   functionName: "specialReferal"
        // });
        // referalPercentage = referalPercentageResponse.toString()
        // setReferalPercentage(referalPercentage);
      } else {
        // const referalPercentageResponse = await readContract({
        //   address: nftConfig.mintingContractAddress,
        //   abi: nftConfig.MintingContractABI,
        //   functionName: "referalDiscount"
        // });
        // referalPercentage = referalPercentageResponse.toString()
        // setReferalPercentage(referalPercentage);
      }

      setIsTotalSupplyLoading(false);
    } catch (e) {
      console.warn("Error getting Referal Percentage: ", e);
      setReferalPercentage(0);
      setIsTotalSupplyLoading(false);
    }
  };

  const generateRandomNumbers = (counter) => {
    const min = 1;
    const max = 1057;
    const newRandomNumbers = [];

    for (let i = 0; i < counter; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      if (mintedNftIds.includes(randomNum)) {
        // lower the count
        i--;
      } else {
        newRandomNumbers.push(randomNum);
      }
    }

    return newRandomNumbers;
  };

  // handle NFT Minting
  const handleNFTMinting = async () => {
    try {
      setIsMintingLoading(true);

      const nftIdtoMint = generateRandomNumbers(count);

      const totalAmount = isHaveReferral
        ? parseFloat(totalValueIncludingDiscount)
        : parseFloat(mintingPrice) * parseFloat(count);

      //convert to wei
      const totalAmountInWei = parseEther(totalAmount.toString());
      setCalculatedTotalAmountInWei(totalAmountInWei.toString());

      // mint NFT
      // const { hash, wait } = await writeContract({
      //   address: nftConfig.mintingContractAddress,
      //   abi: nftConfig.MintingContractABI,
      //   functionName: "mintNFT",
      //   args: [count, nftIdtoMint, referralAddress],
      //   // value: totalAmountInWei,
      //   overrides: {
      //     value: totalAmountInWei
      //   }
      // })

      // await wait();

      // console.log("NFT minting hash", hash);
      // console.log("NFT minting yx", tx);

      // write minted NFT data to backend

      // const nftData = {
      //   noOfNfts: count,
      //   nftIds: nftIdtoMint,
      //   nftOwnerAddress: address
      // };

      // api.post('/burn-nft/save-details', nftData)
      //   .then((response) => {
      //     console.log('Data has been written to the backend', response);

      //     // succes message
      //   })
      //   .catch((error) => {
      //     console.error('Error data writting to the backend', error);
      //   });

      notification["success"]({
        message: "The NFTs are successfully minted",
        role: "status",
      });

      setIsMintingLoading(false);
      setIsMintingAvailable(false);
      setCount(1);
      getTotalMintedNftCount();
    } catch (e) {
      console.warn("Fail to mint NFT ", e);
      notification.error({
        message: "Error",
        description: `Error minting NFT : ${e.data.message}`,
        role: "status",
      });
      setIsMintingLoading(false);
      setIsMintingAvailable(false);
    }
  };

  // count increament
  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    let totalValue = parseFloat(mintingPrice) * parseFloat(count);
    let totalRealValue = parseFloat(mintingPrice) * parseFloat(count);
    console.log("totalValue", totalValue);
    if (isHaveReferral) {
      console.log("totalValue 2", totalValue);
      totalValue =
        totalValue - (totalValue * parseFloat(referalPercentage)) / 100;
      let referralDiscount = totalValue * (referalPercentage / 100);
      setReferralDiscount(referralDiscount);
      console.log("totalValue 4", referalPercentage);
      setTotalValueIncludingDiscount(totalValue);
      setRealValue(totalRealValue);
    } else {
      console.log("totalValue 3", totalValue);
      setTotalValue(totalValue);
    }
  }, [count]);

  //count decrement
  const decrement = () => {
    if (count != 1) {
      setCount(count - 1);
    }
  };

  // handle count change on click
  const handleCountChange = (value) => {
    setCount(value);
  };
  return (
    <Card
      size={"small"}
      className="minting-card mx-auto "
      data-aos="fade-up"
      style={{ maxWidth: "400px" }}
    >
      <Space direction="vertical" size={5}>
        <div className="img-wrapper nft-img-wrapper mb-3">
          {/* <video width="310" height="300" autoPlay loop>
            <source src={rfcNftEagle} type="video/webm" />
          </video> */}
          <img
            className="img-fluid rounded nft-img"
            src={
              currentImageIndex === 0
                ? image1
                : currentImageIndex === 1
                ? image2
                : currentImageIndex === 2
                ? image3
                : currentImageIndex === 3
                ? image4
                : currentImageIndex === 4
                ? image5
                : currentImageIndex === 5
                ? image6
                : currentImageIndex === 6
                ? image7
                : currentImageIndex === 7
                ? image8
                : currentImageIndex === 8
                ? image9
                : currentImageIndex === 9
                ? image10
                : currentImageIndex === 10
                ? image11
                : currentImageIndex === 11
                ? image12
                : image13
            }
            alt={`NFT Image ${currentImageIndex + 1}`}
          />
          {/* <img className='img-fluid rounded nft-img' src={rfcNftEagle} /> */}
        </div>
        <div className="no-of-items d-flex justify-content-between my-2">
          <span>Remaining</span>
          <div>
            {isMintingPirceLoading && isTotalMintedNftCountLoading ? (
              <Spin size="small" />
            ) : (
              <>
                <span>
                  {isTotalMintedNftCountLoading ? (
                    <Spin size="small" />
                  ) : (
                    remainingNfts
                  )}
                </span>
                <span>/</span>
                <span>
                  {isTotalSupplyLoading ? <Spin size="small" /> : totalSupply}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="input-wrapper d-flex mb-2">
          <Button
            size="large"
            type="primary"
            onClick={decrement}
            disabled={isMintingPirceLoading || isMintingLoading}
          >
            -
          </Button>
          <InputNumber
            size="large"
            min={1}
            max={10}
            value={count}
            className="flex-grow-1 mx-2"
            onChange={handleCountChange}
            disabled={isMintingPirceLoading || isMintingLoading}
          />
          <Button
            size="large"
            type="primary"
            onClick={increment}
            disabled={isMintingPirceLoading || isMintingLoading}
          >
            +
          </Button>
        </div>
        {isHaveReferral ? (
          <div className="total-row my-2">
            <div className="d-flex justify-content-between">
              <span>NFT amount </span>
              {/* <NumberFormat
                  value={realValue}
                  thousandSeparator={true}
                  decimalScale={4}
                  displayType={'text'}
                  suffix=" BNB"
                /> */}
            </div>
            <div className=" value ">
              <div className="d-flex justify-content-between">
                <span>Referral Discount</span>
                {/* <NumberFormat
                    value={referralDiscount}
                    thousandSeparator={true}
                    decimalScale={4}
                    displayType={'text'}
                    suffix=" BNB"
                  /> */}
              </div>
            </div>
            <div className="total-row d-flex justify-content-between total-amounts">
              <div>Total</div>
              <div className="value">
                <span className="d-flex justify-content-end">
                  {isMintingPirceLoading ? (
                    <Spin size="small" />
                  ) : (
                    // <NumberFormat
                    //   value={totalValueIncludingDiscount}
                    //   thousandSeparator={true}
                    //   decimalScale={4}
                    //   displayType={'text'}
                    //   suffix=" BNB"
                    // />
                    <></>
                  )}
                </span>
                {/* <span className="curreny"> BNB</span> */}
              </div>
            </div>
          </div>
        ) : (
          <div className="total-row d-flex justify-content-between total-amounts mb-2">
            <div className="">Total</div>
            <div className="value">
              <span className="d-flex justify-content-end">
                {isMintingPirceLoading ? (
                  <Spin size="small" />
                ) : (
                  // <NumberFormat
                  //   value={totalValue}
                  //   thousandSeparator={true}
                  //   decimalScale={4}
                  //   displayType={'text'}
                  //   suffix=" BNB"
                  // />
                  <></>
                )}
              </span>
              {/* <span className="curreny"> BNB</span> */}
            </div>
          </div>
        )}

        <div className="cta-btn-row d-flex gap-2">
          <Select
            size="large"
            type="primary"
            block
            className="w-100 buynow-btn"
            style={{ height: "46px" }}
            defaultValue="USDC"
            // onChange={handleChange}
            options={[
              {
                value: "USDC",
                label: (
                  <div className="d-flex justify-content-left align-items-center gap-2 ">
                    <img src={usdcLogo} width={20} height={20} />
                    100 USDC
                  </div>
                ),
              },
              {
                value: "ETH",
                label: (
                  <div className="d-flex justify-content-left align-items-center gap-2 ">
                    <img src={ethLogo} width={20} height={20} />
                    0.03 ETH
                  </div>
                ),
              },
              {
                value: "USDT",
                label: (
                  <div className="d-flex justify-content-left align-items-center gap-2 ">
                    <img src={usdtLogo} width={20} height={20} />
                    100 USDT
                  </div>
                ),
              },
            ]}
          />
          {isConnected && !isMintingPirceLoading ? (
            <Button
              size="large"
              type="primary"
              block
              loading={isMintingLoading}
              onClick={handleNFTMinting}
              className="buynow-btn"
            >
              Mint
            </Button>
          ) : (
            <WalletConnectMint />
          )}
        </div>
      </Space>
    </Card>
  );
}

export default MintingCard;
