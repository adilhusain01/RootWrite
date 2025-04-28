"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Address, parseEther } from "viem";
import { useConfig, useSendTransaction } from "wagmi";
import { SpinnerIcon } from "@dynamic-labs/sdk-react-core";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { waitForTransactionReceipt } from "wagmi/actions";

const EXPLORER_URL = "https://explorer.testnet.rsk.co/tx/";
const tokens = [
  { name: "rBTC", symbol: "rBTC", address: "" },
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
 * Transfer component allows users to select a token, specify a recipient and amount, and send the token.
 * The component integrates with wagmi's `useSendTransaction` and `useWaitForTransactionReceipt` hooks
 * to handle the transaction process and display its status.
 *
 * Hooks Used:
 * - useSendTransaction: Hook for initiating a blockchain transaction.
 * - useWaitForTransactionReceipt: Hook for waiting for a transaction to be confirmed.
 */

export default function Transfer() {
  const { toast } = useToast();
  const config = useConfig();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");

  const { data, sendTransactionAsync } = useSendTransaction();

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedToken && amount && recipient) {
      try {
        setLoading(true);
        const hash = await sendTransactionAsync({
          to: recipient as Address,
          value: parseEther(amount),
        });

        await waitForTransactionReceipt(config, {
          hash: hash as `0x${string}`,
          confirmations: 3,
        });

        toast({
          title: "Tokens sent successfully",
          description: "The transaction was successful",
          action: (
            <ToastAction altText="View on explorer">
              <a
                href={EXPLORER_URL + hash}
                target="_blank"
                rel="noreferrer noopener"
              >
                View on explorer
              </a>
            </ToastAction>
          ),
        });

        setRecipient("");
        setAmount("");
      } catch (err) {
        toast({
          title: "Transaction Failed",
          variant: "destructive",
          description: "Something went wrong while sending the transaction",
          action: data && (
            <ToastAction altText="View on explorer">
              <a
                href={EXPLORER_URL + data}
                target="_blank"
                rel="noreferrer noopener"
              >
                See tx on explorer
              </a>
            </ToastAction>
          ),
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Send Tokens</CardTitle>
        <CardDescription>Transfer tokens to another address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token-select">Select Token to Send</Label>
            <Select onValueChange={setSelectedToken}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tokens</SelectLabel>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.name} ({token.symbol})
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-3 ">
            Send Tokens{" "}
            {loading ? (
              <SpinnerIcon className="size-5 animate-spin ml-2" />
            ) : null}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
