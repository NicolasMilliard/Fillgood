export const setMessage = async (simpleStorageContract, message) => {
  try {
    if (!simpleStorageContract) return;

    const tx = await simpleStorageContract.setMessage(message);
    console.log(tx);
    return tx;
  } catch (error) {
    console.log(error);
  }
};
