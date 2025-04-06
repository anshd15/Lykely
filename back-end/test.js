const { ERC725 } = require('@erc725/erc725.js');
const profileSchema = require('@erc725/erc725.js/schemas/LSP3ProfileMetadata.json');

async function fetch() {
	const erc725js = new ERC725(
		profileSchema,
		'0x22CA8dE1B86F86D16CF8F84B391b476EEAD4Cd6F',
		'https://rpc.mainnet.lukso.network',
		// {
		// 	ipfsGateway: 'https://api.universalprofile.cloud/ipfs/',
		// }
	);

	const decodedProfileMetadata = await erc725js.fetchData('LSP3Profile');
	console.log(decodedProfileMetadata);
}
fetch()
//   {
//     key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
//     name: 'LSP3Profile',
//     value: {
//       LSP3Profile: {
//         name: 'testname',
//         description: '',
//         tags: ['profile'],
//         links: [],
//         profileImage: [[Object], [Object], [Object], [Object], [Object]],
//         backgroundImage: [],
//       },
//     },
//   },
