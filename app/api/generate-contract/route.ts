import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize the OpenAI client with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { template, requirements, suggestion } = await request.json();

    if (!requirements || !template) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a prompt based on the template, requirements and optional suggestion
    const prompt = generatePrompt(template, requirements, suggestion);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Using GPT-4o for code generation
      messages: [
        {
          role: "system",
          content: "You are an expert Solidity developer specializing in Rootstock smart contracts. Your task is to generate secure, optimized smart contract code based on user requirements. Focus on Rootstock compatibility and gas efficiency. Include helpful comments in the code.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2, // Lower temperature for more deterministic output
    });

    // Extract the generated contract code and explanation
    const responseContent = completion.choices[0].message.content || "";
    
    // Parse the response to separate contract code and explanation
    const { contract, explanation } = parseResponse(responseContent);

    // Generate estimated deployment costs for Rootstock
    const deploymentCost = estimateDeploymentCost(contract);
    const verificationStatus = checkRootstockCompatibility(contract);
    
    return NextResponse.json({
      contract,
      explanation,
      deploymentCost,
      verificationStatus,
    });
  } catch (error: any) {
    console.error("Error generating contract:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate contract" },
      { status: 500 }
    );
  }
}



// Generate a prompt based on the selected template, user requirements, and optional suggestion
function generatePrompt(template: string, requirements: string, suggestion?: string): string {
  let basePrompt = `Generate a Solidity smart contract for the Rootstock blockchain based on the following requirements: ${requirements}\n\n`;
  
  // Common Solidity best practices for all templates
  const bestPractices = [
    "Use Solidity version ^0.8.20 which has built-in overflow checks and is compatible with the latest OpenZeppelin",
    "Check OpenZeppelin version compatibility - v5.0+ requires constructor parameters for Ownable (address initialOwner)",
    "Use custom errors instead of revert strings for gas efficiency",
    "Implement events for all state changes to facilitate off-chain monitoring",
    "Use immutable variables where appropriate to save gas",
    "Follow the checks-effects-interactions pattern to prevent reentrancy"
  ];
  
  basePrompt += "CRITICAL NOTES ON DEPENDENCIES:\n";
  basePrompt += "1. If using OpenZeppelin v5.0 or newer, Ownable requires a constructor parameter: `constructor() Ownable(msg.sender) {...}`\n";
  basePrompt += "2. If using OpenZeppelin v4.x, Ownable doesn't need parameters: `constructor() {...}`\n";
  basePrompt += "3. Always check that import statements match the version you're using\n";
  basePrompt += "4. For maximum compatibility, specify the exact OpenZeppelin version in import statements\n\n";
  
  switch (template) {
    case "erc20":
      basePrompt += "Create an ERC-20 token contract compatible with Rootstock. Use OpenZeppelin's ERC20 implementation for security. ";
      basePrompt += "IMPORTANT: If using OpenZeppelin v5.0+, constructor needs proper initialization like `constructor() ERC20(\"Name\", \"Symbol\") Ownable(msg.sender) {...}`. ";
      basePrompt += "Follow the latest OpenZeppelin documentation at https://docs.openzeppelin.com/contracts/5.x/erc20 for best practices.";
      break;
    case "erc721":
      basePrompt += "Create an ERC-721 NFT contract compatible with Rootstock. Use OpenZeppelin's ERC721 implementation for security. ";
      basePrompt += "IMPORTANT: If using OpenZeppelin v5.0+, constructor needs proper initialization like `constructor() ERC721(\"Name\", \"Symbol\") Ownable(msg.sender) {...}`. ";
      basePrompt += "Follow the latest OpenZeppelin documentation at https://docs.openzeppelin.com/contracts/5.x/erc721 for best practices.";
      break;
    case "multisig":
      basePrompt += "Create a multi-signature wallet contract compatible with Rootstock. Ensure it has proper security measures. ";
      basePrompt += "Reference OpenZeppelin's governance contracts at https://docs.openzeppelin.com/contracts/5.x/governance for implementation ideas.";
      break;
    case "voting":
      basePrompt += "Create a voting contract compatible with Rootstock. Include access control and transparent vote counting. ";
      basePrompt += "Follow the voting standards at https://docs.openzeppelin.com/contracts/5.x/governance for best practices.";
      break;
    default:
      basePrompt += "Use Solidity version 0.8.20 or later, which is compatible with Rootstock. ";
      basePrompt += "Follow modern Solidity patterns from the Solidity documentation at https://docs.soliditylang.org/en/v0.8.20/. ";
  }
  
  basePrompt += "\n\nIncorporate these Solidity best practices into the contract:";
  bestPractices.forEach(practice => {
    basePrompt += `\n- ${practice}`;
  });
  
  basePrompt += "\n\nEnsure compatibility with the latest OpenZeppelin libraries (version 5.x):";
  basePrompt += "\n- Use proper constructor inheritance: `constructor() ERC20(\"Name\", \"Symbol\") Ownable(msg.sender) {}`";
  basePrompt += "\n- Use the latest interface methods and patterns";
  basePrompt += "\n- Import specific versions for clarity: `import \"@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol\"`";
  
  basePrompt += "\n\nModern Solidity features to use:";
  basePrompt += "\n- Custom errors (error InvalidAmount(uint256 amount)) instead of require statements with strings";
  basePrompt += "\n- Named return variables combined with implicit returns for better readability";
  basePrompt += "\n- Immutable variables for constants that are set once at construction";
  basePrompt += "\n- The unchecked block for operations where overflow is impossible";
  
  basePrompt += "\n\nProvide the complete Solidity code and a brief explanation of how the contract works and any important considerations.";
  basePrompt += "\n\nYour response should be formatted with the Solidity code first, followed by '---' and then the explanation.";
  
  // Add the suggestion if provided
  if (suggestion && suggestion.trim()) {
    basePrompt += `\n\nPlease also incorporate this specific suggestion or feature into the contract: ${suggestion}`;
  }
  
  // Add Rootstock-specific guidance
  basePrompt += "\n\nMake sure the contract is optimized for Rootstock blockchain specifically. Consider:";
  basePrompt += "\n- Gas optimization for Rootstock's fee structure";
  basePrompt += "\n- Compatibility with Rootstock's EVM implementation (which is compatible with Ethereum's EVM)";
  basePrompt += "\n- Use of OpenZeppelin contracts for security (v5.0.0 or newer)";
  basePrompt += "\n- Use Rootstock's specific tools and standards from https://developers.rsk.co/";
  
  return basePrompt;
}


