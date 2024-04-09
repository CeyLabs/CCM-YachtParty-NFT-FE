import React from "react";
import { Breadcrumb, Image, Layout, Menu, theme } from "antd";
import { CustomConnectionButton } from "../components/CustomConnectionButton";

const { Header, Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const HomeView: React.FC = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          height: "62px",
          background: "#000000",
          borderBottom: "1px solid #222",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* <Image
            preview={false}
            src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antvr.png"
          /> */}
          <CustomConnectionButton />
        </div>
      </Header>
      <Content style={{ padding: "0 48px" }}></Content>
      <Footer style={{ textAlign: "center", background: "#111111" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HomeView;
