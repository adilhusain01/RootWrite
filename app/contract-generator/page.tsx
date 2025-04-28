import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Code, FileCode, TerminalSquare } from "lucide-react";

// Use dynamic import to resolve the module issue
const ContractGeneratorForm = dynamic(
  () => import("@/components/contract-generator/ContractGeneratorForm"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Smart Contract Generator | RootWrite",
  description: "Generate secure, optimized smart contracts for Rootstock blockchain using AI",
};

export default function ContractGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-around">
      {/* Header Section */}
      <section className="py-12 bg-muted/30 rounded-lg my-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
              <span className="bg-gradient-to-r from-[#ff9103] via-blue-500 to-[#ff70e1] bg-clip-text text-transparent">
                RootWrite Smart Contract Generator
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Describe your requirements in natural language, and our AI will generate 
              a custom smart contract ready for deployment on Rootstock.
            </p>
          </div>
        </div>
      </section>
      
      {/* Steps Section */}
      <section className="py-8 border-y">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileCode className="h-6 w-6" />
                <span className="sr-only">Step 1</span>
              </div>
              <h3 className="text-lg font-semibold">1. Define Requirements</h3>
              <p className="text-sm text-muted-foreground">
                Describe your contract in plain English and select a template
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Code className="h-6 w-6" />
                <span className="sr-only">Step 2</span>
              </div>
              <h3 className="text-lg font-semibold">2. Generate & Customize</h3>
              <p className="text-sm text-muted-foreground">
                Edit and refine your AI-generated smart contract
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <TerminalSquare className="h-6 w-6" />
                <span className="sr-only">Step 3</span>
              </div>
              <h3 className="text-lg font-semibold">3. Deploy to Rootstock</h3>
              <p className="text-sm text-muted-foreground">
                Test and deploy your contract to the Rootstock blockchain
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Form Section */}
      <section className="py-12 w-full">
  <div className="container max-w-7xl mx-auto px-4 md:px-6">
    <ContractGeneratorForm />
  </div>
</section>
    </div>
  );
}
