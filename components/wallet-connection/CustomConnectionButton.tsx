import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Image } from "antd";
export const CustomConnectionButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
                height: "100%",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      gap: 12,
                      height: "62px",
                    }}
                  >
                    <Button
                      size="large"
                      onClick={openConnectModal}
                      style={{ backgroundColor: "#4648d8" }}
                    >
                      Connect Wallet
                    </Button>
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      gap: 12,
                      height: "62px",
                    }}
                  >
                    <Button
                      size="large"
                      onClick={openChainModal}
                      style={{ backgroundColor: "#4648d8" }}
                    >
                      Wrong network
                    </Button>
                  </div>
                );
              }
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: 12,
                    height: "62px",
                  }}
                >
                  <Button
                    size="large"
                    onClick={openChainModal}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                      backgroundColor: "#4648d8",
                    }}
                    className="mobile-hidden"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            preview={false}
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{
                              width: "18px",
                              height: "18px",
                              marginTop: "-12px",
                            }}
                          />
                        )}
                      </div>
                    )}
                    <div> {chain.name}</div>
                  </Button>
                  <Button
                    size="large"
                    onClick={openAccountModal}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2px",
                      backgroundColor: "#4648d8",
                    }}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                        className="pc-hidden"
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{
                              width: 18,
                              height: 18,
                              marginTop: "-12px",
                            }}
                          />
                        )}
                      </div>
                    )}
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
