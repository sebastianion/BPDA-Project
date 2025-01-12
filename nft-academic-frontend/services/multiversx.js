import { SmartContract, Address, ContractFunction } from '@multiversx/sdk-core';
import { NetworkProvider } from '@multiversx/sdk-wallet';

const networkProvider = new NetworkProvider('https://gateway.multiversx.com');

export async function queryNFTs(userAddress) {
  const contractAddress = 'your-smart-contract-address';
  const smartContract = new SmartContract({ address: new Address(contractAddress) });

  const result = await smartContract.runQuery(
    networkProvider,
    new ContractFunction('getNFTs'),
    [userAddress]
  );

  return result;
}
