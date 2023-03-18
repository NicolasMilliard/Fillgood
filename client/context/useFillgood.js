import { useContext } from 'react';
import FillgoodContext from './FillgoodContext';

const useFillgood = () => {
  const context = useContext(FillgoodContext);

  if (context === undefined) {
    throw new Error('useFillgood must be used within a UserProvider');
  }
  return context;
};

export default useFillgood;
