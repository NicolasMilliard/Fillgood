export const getMessage = async (simpleStorageContract) => {
  console.log(simpleStorageContract);
  try {
    if (!simpleStorageContract) return;
    const tx = await simpleStorageContract.getMessage();
    console.log(tx);
    return tx;
  } catch (error) {
    console.log(error);
  }
};
