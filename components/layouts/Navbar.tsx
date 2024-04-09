import React from "react";
import { Header } from "antd/es/layout/layout";
import { CustomConnectionButton } from "../wallet-connection/CustomConnectionButton";
import { Image } from "antd";

const Navbar = () => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        height: "62px",
        background: "#000000",
        borderBottom: "1px solid #222",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
      <Image src="/images/logo.png" alt="logo" width={45} height={45} />
      <CustomConnectionButton />
    </Header>
  );
};

export default Navbar;
