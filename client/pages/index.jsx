import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Homepage = () => {
  const { address } = useAccount();
  // Used to fix hydration error
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  });

  if (!hasMounted) return null;

  return <ConnectButton />;
};

export default Homepage;
