const { ERC725 } = require('@erc725/erc725.js');
const profileSchema = require('@erc725/erc725.js/schemas/LSP3ProfileMetadata.json');

async function getUPdata(address) {
	const erc725js = new ERC725(
		profileSchema,
		address,
		process.env.LUKSO_MAINNET_RPC_URL,
		{
			ipfsGateway: process.env.IPFS_GATEWAY_URL,
		}
	);

	const decodedProfileMetadata = await erc725js.fetchData('LSP3Profile');
  return decodedProfileMetadata;
}

module.exports = { getUPdata };
