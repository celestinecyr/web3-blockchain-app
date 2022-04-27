const main = async () => {

  const Transactions = await hre.ethers.getContractFactory("Transactions");         //this is like a factory/class that is going to generate instances of that specific contract
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

const runMain = async () => {
  try {
    await main();           //this will deploy and execute our contract
    process.exit(0);        //means process went successfully
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


//* when executing deploy.js file:
/*
#1 runMain(); will be executed, which calls runMain function
#2 calls main() function which is responsible for deploying the contract 
#3 Transactions is going to be deployed and then we're going to get the address (line 10) of our smart contract deployed on the blockchain network

--------------------------------------------------------------------
for blockchain to be deployed we need to have some ethereum on our wallet already - because anything we do on the ethereum network requires gas.

after transactions.sol , deploy.js , and hardhat.config.js is done, we can run 
npx hardhat run scripts/deploy.js --network ropsten to deploy
*/