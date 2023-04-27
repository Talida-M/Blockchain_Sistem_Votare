const hre = require("hardhat");

async function main() {
  const candidatii = ["0x70616d7900000000000000000000000000000000000000000000000000000000"];

  const BuletinVot = await hre.ethers.getContractFactory("BuletinVot");
  const deployedContract = await BuletinVot.deploy(candidatii);

  await deployedContract.deployed();

  console.log("Contract Address:", deployedContract.address);

  await sleep(50000);

  // await hre.run("verify:verify", {
  //   address: deployedContract.address,
  //   constructorArguments: [candidatii],
  // });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
