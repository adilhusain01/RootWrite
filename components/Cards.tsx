"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Balances from "./Balances";
import SignMessage from "./SignMessage";
import Transfer from "./Transfer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "./ui/card";

export default function Cards() {
  const { user } = useDynamicContext();
  return (
    <section
      className={cn(
        "max-w-[1100px] w-full mx-auto p-4 my-10 grid gap-4 md:grid-cols-2",
        user ? "opacity-100" : "opacity-50 pointer-events-none"
      )}
    >
      <div className="flex flex-col gap-4">
        <Balances />
        <SignMessage />
      </div>
      <div className="flex flex-col gap-4">
        <Transfer />
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Smart Contract Generator</h2>
          <p className="text-muted-foreground mb-4">
            Create custom smart contracts using AI. Simply describe your requirements
            in natural language and get deployment-ready code.
          </p>
          <Link
            href="/contract-generator"
            className="bg-[#ff9103] hover:bg-[#e68300] text-white font-bold py-2 px-4 rounded inline-block"
          >
            Try it now
          </Link>
        </Card>
      </div>
    </section>
  );
}
