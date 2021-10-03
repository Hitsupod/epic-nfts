const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT'); 
  /* This will actually compile our contract and generate the necessary files we need 
  to work with our contract under the artifacts directory. Go check it out after you run this */

  const nftContract = await nftContractFactory.deploy();
  /*What's happening here is Hardhat will create a local Ethereum network for us, but just 
  for this contract. Then, after the script completes it'll destroy that local network. 
    So, every time you run the contract, it'll be a fresh blockchain. Whats the point? It's 
    kinda like refreshing your local server every time so you always start from a 
    clean slate which makes it easy to debug errors. */

  await nftContract.deployed(); // We'll wait until our contract is officially mined and deployed to our local blockchain! 

  console.log("Contract deployed to:", nftContract.address); 
  /* Finally, once it's deployed nftContract.address will basically give us the address of the deployed contract. 
  This address is how can actually find our contract on the blockchain. */
  
  // Call the function.
  let txn = await nftContract.makeAnEpicNFT()
  
  // Wait for it to be mined.
  await txn.wait()

  // Mint another NFT for fun.
  txn = await nftContract.makeAnEpicNFT()
  // Wait for it to be mined.
  await txn.wait()
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();