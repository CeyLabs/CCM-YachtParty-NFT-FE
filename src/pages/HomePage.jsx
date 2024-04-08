import React, { useEffect, useState, useRef } from "react";
// import MintingCard from "../../components/MintingCard/MintingCard";
import "./HomePage.css";
import { Container, Row, Col } from "reactstrap";
import { Button, Space, Carousel, Checkbox } from "antd";
// import pinkswapLogo from "../../images/logos_rfc/ps.png";
// import gempadLogo from "../../images/logos_rfc/gp.png";
// import childSupportLogo from "../../images/logos_rfc/cs.png";
// import dxsaleLogo from "../../images/logos_rfc/dxs.png";
// import hulkGems from "../../images/logos_rfc/hgc.png";
import AOS from "aos";
// import "aos/dist/aos.css";
// import walletIcon from "../../images/Wallet.svg";
// import UploadIcon from "../../images/Paper-Upload.svg";
// import NFTslider from "../../components/NFTslider/NFTslider";
// import Socialicons from "../../components/Socialicons/Socialicons";
import { Link } from "react-router-dom";
// import SwiperComp from "./SwiperComp";
import { useSelector } from "react-redux";
import { useAccount, useChainId } from "wagmi";
import MintingCard from "../components/MintingCard/MintingCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAccountProfile } from "../redux/accountProfileSlice";

function HomePage() {
  const [walletAgeChecked, setWalletAgeChecked] = useState(true);
  const [walletAgeDisabled, setWalletAgeDisabled] = useState(false);

  const [PortfolioBalanceChecked, setPortfolioBalanceChecked] = useState(false);
  const [PortfolioBalanceDisabled, setPortfolioBalanceDisabled] =
    useState(true);

  const [holdingNftsChecked, setHoldingNftsChecked] = useState(true);
  const [holdingNftsDisabled, setHoldingNftsDisabled] = useState(true);

  const [profileInBTC, setProfileInBTC] = useState(0);
  const accountProfile = useSelector((state) => state.accountProfile);

  const { address } = useAccount();
  const { chainId } = useChainId();
  const mintSectionRef = useRef(null);
  const dispatch = useDispatch();

  const scrollToMintSection = () => {
    mintSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [referralAddress, setReferralAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [isHaveReferral, setIsHaveReferral] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
      offset: 20,
    });
  }, []);

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Split the URL based on the '?' character
    const urlParts = currentUrl.split("?");

    // Check if there are query parameters
    if (urlParts.length > 1) {
      // Get the part after the '?' which contains the query parameters
      const queryParams = urlParts[1];

      // Split the query parameters based on the '&' character
      const paramPairs = queryParams.split("&");

      // Find the 'ref' parameter
      const refParamPair = paramPairs.find((pair) => pair.startsWith("ref="));

      if (refParamPair) {
        // Extract the value of the 'ref' parameter
        const refParam = refParamPair.split("=")[1];

        if (address === refParam) {
          setReferralAddress("0x0000000000000000000000000000000000000000");
          setIsHaveReferral(false);
        } else {
          setReferralAddress(refParam);
          setIsHaveReferral(true);
        }
      }
    }
  }, []);

  const getProfileInBTC = async () => {
    try {
      const options = {
        headers: {
          accept: "application/json",
          authorization:
            "Basic emtfZGV2X2JkNzgxMGMzMTIwMjQ0NDdiZDZhYWE5NDg3YjE0ZTg3Og==",
        },
      };
      const response = await axios.get(
        `https://api.zerion.io/v1/wallets/${`${address}`}/portfolio?currency=btc`,
        options
      );

      if (response.status === 200) {
        setProfileInBTC(
          response?.data?.data?.attributes?.positions_distribution_by_type
            ?.wallet
        );
        dispatch(
          updateAccountProfile({
            btcBalance:
              response?.data?.data?.attributes?.positions_distribution_by_type
                ?.wallet,
          })
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
    }else{
      setPortfolioBalanceChecked(false);
      setPortfolioBalanceDisabled(true);
    }
  }, [profileInBTC]);

  return (
    <>
      <section
        ref={mintSectionRef}
        className="mint-section d-flex flex-row justify-content-center align-items-center"
      >
        <Container>
          <Row>
            <Col className="" md={12}>
              <h2 className="section-title text-center" data-aos="fade-up">
                Mint Your NFT
              </h2>
            </Col>
          </Row>
          <Row className="gx-0 gx-lg-5 justify-content-center align-items-center">
            <Col className="text-white p-4 pb-0 p-md-0" md={4}>
              <div className="benefits-section content-paragraph-type-1 ">
                <div
                  className="benefit-item"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  {/* <p>Benefit of early access to future collections and exclusive access to a range of perks.</p> */}
                  <p>Sri Lanka’s First yacht Party.</p>
                </div>
                <div
                  className="benefit-item"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {/* <p>Receive invitations to exclusive events of a passionate community.</p> */}
                  <p>Sri Lanka’s First yacht Party.</p>
                </div>
                <div
                  className="benefit-item"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {/* <p>Opportunity to participate in community-driven decision-making processes.</p> */}
                  <p>Sri Lanka’s First yacht Party.</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="order-first order-md-2 p-4 pt-0 pb-0">
              <MintingCard
                referralAddress={referralAddress}
                isHaveReferral={isHaveReferral}
              />
            </Col>
            <Col md={4} className="order-3 order-md-3 p-4 pt-0 p-md-0">
              <div className="benefits-section d-flex flex-column flex-md-row flex-wrap justify-content-between content-paragraph-type-1 ">
                <div
                  //   className="benefit-item"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {/* <p>By owning a Rugfreecoins NFT, Become a custodian of one of these extraordinary digital treasures.</p> */}
                  <p>
                    <Checkbox
                      checked={walletAgeChecked}
                      disabled={walletAgeDisabled}
                    >
                      Wallet Aged more than (XXX) Days
                    </Checkbox>
                  </p>
                </div>

                <div
                  //   className="benefit-item"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {/* <p>By owning a Rugfreecoins NFT, Become a custodian of one of these extraordinary digital treasures.</p> */}
                  <p>
                    <Checkbox
                      checked={PortfolioBalanceChecked}
                      disabled={PortfolioBalanceDisabled}
                    >
                      Portfolio Balance is More than 1 BTC ({profileInBTC})
                    </Checkbox>
                  </p>
                </div>
                <div
                  //   className="benefit-item"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {/* <p>By owning a Rugfreecoins NFT, Become a custodian of one of these extraordinary digital treasures.</p> */}
                  <p>
                    <Checkbox
                      checked={holdingNftsChecked}
                      disabled={holdingNftsDisabled}
                    >
                      Holding the{" "}
                      <Link
                        target="_blank"
                        to="https://opensea.io/collection/ceylon-crypto-meetup"
                      >
                        Genesis CCM NFT
                      </Link>
                    </Checkbox>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
