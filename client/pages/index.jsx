import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useFillgood } from '../context';

import { getMessage } from '../utils/getMessage';
import { setMessage } from '../utils/setMessage';

const Homepage = () => {
  const {
    state: { simpleStorageContract },
  } = useFillgood();
  // Used to fix hydration error
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  });

  if (!hasMounted) return null;

  const getMessageFromSC = async () => {
    await getMessage(simpleStorageContract);
  };

  const setMessageFromSC = async () => {
    await setMessage(simpleStorageContract, 'bonjour');
  };

  return (
    <>
      <ConnectButton />
      <button onClick={getMessageFromSC}>Get message</button>
      <button onClick={setMessageFromSC}>Set message (bonjour)</button>
    </>
  );
};

export default Homepage;
