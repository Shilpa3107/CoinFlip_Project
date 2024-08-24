"use client";

import { useState } from 'react';
import Web3 from 'web3';

export default function Coinflip({ account, web3 }) {
  const [side, setSide] = useState('heads');
  const [bet, setBet] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('Coinflip Props:', { account, web3 });

  const flipCoin = async () => {
    setIsLoading(true);
    try {
      const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
      const win = flipResult === side;
      setResult(win ? 'You Win!' : 'You Lose!');
      
      if (win) {
        // Simulate token transfer (update this with real logic if needed)
        console.log(`Winning! Transfer ${bet} ETH to ${account}`);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
      <button onClick={flipCoin} disabled={isLoading}>
        {isLoading ? 'Flipping...' : 'Flip Coin'}
      </button>
      <div>{result}</div>
    </div>
  );
}
