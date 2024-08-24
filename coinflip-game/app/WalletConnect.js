"use client";

import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

export default function WalletConnect({ setAccount }) {
  const [account, setLocalAccount] = useState(null);

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts();
      setLocalAccount(accounts[0]);
      setAccount(accounts[0]);
    } else {
      alert('MetaMask not found! Please install MetaMask.');
    }
  };

  console.log('WalletConnect Account:', account);

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
