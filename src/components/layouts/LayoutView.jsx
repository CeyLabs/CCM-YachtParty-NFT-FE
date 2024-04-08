import React from "react";
import { Layout } from "antd";
import Pages from "../../pages/Pages";
import Navbar from "../navbar/Navbar";
import FooterContent from "../Footer/FooterContent";

function LayoutView() {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <Navbar />

      <Content className="site-layout mt-5" style={{ minHeight: "80vh" }}>
        <Pages />
      </Content>

      <Footer className="main-footer">
        <FooterContent />
      </Footer>
    </Layout>
  );
}

export default LayoutView;
