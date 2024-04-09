"use client";
import React from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import FooterComponent from "./FooterComponent";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ marginTop: "62px",display:"flex",justifyContent:"center",alignItems:"center" }}>{children}</Content>
      <FooterComponent />
    </Layout>
  );
};

export default LayoutComponent;
