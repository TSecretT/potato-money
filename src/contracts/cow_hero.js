import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { BigNumber } from 'bignumber.js'
import config from '../config';
BigNumber.set({ DECIMAL_PLACES: 18 })


const COW_HERO_ABI = require('./cow_hero.json');


export class CowHero {
	constructor(address) {
		this.web3 = new Web3(window.ethereum);
		this.web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.address = address;
		this.contract = new this.web3.eth.Contract(COW_HERO_ABI, address);
		this.contractReader = new this.web3Reader.eth.Contract(COW_HERO_ABI, address);
		this.defaultGasPrice = 20000000000;
	}

	fromBN(amount) {
		return BigNumber(amount).div(18)["c"][0] || 0;
	}

	async totalSupply() {
		return await this.contractReader.methods.totalSupply().call();
	}

	async balanceOf(sender) {
		let balance =  await this.contractReader.methods.balanceOf(sender).call();
		console.log(balance)
		return BigNumber(balance);
	}

	async tokenOfOwnerByIndex(owner, index) {
		let id = await this.contractReader.methods.tokenOfOwnerByIndex(owner, index).call();
		return id
	}
}

export default CowHero;