const hre = require("hardhat");

const main = async() => {
  await hre.ethers.provider.ready;
  const [deployer] = await hre.ethers.getSigners();

  // Deployer's balance before deployment
  let balance = await deployer.getBalance();
  console.log(
    `Deployer original balance: ${hre.ethers.utils.formatEther(balance)}`
  );

  // Deploy SimpleStorage
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  await simpleStorage.deployed();
  console.log(`SimpleStorage is deployed: ${simpleStorage.address}`);

  // Deployer's balance after deployment
  balance = await deployer.getBalance();
  console.log(`Deployer new balance: ${hre.ethers.utils.formatEther(balance)}`);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});