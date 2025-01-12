import { useEffect, useState } from 'react';
import NFTCard from '../components/NFTCard';

function Dashboard() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function fetchNFTs() {
      const response = await fetch('/api/nfts'); // todo
      const data = await response.json();
      setNfts(data);
    }

    fetchNFTs();
  }, []);

  return (
    <div>
      <h1>Your Academic NFTs</h1>
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}

export default Dashboard;
