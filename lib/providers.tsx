"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { config } from "@/lib/wagmi";
import { mergeNetworks } from "@dynamic-labs/sdk-react-core";
import { dynamicEnvId } from "./dynamic";
import { customChains } from "./networks";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <DynamicContextProvider
      theme="light"
      settings={{
        environmentId: dynamicEnvId,
        walletConnectors: [EthereumWalletConnectors, BitcoinWalletConnectors],
        overrides: {
          evmNetworks: (networks) => mergeNetworks(customChains, networks),
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
