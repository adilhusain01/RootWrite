export * from "@dynamic-labs/sdk-react-core";
export * from "@dynamic-labs/ethereum";
export * from "@dynamic-labs/bitcoin";

export const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || 'bd4af515-db1b-4fd4-839d-08fa0d753f45'

if(!dynamicEnvId){
    throw new Error('Dynamic env id has not been found') 
}