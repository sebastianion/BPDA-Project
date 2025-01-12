function NFTCard({ nft }) {
    return (
      <div className="nft-card">
        <img src={nft.media[0].url} alt={nft.name} />
        <h3>{nft.name}</h3>
        <p>Course: {nft.attributes.courseName}</p>
        <p>Grade: {nft.attributes.grade}</p>
        <p>Issuer: {nft.attributes.issuer}</p>
      </div>
    );
  }
  
export default NFTCard;