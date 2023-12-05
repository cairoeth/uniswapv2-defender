# Uniswap v2 with OpenZeppelin Defender 2.0

This project demonstrates a basic Uniswap v2 factory deployment with OpenZeppelin Defender 2.0.

First, duplicate the `.env.example` file and rename it `.env`. Then, create a deployment enviroment on [Defender 2.0](https://defender.openzeppelin.com/v2/#/deploy), and copy your API key and secret to the `.env` file.

Then, install the packages with:
```shell
npm i
```

And compile the contracts with Hardhat:
```shell
npx hardhat compile
```

To deploy, run the script with `node scripts/deploy.js`. Make sure that the artifact path is pointing to the build info json in the `artifacts` folder, and that the relayer you are using in Defender has enough funds for the deployment on Sepolia (or whatever network you want to use).

Test.