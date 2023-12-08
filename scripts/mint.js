require('dotenv').config();

const { ethers } = require("hardhat")
const { Defender } = require('@openzeppelin/defender-sdk');
const artifactFileFactory = require('../artifacts/build-info/882a7dae289d35aee7a5e6e693306eaa.json');
const artifactFileToken = require('../artifacts/build-info/e98d584063a14ef1e8f9ac4d52aa7640.json');

const INITIAL_MINT = ethers.parseUnits('1000000', 18); // $1M

async function main() {

  // New Defender Object
  const client = new Defender({ apiKey: process.env.DEFENDER_KEY, apiSecret: process.env.DEFENDER_SECRET });

  // Get approval process and relayer for deployment on sepolia
  const approvalProcess = await client.deploy.getDeployApprovalProcess('sepolia');
  const relayer = await client.relay.get(approvalProcess.relayerId);

  // Factory Deployment
  let deployment;
  let result;

  // Token Deployment
  deployment = await client.deploy.deployContract({
    contractName: 'JohnnyTimeToken',
    contractPath: 'contracts/JohnnyTimeToken.sol',
    constructorInputs: [relayer.address, INITIAL_MINT.toString()],
    network: 'sepolia',
    artifactPayload: JSON.stringify(artifactFileToken),
    verifySourceCode: true,
  });

  result = await client.deploy.getDeployedContract(deployment.deploymentId);
  console.log(`Token Contract deployed to ${await result.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});