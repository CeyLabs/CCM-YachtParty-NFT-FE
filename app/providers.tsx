"use client";

import * as React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  bsc,
  bscTestnet
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ConfigProvider, theme, Button, notification } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "CCM",
  projectId: "101b478dc0f793d70c8a358847001621",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    bscTestnet,
    sepolia
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { darkAlgorithm } = theme;
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConfigProvider
            theme={{
              algorithm: [darkAlgorithm],
              token: {
                colorPrimary: "#cb9a06",
              },
            }}
          >
            <AntdRegistry>{children}</AntdRegistry>
          </ConfigProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
