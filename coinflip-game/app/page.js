"use client";

import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import WalletConnect from './WalletConnect';
import Coinflip from './Coinflip';

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setWeb3(new Web3(provider));
      } else {
        console.error('No Ethereum provider found');
      }
    };
    initWeb3();
  }, []);

  console.log('Web3:', web3);
  console.log('Account:', account);

  return (
    <div>
      <h1>Coinflip Game</h1>
      <WalletConnect setAccount={setAccount} />
      {web3 && account ? (
        <Coinflip web3={web3} account={account} />
      ) : (
        <div>Please connect your wallet</div>
      )}
    </div>
  );
}
