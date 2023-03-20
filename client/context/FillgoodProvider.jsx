import { ethers } from 'ethers';
import { useCallback, useEffect, useReducer } from 'react';
import { useNetwork } from 'wagmi';

import simpleStorageContractArtifact from '../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json';

import FillgoodContext from './FillgoodContext';
import { actions, initialState, reducer } from './state';

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

const FillgoodProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { chain } = useNetwork();

  // Load SimpleStorage
  const init = useCallback(() => {
    let simpleStorageContract;

    if (!chain) {
      return;
    }

    if (chain.name === 'Localhost') {
      simpleStorageContract = loadContract(
        process.env.SIMPLE_STORAGE_LOCALHOST,
        simpleStorageContractArtifact.abi,
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

  // Reload SC if chain has changed
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
