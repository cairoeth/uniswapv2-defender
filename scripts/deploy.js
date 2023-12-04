require('dotenv').config();

const { Defender } = require('@openzeppelin/defender-sdk');
const artifactFile = require('../artifacts/build-info/cb118a985cda635e6d83d969a1add70d.json');

async function main() {
  const client = new Defender({ apiKey: process.env.DEFENDER_KEY, apiSecret: process.env.DEFENDER_SECRET });

  // Get approval process and relayer for deployment on sepolia
  const approvalProcess = await client.deploy.getDeployApprovalProcess('sepolia');
  const relayer = await client.relay.get(approvalProcess.relayerId);

  const deployment = await client.deploy.deployContract({
    contractName: 'UniswapV2Factory',
    contractPath: 'contracts/UniswapV2Factory.sol',
    constructorInputs: [relayer.address],
    network: 'sepolia',
    artifactPayload: JSON.stringify(artifactFile),
    verifySourceCode: true,
  });
  
  const result = await client.deploy.getDeployedContract(deployment.deploymentId);
  console.log(`Contract deployed to ${await result.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});