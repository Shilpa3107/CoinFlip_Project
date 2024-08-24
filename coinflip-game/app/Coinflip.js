"use client";

import { useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider); // Initialize web3 with the given provider

export default function Coinflip({ account }) {
  const [side, setSide] = useState('heads');
  const [bet, setBet] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenABI, setTokenABI] = useState('');
  const [tokenContract, setTokenContract] = useState(null);

  // Initialize the token contract with ABI and address
  const initializeTokenContract = () => {
    try {
      const abi = JSON.parse(tokenABI);
      const contract = new web3.eth.Contract(abi, tokenAddress);
      setTokenContract(contract);
    } catch (error) {
      console.error('Error initializing token contract:', error);
      alert('Invalid ABI or address');
    }
  };

  const flipCoin = async () => {
    if (!bet || isNaN(bet) || bet <= 0) {
      alert('Please enter a valid bet amount.');
      return;
    }

    if (!tokenContract) {
      alert('Please initialize the token contract with a valid ABI and address.');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Simulate coin flip
      const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
      console.log('Coin Flip Result:', flipResult);

      // Determine if the user won
      const win = flipResult === side;
      const outcome = win ? `You Win! ${bet} ETH has been added to your account.` : 'You Lose!';

      setResult(outcome);

      if (win) {
        // Perform real token transfer
        await transferTokens(bet, account);
      }
    } catch (error) {
      console.error('Error flipping coin:', error);
      setResult('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const transferTokens = async (amount, recipient) => {
    try {
      if (!tokenContract) {
        alert('Token contract is not initialized.');
        return;
      }

      const accounts = await web3.eth.getAccounts();
      await tokenContract.methods.transfer(recipient, web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
      console.log(`Transferred ${amount} tokens to ${recipient}`);
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  };

  return (
    <div>
      <h2>Coinflip Game</h2>
      <label>
        Choose side:
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
      </label>
      <br />
      <label>
        Bet Amount (ETH):
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
        />
      </label>
      <br />
      <label>
        Token Address:
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        Token ABI (JSON):
        <textarea
          value={tokenABI}
          onChange={(e) => setTokenABI(e.target.value)}
          rows="5"
          cols="30"
        />
      </label>
      <br />
      <button onClick={initializeTokenContract}>Initialize Token Contract</button>
      <br />
      <button onClick={flipCoin} disabled={isLoading}>
        {isLoading ? 'Flipping...' : 'Flip Coin'}
      </button>
      <div>{result}</div>
    </div>
  );
}
