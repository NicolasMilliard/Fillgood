export const getMessage = async (simpleStorageContract) => {
  try {
    if (!simpleStorageContract) return;

    const tx = await simpleStorageContract.getMessage();
    return tx;
  } catch (error) {
    console.log(error);
  }
};
