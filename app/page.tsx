import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Zap, Shield } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Powered by Rootstock Blockchain
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-[#ff9103] via-blue-500 to-[#ff70e1] bg-clip-text text-transparent">
                  RootWrite
                </span>{" "}
                <span className="block mt-2">Smart Contract Generator</span>
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Generate custom smart contracts for Rootstock in seconds using
                AI. No coding experience required.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contract-generator">
                  <Button size="lg" className="bg-[#ff9103] hover:bg-[#e68300]">
                    Start Creating
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/documentation">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  alt="Smart Contract Generator"
                  className="mx-auto overflow-hidden rounded-xl object-cover"
                  height={400}
                  src="https://res.cloudinary.com/djxuqljgr/image/upload/v1745824339/rootwrite_hypoeu.webp"
                  width={720}
                  priority // Add priority prop for LCP optimization
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff9103]/20 via-transparent to-[#ff70e1]/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-muted/50 rounded-lg">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose RootWrite
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The easiest way to create secure, custom smart contracts for
              Rootstock
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col p-6 bg-gradient-to-b from-background to-muted/50 h-full">
              <div className="mb-4 rounded-full bg-[#ff9103]/10 p-3 w-fit">
                <Zap className="h-6 w-6 text-[#ff9103]" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Generation</h3>
              <p className="mt-2 text-muted-foreground flex-grow">
                Describe your requirements in natural language and get a
                ready-to-deploy smart contract in seconds.
              </p>
            </Card>
            <Card className="flex flex-col p-6 bg-gradient-to-b from-background to-muted/50 h-full">
              <div className="mb-4 rounded-full bg-blue-500/10 p-3 w-fit">
                <Code className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Rootstock Optimized</h3>
              <p className="mt-2 text-muted-foreground flex-grow">
                Automatically optimized for Rootstock&apos;s blockchain with
                gas-efficient patterns and security best practices.
              </p>
            </Card>
            <Card className="flex flex-col p-6 bg-gradient-to-b from-background to-muted/50 h-full">
              <div className="mb-4 rounded-full bg-[#ff70e1]/10 p-3 w-fit">
                <Shield className="h-6 w-6 text-[#ff70e1]" />
              </div>
              <h3 className="text-xl font-bold">Seamless Deployment</h3>
              <p className="mt-2 text-muted-foreground flex-grow">
                Edit, test, and deploy your contract to Rootstock with one-click
                integration to Remix IDE.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Build on Rootstock?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start creating your custom smart contracts today and deploy
                  them to the Rootstock blockchain in minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contract-generator">
                  <Button size="lg" className="bg-[#ff9103] hover:bg-[#e68300]">
                    Generate Your First Contract
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto flex items-center justify-center">
              <Card className="p-6 shadow-lg border-2 border-muted">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    Supported Contract Types
                  </h3>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#ff9103]"></div>
                      <span>ERC-20 Tokens</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>ERC-721 NFT Collections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#ff70e1]"></div>
                      <span>Multi-signature Wallets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Voting/Governance Systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>Custom Smart Contracts</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
