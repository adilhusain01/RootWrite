"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { Address } from "viem";
import { useBalance, useAccount } from "wagmi";

const tokens = [
  { name: "rBTC", symbol: "rBTC", address: "" }, // rBTC doesn't need an address
  {
    name: "RIF",
    symbol: "tRIF",
    address: "0x19F64674D8A5B4E652319F5e239eFd3bc969A1fE",
  },
  {
    name: "Dollar on Chain",
    symbol: "DOC",
    address: "0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0",
  },
];

/**
 * TokenBalance component fetches and displays the token balance for each token.
 * For ERC-20 tokens, the contract address is passed. For the native token (rBTC),
 * the `token` field is left as undefined, as it's the native currency.
 *
 * @param {Address} address - The contract address for the token
 * @param {string} symbol - The symbol of the token
 * @returns JSX Element showing the token balance
 *
 * Documentation:
 * - useBalance: https://wagmi.sh/react/hooks/useBalance
 * - useAccount: https://wagmi.sh/react/hooks/useAccount
 */

function TokenBalance({
  address,
  symbol,
}: {
  address: Address;
  symbol: string;
}) {
  const { address: accountAddress } = useAccount();

  const { data, isError, isLoading, refetch } = useBalance({
    address: accountAddress,
    token: symbol !== "rBTC" ? address : undefined,
  });

  useEffect(() => {
    if (accountAddress) {
      refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountAddress]);

  if (!accountAddress) return 0;
  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error loading {symbol} balance</span>;

  const decimals = symbol === "DOC" ? 2 : 6;
  const formattedBalance = data?.formatted
    ? Number(data.formatted).toFixed(decimals)
    : "0";

  return <span>{formattedBalance}</span>;
}

export default function Balances() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Token Balances</CardTitle>
        <CardDescription>
          View your balance for different tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between font-bold">
          <h1>Tokens</h1>
          <h1>Balances</h1>
        </div>
        {tokens.map((token) => (
          <div key={token.symbol} className="flex items-center justify-between">
            <span>
              {token.name} ({token.symbol})
            </span>
            <div>
              <TokenBalance
                address={token.address as Address}
                symbol={token.symbol}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
