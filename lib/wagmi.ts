
import { http, createConfig } from "wagmi";
import { rootstockTestnet } from "wagmi/chains";

export const config = createConfig({
  chains: [rootstockTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [rootstockTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
