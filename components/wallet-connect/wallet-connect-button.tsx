import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
                      variant="default"
                      className="rounded-full bg-[#061021] text-white hover:bg-[#F6931A] hover:text-white"
                      onClick={openConnectModal}
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
                      onClick={openChainModal}
                      variant="default"
                      className="rounded-full bg-[#061021] text-white hover:bg-[#F6931A] hover:text-white"
                    >
                      Wrong network
                    </Button>
                  </div>
                );
              }
              return (
                <div className="flex space-x-1">
                  <Button

                    onClick={openChainModal}
                    variant="default"
                    className="hidden sm:flex rounded-full bg-[#061021] text-white hover:bg-[#F6931A] hover:text-white mobile-hidden"
                  >
                    {chain.hasIcon && (
                      <div className="mt-3 mr-1">
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={18}
                            height={18}
                            style={{
                              width: "18px",
                              height: "18px",
                              marginTop: "-12px",
                            }}
                          />
                        )}
                      </div>
                    )}
                    <div className="hidden sm:block"> {chain.name} </div>
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    variant="default"
                    className="rounded-full bg-[#061021] text-white hover:bg-[#F6931A] hover:text-white"
                  >
                    {chain.hasIcon && (
                      <div className="mt-3 mr-1 block sm:hidden">
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            width={18}
                            height={18}
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
