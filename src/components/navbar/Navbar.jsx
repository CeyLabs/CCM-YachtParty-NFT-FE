// Navbar.js
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import rfc_logo from "../../images/logo.png";
import MainMenu from "./MainMenu";
import MobileNavbarDrawer from "../MobileNavbarDrawer/MobileNavbarDrawer";
import WalletConnectButton from "../WalletConnectButton/WalletConnectButton";
import rfc_mobile_logo from "../../images/logo.png";
import { useAccount, useChainId } from "wagmi";
import axios from "axios";

function Navbar() {
  const adminAccounts = process.env.REACT_APP_ADMINS_ACCOUNT;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { address } = useAccount();

  const handleCheckboxChange = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  useEffect(() => {
    let admins = adminAccounts ? adminAccounts.split(",") : null;
    if (address && admins?.length > 0) {
      const result = admins.find(
        (item) => item.toLowerCase() === address.toLowerCase()
      );
      if (result) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [address, adminAccounts]);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <div className="d-flex d-md-flex flex-row flex-md-row justify-content-between w-100">
          <Link
            className="navbar-brand desktop-logo"
            to="https://www.rugfreecoins.com/"
            target="_blank"
          >
            <img src={rfc_logo} style={{ height: "35px" }} />
          </Link>
          <Link className="navbar-brand mobile-logo" to="/">
            <img src={rfc_mobile_logo} style={{ height: "35px" }} />
          </Link>
          <div className="d-none d-md-flex menu-warapper mt-2">
            <MainMenu
              menuPostion="desktop"
              isAdmin={isAdmin}
              handleMenuItemClick={() => setIsDrawerVisible(!isDrawerVisible)}
            />
          </div>
          {/* mobile navbar toggler here */}
          <div className="d-flex flex-row align-items-center">
            <div className="action-btns-wrapper">
              {/* <Button className='connect-btn' size='large'>Connec Wallet</Button> */}
              <WalletConnectButton />
            </div>
            {/* <div className="hidden d-block d-md-none mobile-menu-toggle-wrapper"> */}
            {/* Note: the mobile navbar drawer is located at: src/components/MobileNavbarDrawer */}
            {/* <div className="burger">
                <input
                  type="checkbox"
                  id="mobile-menu-toggle"
                  onChange={handleCheckboxChange}
                />
                <div className="strip burger-strip-2">
                  <div></div>
                  <div></div>
                  <div></div>
                </div> */}
            {/* </div>
            </div> */}
          </div>
          <MobileNavbarDrawer
            isVisible={isDrawerVisible}
            menuPostion="mobile"
            isAdmin={isAdmin}
            setIsDrawerVisible={setIsDrawerVisible}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
