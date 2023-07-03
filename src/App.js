import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('');

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  const handleInputChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const getWalletBalance = async () => {
    try {
      const balance = await alchemy.core.getBalance(walletAddress);
      setWalletBalance(balance.toString());
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="walletAddress">Wallet Address: </label>
        <input
          id="walletAddress"
          type="text"
          value={walletAddress}
          onChange={handleInputChange}
        />
        <button onClick={getWalletBalance}>Get Balance</button>
      </div>
      <div>Block Number: {blockNumber}</div>
      <div>Wallet Balance: {walletBalance} Wei</div>
    </div>
  );
}

export default App;
