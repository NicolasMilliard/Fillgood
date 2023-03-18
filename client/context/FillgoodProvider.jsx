import { ethers } from 'ethers';
import { useCallback, useEffect, useReducer } from 'react';
import { useNetwork } from 'wagmi';

import SimpleStorageContractArtifact from '../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json';

import FillgoodContext from './FillgoodContext';
import { actions, initialState, reducer } from './state';

const FillgoodProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { chain } = useNetwork();

  // Load a Smart Contract
  const loadContract = (address, abi) => {
    let contract = undefined;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        contract = new ethers.Contract(address, abi, signer);
      } else {
        console.log('No ethereum object');
      }
    } catch (error) {
      console.log('Contract error: ' + error);
    }
    return contract;
  };

  // Load SimpleStorage
  const init = useCallback(() => {
    let simpleStorageContract;

    if (!chain) {
      console.log('no chain, must be replace with a return');
      return;
    }

    if (chain.name === 'Localhost') {
      simpleStorageContract = loadContract(
        process.env.SIMPLE_STORAGE_LOCALHOST,
        SimpleStorageContractArtifact.abi,
      );
    }

    try {
      dispatch({
        type: actions.INIT,
        data: {
          simpleStorageContract: simpleStorageContract,
        },
      });
    } catch (error) {
      console.log('Could not load the Smart Contract: ' + error);
    }
  }, [chain]);

  useEffect(() => {
    const tryInit = async () => {
      try {
        init();
      } catch (error) {
        console.log(error);
      }
    };
    tryInit();
  }, [init, chain]);

  return (
    <FillgoodContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FillgoodContext.Provider>
  );
};

export default FillgoodProvider;
