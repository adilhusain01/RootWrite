import { rootstockTestnet } from "viem/chains";

export const customChains = [
  {
    blockExplorerUrls: ["https://explorer.testnet.rsk.co"],
    chainId: rootstockTestnet.id,
    chainName: rootstockTestnet.name,
    name: rootstockTestnet.name,
    nativeCurrency: {
      decimals: rootstockTestnet.nativeCurrency.decimals,
      name: rootstockTestnet.nativeCurrency.name,
      symbol: rootstockTestnet.nativeCurrency.symbol,
    },
    networkId: rootstockTestnet.id,
    rpcUrls: ["https://public-node.testnet.rsk.co"],
    vanityName: "Rootstock testnet",
    iconUrls: [
      "https://rootstock.io/favicon-32x32.png?v=d5199ca8e8f274bc01b19fe9024f128e ",
    ],
  },
];
