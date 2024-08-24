"use client";

import { useState } from 'react';

export default function Coinflip({ account, web3 }) {
  const [side, setSide] = useState('heads');
  const [bet, setBet] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const flipCoin = async () => {
    // Validate input
    if (!bet || isNaN(bet) || bet <= 0) {
      alert('Please enter a valid bet amount.');
      return;
    }

    // Disable button during processing
    setIsLoading(true);
    setResult(null);

    try {
      // Simulate coin flip
      const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
      console.log('Coin Flip Result:', flipResult);

      // Check if user won
      const win = flipResult === side;

      // Update result based on outcome
      if (win) {
        setResult(`You Win! ${bet} ETH has been added to your account.`);
        // Simulate token transfer here
        console.log(`Simulate transferring ${bet} ETH to ${account}`);
      } else {
        setResult('You Lose!');
      }
    } catch (error) {
      console.error('Error flipping coin:', error);
      setResult('An error occurred. Please try again.');
    } finally {
      // Re-enable button after processing
      setIsLoading(false);
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
      <button onClick={flipCoin} disabled={isLoading}>
        {isLoading ? 'Flipping...' : 'Flip Coin'}
      </button>
      <div>{result}</div>
    </div>
  );
}
