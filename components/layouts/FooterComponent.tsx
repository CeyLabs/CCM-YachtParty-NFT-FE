import React from "react";
import { Footer } from "antd/es/layout/layout";

const FooterComponent = () => {
  return (
    <Footer style={{ background: "#111111" }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};

export default FooterComponent;
