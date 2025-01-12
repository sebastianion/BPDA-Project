import { useEffect } from 'react';
import { DappProvider, useDapp } from '@multiversx/sdk-dapp';

function WalletConnect() {
  const { login, logout, account } = useDapp();

  return (
    <div>
      {account.address ? (
        <div>
          <p>Connected: {account.address}</p>
          <button onClick={logout}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => login('maiar')}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnect;
