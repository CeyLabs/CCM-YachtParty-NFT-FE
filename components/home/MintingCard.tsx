import { Button, Card, Col, Image, Input, Row, Space, Select } from "antd";
import React from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const MintingCard = () => {
  const [mintingNftCount, setMintingNftCount] = React.useState(1);

  const handleChange = (value: number, expression: string) => {
    let count: number = 0;
    if (expression === "add") {
      count = mintingNftCount + 1;
    }
    if (expression === "sub") {
      count = mintingNftCount - 1;
    }
    if (count < 1) {
      count = 1;
    }
    setMintingNftCount(count);
  };
  return (
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
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>Remaining</div>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            1550 / 2000
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
          <Button
            size="large"
            onClick={() => handleChange(mintingNftCount, "sub")}
            style={{
              backgroundColor: "#F6931A",
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
            style={{ backgroundColor: "#F6931A", border: "none" }}
          >
            <PlusOutlined />
          </Button>
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
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>1 ETH</div>
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
            defaultValue="USDC"
            // onChange={handleChange}
            style={{ width: "100%" }}
            options={[
              {
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
                    100 USDC
                  </div>
                ),
              },
              {
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
                    0.03 ETH
                  </div>
                ),
              },
              {
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
                    100 USDT
                  </div>
                ),
              },
            ]}
          />

          <Button
            size="large"
            type="primary"
            style={{
              backgroundColor: "#F6931A",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Mint Now
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default MintingCard;