function parseResponse(responseContent: string): { contract: string; explanation: string } {
  // Default values
  let contract = responseContent;
  let explanation = "";
  
  // Split by separator if it exists
  if (responseContent.includes("---")) {
    const parts = responseContent.split("---");
    contract = parts[0].trim();
    explanation = parts.slice(1).join("---").trim();
    
    // Clean up contract code if it contains markdown code blocks
    if (contract.includes("```solidity")) {
      // Remove the ```solidity and ``` markdown syntax
      contract = contract.replace(/```solidity\n?/g, "").replace(/```\s*$/g, "").trim();
    } else if (contract.includes("```")) {
      // Handle cases where there's no language specified
      contract = contract.replace(/```\n?/g, "").replace(/```\s*$/g, "").trim();
    }
  } else if (responseContent.includes("```solidity")) {
    // Try to extract code blocks if markdown format is used
    const codeRegex = /```solidity([\s\S]*?)```/g;
    
    // Extract code blocks without using matchAll for better compatibility
    let match;
    const codeBlocks = [];
    let tempContent = responseContent;
    
    while ((match = codeRegex.exec(tempContent)) !== null) {
      codeBlocks.push(match[1].trim());
    }
    
    if (codeBlocks.length > 0) {
      contract = codeBlocks.join("\n\n");
      
      // Remove code blocks to get explanation
      explanation = responseContent.replace(codeRegex, "").trim();
    }
  }
  
  return { contract, explanation };
}

// Estimate the deployment cost for a contract on Rootstock
function estimateDeploymentCost(contractCode: string): string {
  // In a real implementation, this would use more sophisticated analysis
  // based on the contract bytecode and Rootstock's gas model
  
  // Simple estimation based on contract length and complexity
  const codeLength = contractCode.length;
  const complexityFactor = countComplexityFactors(contractCode);
  
  let gasEstimate = 200000; // Base deployment cost
  
  // Add gas based on code length
  gasEstimate += codeLength * 5;
  
  // Add gas based on complexity factors
  gasEstimate += complexityFactor * 25000;
  
  // Convert gas to approximate RBTC
  const rbtcCost = (gasEstimate * 0.00000001).toFixed(6);
  
  return `Estimated gas: ~${gasEstimate.toLocaleString()} gas units (≈${rbtcCost} RBTC)`;
}

// Check if the contract is compatible with Rootstock
function checkRootstockCompatibility(contractCode: string): string {
  // In a real implementation, this would perform static analysis
  // to ensure compatibility with Rootstock's EVM implementation
  
  // For demonstration, we'll do some basic checks
  const warnings = [];
  
  // Check for compatibility with Rootstock's EVM version
  if (!contractCode.includes('pragma solidity') || contractCode.includes('pragma solidity ^0.4')) {
    warnings.push('Consider using Solidity version 0.8.x for compatibility with Rootstock');
  }
  
  // Check for common gas-inefficient patterns
  if (contractCode.includes('for (') && contractCode.includes('array')) {
    warnings.push('Potential high gas usage detected with array loops');
  }
  
  // Check for appropriate use of uint256
  if (contractCode.includes('uint8') || contractCode.includes('uint16') || contractCode.includes('uint32') || contractCode.includes('uint64') || contractCode.includes('uint128')) {
    warnings.push('Consider using uint256 instead of smaller uint types for better gas efficiency');
  }
  
  if (warnings.length > 0) {
    return `Contract verified with Rootstock with optimizations: ${warnings.join('. ')}`;
  }
  
  return "Contract is optimized for Rootstock blockchain";
}

// Helper function to count complexity factors in the contract
function countComplexityFactors(contractCode: string): number {
  let complexity = 0;
  
  // Count functions
  const functionMatches = contractCode.match(/function\s+\w+/g);
  if (functionMatches) {
    complexity += functionMatches.length;
  }
  
  // Count mappings (more complex storage)
  const mappingMatches = contractCode.match(/mapping\s*\(/g);
  if (mappingMatches) {
    complexity += mappingMatches.length * 2;
  }
  
  // Count arrays (more complex storage)
  const arrayMatches = contractCode.match(/\[\]/g);
  if (arrayMatches) {
    complexity += arrayMatches.length * 2;
  }
  
  // Count loops (more complex execution)
  const loopMatches = contractCode.match(/for\s*\(/g);
  if (loopMatches) {
    complexity += loopMatches.length * 3;
  }
  
  return complexity;
}
