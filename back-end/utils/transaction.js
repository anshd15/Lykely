const { ethers } = require('ethers');

const RPC_URL = process.env.LUKSO_MAINNET_RPC_URL;
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

async function tranferLYX(to, amount) {
	if (!RPC_URL || !PRIVATE_KEY) {
		throw new Error(
			'RPC_URL or PRIVATE_KEY is not defined in the environment variables.'
		);
	}
	const provider = new ethers.JsonRpcProvider(RPC_URL);
	const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

	const tx = await wallet.sendTransaction({
		to,
		value: ethers.parseEther(amount.toString()),
	});

	await tx.wait();
	console.log('LYX sent successfully:', tx.hash);
};

module.exports = {
  tranferLYX,
};