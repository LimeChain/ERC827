const ethers = require('ethers');
const providers = ethers.providers;
const Wallet = ethers.Wallet;
const Token = require('./build/contracts/Token');
const Target = require('./build/contracts/Target');

const apiKey = 'H4UAAWyThMPs2WB9LsHD';

var provider;

(async function () {

	if (process.argv.length != 3) {
		throw new Error('Invalid arguments');
	}

	const privateKey = process.argv[2];

	const tokenAddress = '0xf4146041ede0b35a6573da0d820ca6da785dff17';
	const targetAddress = '0x7638ca0048f85725555c12d0975e78503554bd61';
	const ownerAddress = '0xD9995BAE12FEe327256FFec1e3184d492bD94C31';

	const localNodeProvider = new providers.JsonRpcProvider('http://localhost:8545', providers.networks.unspecified);
	provider = new providers.FallbackProvider([
		localNodeProvider
	]);

	const wallet = new Wallet('0x' + privateKey);

	wallet.provider = provider;

	const tokenContract = new ethers.Contract(tokenAddress, Token.abi, wallet);

	const targetContract = new ethers.Contract(targetAddress, Target.abi, wallet);

	const data = targetContract.interface.functions.setA(ownerAddress, 1766).data;

	const owner = await tokenContract.owner();

	const mintTx = await tokenContract.mint(owner, 1000000000000000);

	await provider.waitForTransaction(mintTx.hash);

	const res = await tokenContract.approveAndCall(targetAddress, 40000, data);

	const result = await provider.waitForTransaction(res.hash);

	const receipt = await provider.getTransactionReceipt(res.hash);

	const a = await targetContract.a();

	const b = await targetContract.b();

	const balance = await tokenContract.balanceOf(targetAddress);

	console.log(balance.toString());



})()