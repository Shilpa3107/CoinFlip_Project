'use client';

import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

export default function WalletConnect() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    } else {
      alert('MetaMask not found! Please install MetaMask.');
    }
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>Connected Account: {account}</div>
      )}
    </div>
  );
}
