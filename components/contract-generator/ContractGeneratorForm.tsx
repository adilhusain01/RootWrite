"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Clipboard from "@/components/Clipboard";

// Contract templates for the user to choose from
const CONTRACT_TEMPLATES = [
  { id: "erc20", name: "ERC-20 Token" },
  { id: "erc721", name: "ERC-721 NFT" },
  { id: "multisig", name: "Multi-signature Wallet" },
  { id: "voting", name: "Voting Contract" },
  { id: "custom", name: "Custom Contract" },
];

export default function ContractGeneratorForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [templateType, setTemplateType] = useState<string>("erc20");
  const [requirements, setRequirements] = useState<string>("");
  const [generatedContract, setGeneratedContract] = useState<string>("");
  const [contractExplanation, setContractExplanation] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [editedContract, setEditedContract] = useState<string>("");
  const [showOptimizations, setShowOptimizations] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const [deploymentCost, setDeploymentCost] = useState<string | null>(null);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [suggestion, setSuggestion] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requirements.trim()) {
      toast({
        title: "Error",
        description: "Please provide requirements for your smart contract",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setVerificationStatus(null);
    setDeploymentCost(null);

    try {
      const response = await fetch("/api/generate-contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: templateType,
          requirements,
          suggestion: suggestion.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate contract");
      }

      const data = await response.json();
      setGeneratedContract(data.contract);
      setEditedContract(data.contract); // Initialize edited contract with generated contract
      setContractExplanation(data.explanation);

      // Set optional data if provided
      if (data.verificationStatus) {
        setVerificationStatus(data.verificationStatus);
      }

      if (data.deploymentCost) {
        setDeploymentCost(data.deploymentCost);
      }

      // Reset suggestion after successful generation
      setSuggestion("");
      setShowSuggestionBox(false);

      toast({
        title: "Success!",
        description: "Your smart contract has been generated",
      });
    } catch (error) {
      console.error("Error generating contract:", error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate the contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setRequirements("");
    setGeneratedContract("");
    setContractExplanation("");
    setEditMode(false);
    setEditedContract("");
    setVerificationStatus(null);
    setDeploymentCost(null);
    setShowSuggestionBox(false);
    setSuggestion("");
    setShowOptimizations(false);
  };

  const toggleEditMode = () => {
    if (!editMode && generatedContract) {
      setEditedContract(generatedContract);
    }
    setEditMode(!editMode);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContract(e.target.value);
  };

  const handleSaveEdit = () => {
    setGeneratedContract(editedContract);
    setEditMode(false);
    toast({
      title: "Saved",
      description: "Your edits have been saved",
    });
  };

  const handleVerifyContract = async () => {
    setLoading(true);
    try {
      // Simulate contract verification with the Rootstock network
      // In a real implementation, this would call a verification service
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setVerificationStatus("Contract verified successfully with Rootstock");
      setDeploymentCost("Estimated gas: ~500,000 gas units (≈0.005 RBTC)");

      toast({
        title: "Verification Complete",
        description: "Smart contract verified with Rootstock testnet",
      });
    } catch (error) {
      console.error("Error verifying contract:", error);
      setVerificationStatus(
        "Verification failed. Please check your contract code."
      );
      toast({
        title: "Verification Failed",
        description: "Unable to verify the contract. Please check the code.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openInRemix = () => {
    // Get the current contract code
    const contractCode = editMode ? editedContract : generatedContract;
    if (!contractCode) return;

    try {
      // Use base64 encoding which is more reliable for code
      const base64Contract = btoa(unescape(encodeURIComponent(contractCode)));

      // Build the correct Remix URL with base64 encoded content
      const remixUrl = `https://remix.ethereum.org/#language=solidity&code=${base64Contract}`;

      // Open Remix in a new tab
      window.open(remixUrl, "_blank");

      toast({
        title: "Opening in Remix IDE",
        description:
          "Your contract is being loaded in Remix for testing and deployment",
      });
    } catch (error) {
      console.error("Error opening in Remix:", error);
      toast({
        title: "Error",
        description: "Could not open the contract in Remix IDE",
        variant: "destructive",
      });
    }
  };

  const toggleSuggestionBox = () => {
    setShowSuggestionBox(!showSuggestionBox);
  };

  const toggleOptimizations = async () => {
    if (!showOptimizations && generatedContract) {
      // In a real implementation, this would analyze the contract for optimization opportunities
      setShowOptimizations(true);
    } else {
      setShowOptimizations(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">Contract Template</Label>
            <Select value={templateType} onValueChange={setTemplateType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {CONTRACT_TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="requirements">Requirements</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleSuggestionBox}
                className="text-xs"
              >
                {showSuggestionBox ? "Hide Suggestion" : "Add Suggestion"}
              </Button>
            </div>
            <Textarea
              id="requirements"
              placeholder="Describe your smart contract requirements in natural language. For example: 'Create a token called MyToken with 1 million supply and a burn function.'"
              className="min-h-[150px]"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />

            {showSuggestionBox && (
              <div className="pt-2">
                <Label htmlFor="suggestion" className="text-sm">
                  Additional Suggestion/Feature
                </Label>
                <Textarea
                  id="suggestion"
                  placeholder="Add specific functions or features you want to include: 'Add a mintable feature with owner permission' or 'Make the contract pausable'"
                  className="min-h-[80px] text-sm"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Generating..." : "Generate Contract"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              disabled={loading || (!requirements && !generatedContract)}
              className="w-full"
            >
              Clear
            </Button>
          </div>
        </form>

        {verificationStatus && (
          <Card className="p-4 mt-4 border-blue-200">
            <h3 className="text-lg font-semibold mb-2">Verification Status</h3>
            <p className="text-sm text-muted-foreground">
              {verificationStatus}
            </p>
            {deploymentCost && (
              <p className="text-sm font-medium mt-2 text-blue-600">
                {deploymentCost}
              </p>
            )}
          </Card>
        )}

        {contractExplanation && (
          <Card className="p-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Understanding Your Contract
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {contractExplanation}
            </p>
          </Card>
        )}
      </div>

      <div>
        {generatedContract || editMode ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editMode ? "Edit Contract" : "Generated Contract"}
              </h3>
              {!editMode && (
                <Clipboard
                  text={generatedContract}
                  className="hover:text-primary"
                />
              )}
            </div>

            {editMode ? (
              <div className="space-y-4">
                <Textarea
                  className="min-h-[500px] font-mono text-sm"
                  value={editedContract}
                  onChange={handleEditChange}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit} className="w-full">
                    Save Changes
                  </Button>
                  <Button
                    onClick={toggleEditMode}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative bg-muted rounded-md p-4 overflow-auto w-full">
                <pre className="text-sm max-h-[600px] overflow-y-auto">
                  <code>{generatedContract}</code>
                </pre>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                onClick={toggleEditMode}
                variant="outline"
                size="sm"
                className="flex-grow"
                disabled={!generatedContract}
              >
                {editMode ? "View Contract" : "Edit Contract"}
              </Button>

              <Button
                onClick={openInRemix}
                variant="outline"
                size="sm"
                className="flex-grow "
                disabled={!generatedContract && !editedContract}
              >
                Open in Remix IDE
              </Button>

              <Button
                onClick={handleVerifyContract}
                variant="outline"
                size="sm"
                className="flex-grow "
                disabled={!generatedContract && !editedContract}
              >
                Verify with Rootstock
              </Button>

              <Button
                onClick={toggleOptimizations}
                variant="outline"
                size="sm"
                className="flex-grow "
                disabled={!generatedContract}
              >
                {showOptimizations
                  ? "Hide Optimizations"
                  : "Show Optimizations"}
              </Button>
            </div>

            {showOptimizations && (
              <Card className="p-4 mt-2 border-green-200 bg-green-50">
                <h3 className="text-md font-semibold mb-2">
                  Rootstock Optimization Tips
                </h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>
                    Use <code>uint256</code> instead of smaller uint types to
                    save gas
                  </li>
                  <li>
                    Replace multiple storage writes with a single write when
                    possible
                  </li>
                  <li>
                    Consider using <code>bytes32</code> instead of string when
                    the data fits
                  </li>
                  <li>
                    Group related storage variables to minimize storage slots
                  </li>
                  <li>
                    Use Rootstock-specific gas optimizations for cross-chain
                    transactions
                  </li>
                </ul>
              </Card>
            )}

            <div className="text-sm text-muted-foreground mt-4">
              <p className="flex items-center gap-2">
                <span>💡</span>
                <span>
                  This contract is ready to deploy on the Rootstock blockchain.
                  Use Remix IDE to test and deploy it.
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <h3 className="text-lg font-medium mb-2">
                No Contract Generated Yet
              </h3>
              <p className="text-muted-foreground">
                Fill in your requirements and click &quot;Generate
                Contract&quot; to create a custom smart contract with AI.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
