import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Book, FileCode, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Documentation | RootWrite",
  description: "Learn how to use RootWrite to create smart contracts for Rootstock blockchain",
};

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {/* Header Section */}
      <section className="py-12 my-12 bg-muted/30 rounded-lg">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
              <span className="bg-gradient-to-r from-[#ff9103] via-blue-500 to-[#ff70e1] bg-clip-text text-transparent">
                RootWrite Documentation
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Learn how to use RootWrite to create, customize, and deploy smart contracts on the Rootstock blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <aside className="md:col-span-1 space-y-6">
              <Card className="p-4">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-semibold">Navigation</h3>
                </div>
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li>
                      <a href="#getting-started" className="flex items-center hover:text-primary">
                        <Book className="mr-2 h-4 w-4" />
                        Getting Started
                      </a>
                    </li>
                    <li>
                      <a href="#contract-templates" className="flex items-center hover:text-primary">
                        <FileCode className="mr-2 h-4 w-4" />
                        Contract Templates
                      </a>
                    </li>
                    <li>
                      <a href="#custom-requirements" className="flex items-center hover:text-primary">
                        <Code className="mr-2 h-4 w-4" />
                        Writing Requirements
                      </a>
                    </li>
                    <li>
                      <a href="#deployment" className="flex items-center hover:text-primary">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Deployment Guide
                      </a>
                    </li>
                  </ul>
                </nav>
              </Card>

              <Card className="p-4 bg-[#ff9103]/10 border-[#ff9103]/20">
                <div className="space-y-2">
                  <h3 className="font-medium">Ready to Build?</h3>
                  <p className="text-sm text-muted-foreground">
                    Start creating your custom smart contract with our AI-powered generator.
                  </p>
                  <Link href="/contract-generator">
                    <Button className="w-full bg-[#ff9103] hover:bg-[#e68300]">
                      Create Contract
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </aside>

            <div className="md:col-span-2 space-y-10">
              <div id="getting-started" className="scroll-mt-16">
                <h2 className="text-2xl font-bold mb-4">Getting Started with RootWrite</h2>
                <p className="text-muted-foreground mb-4">
                  RootWrite is an AI-powered smart contract generator designed specifically for the Rootstock blockchain. 
                  It allows you to create customized, secure smart contracts by simply describing your requirements in natural language.
                </p>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <h3 className="font-medium mb-2">Prerequisites</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>A web browser (Chrome, Firefox, Safari, or Edge)</li>
                      <li>A basic understanding of blockchain concepts</li>
                      <li>A Rootstock wallet for deployment (e.g., MetaMask configured for Rootstock)</li>
                    </ul>
                  </div>
                  <p className="text-muted-foreground">
                    To begin, navigate to the <Link href="/contract-generator" className="font-medium text-primary hover:underline">Smart Contract Generator</Link> and 
                    select a template that best fits your needs. Then, describe your requirements in the provided text area.
                  </p>
                </div>
              </div>

              <div id="contract-templates" className="scroll-mt-16">
                <h2 className="text-2xl font-bold mb-4">Contract Templates</h2>
                <p className="text-muted-foreground mb-4">
                  RootWrite offers several pre-defined templates to help you get started quickly:
                </p>
                <div className="grid gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">ERC-20 Token</h3>
                    <p className="text-sm text-muted-foreground">
                      Create fungible tokens with features like transfers, allowances, and custom supply management.
                      Ideal for creating your own cryptocurrency or utility token on Rootstock.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">ERC-721 NFT</h3>
                    <p className="text-sm text-muted-foreground">
                      Create non-fungible tokens (NFTs) with unique identifiers and ownership tracking.
                      Perfect for digital collectibles, art, or representing unique assets.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Multi-signature Wallet</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a wallet that requires multiple signatures to execute transactions.
                      Excellent for shared funds, DAOs, or enhanced security.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Voting Contract</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a transparent voting system with customizable parameters.
                      Suitable for DAOs, community governance, or any collective decision-making.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Custom Contract</h3>
                    <p className="text-sm text-muted-foreground">
                      Build a completely custom contract based on your specific requirements.
                      Our AI will generate the appropriate code structure and logic.
                    </p>
                  </div>
                </div>
              </div>

              <div id="custom-requirements" className="scroll-mt-16">
                <h2 className="text-2xl font-bold mb-4">Writing Effective Requirements</h2>
                <p className="text-muted-foreground mb-4">
                  The quality of your generated contract depends on how clearly you describe your requirements.
                  Here are some tips for writing effective requirements:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#ff9103] text-white flex items-center justify-center text-sm mr-2 shrink-0">1</div>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Be specific about token details.</span> Include name, symbol, total supply, and decimals if creating a token.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#ff9103] text-white flex items-center justify-center text-sm mr-2 shrink-0">2</div>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">List all functions needed.</span> Clearly state what operations your contract should perform (e.g., mint, burn, transfer).</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#ff9103] text-white flex items-center justify-center text-sm mr-2 shrink-0">3</div>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Specify access controls.</span> Mention who should have permission to execute certain functions (e.g., only owner, any user).</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#ff9103] text-white flex items-center justify-center text-sm mr-2 shrink-0">4</div>
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Describe any special requirements.</span> Mention any time locks, fee structures, or other custom logic.</p>
                  </li>
                </ul>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-medium mb-2">Example Requirement</h3>
                  <p className="text-sm italic">
                    "Create an ERC-20 token called 'RootCoin' with symbol 'RTC' and a total supply of 1 million tokens. 
                    Include functions for burning tokens, and only allow the contract owner to mint new tokens. 
                    Add a 2% fee on all transfers that goes to a treasury wallet."
                  </p>
                </div>
              </div>

              <div id="deployment" className="scroll-mt-16">
                <h2 className="text-2xl font-bold mb-4">Deploying to Rootstock</h2>
                <p className="text-muted-foreground mb-4">
                  Once you've generated your smart contract, you can deploy it to the Rootstock blockchain:
                </p>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Step 1: Open in Remix IDE</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the "Open in Remix IDE" button in the Smart Contract Generator to load your contract into Remix IDE.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Step 2: Connect to Rootstock Network</h3>
                    <p className="text-sm text-muted-foreground">
                      In Remix, select the "Deploy & Run Transactions" tab. Change the environment to "Injected Provider - MetaMask" 
                      and make sure your MetaMask is connected to Rootstock Testnet or Mainnet.
                    </p>
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Rootstock Network Details:</p>
                      <ul className="list-disc list-inside pl-2 text-muted-foreground">
                        <li>Testnet RPC URL: https://public-node.testnet.rsk.co</li>
                        <li>Mainnet RPC URL: https://public-node.rsk.co</li>
                        <li>Chain ID (Testnet): 31</li>
                        <li>Chain ID (Mainnet): 30</li>
                      </ul>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Step 3: Compile and Deploy</h3>
                    <p className="text-sm text-muted-foreground">
                      Compile your contract in Remix, then deploy it using the "Deploy" button. Confirm the transaction in your 
                      MetaMask wallet and wait for it to be mined.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Step 4: Verify Your Contract</h3>
                    <p className="text-sm text-muted-foreground">
                      After deployment, verify your contract on the Rootstock Explorer to make your contract's code public and transparent.
                      Visit <a href="https://explorer.rsk.co/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://explorer.rsk.co/</a> for the mainnet explorer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
