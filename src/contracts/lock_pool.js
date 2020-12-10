import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { BigNumber } from 'bignumber.js'
import LOCK_POOL_ABI from './lock_pool.json';

BigNumber.set({ DECIMAL_PLACES: 18 })
const provider = "https://data-seed-prebsc-1-s1.binance.org:8545/"

export class LockPool {
	constructor(address, lockToken) {
		this.web3 = new Web3(window.ethereum);
		this.web3Reader = new Web3(new Web3.providers.HttpProvider(provider));
		this.address = address;
		this.contract = new this.web3.eth.Contract(LOCK_POOL_ABI, address);
		this.contractReader = new this.web3Reader.eth.Contract(LOCK_POOL_ABI, address);
		this.lockToken = lockToken;
		this.defaultGasPrice = 20000000000;
	}

	fromBN(amount) {
		return BigNumber(amount).div(this.lockToken.decimals)["c"][0] || 0;
	}

	async totalSupply() {
		let supply = await this.contractReader.methods.totalSupply().call();
		return BigNumber(supply).shiftedBy(-this.lockToken.decimals).toNumber();
	}

	async lock(sender, callback) {
		var gasPrice = this.defaultGasPrice;
	  var tx = this.contract.methods.lock();
	  let gasLimit = 300000;
	  return tx.send({
	    from: sender,
	    gasPrice: gasPrice,
	    gas: Math.round(gasLimit * 1.1)
	  }, callback);
	}

	async redeem(sender, callback) {
		var gasPrice = this.defaultGasPrice;
	  var tx = this.contract.methods.redeem();
	  let gasLimit = 300000;
	  return tx.send({
	    from: sender,
	    gasPrice: gasPrice,
	    gas: Math.round(gasLimit * 1.1)
	  }, callback);
	}

	async canRedeem(sender) {
		return await this.contractReader.methods.canRedeem(sender).call();
	}

	async balanceOf(sender) {
		let balance =  await this.contractReader.methods.balanceOf(sender).call();
		return BigNumber(balance).shiftedBy(-this.lockToken.decimals).toNumber()
	}

	async lockAmount() {
		let amount = await this.contractReader.methods.lockAmount().call();
		return BigNumber(amount).shiftedBy(-this.lockToken.decimals).toNumber()
	}

	async lockPeriod() {
		let duration = await this.contractReader.methods.lockPeriod().call();
		// let days = duration / (24 * 3600);
		return duration;
	}

	async isLocked(sender) {
		return await this.contractReader.methods.isLocked(sender).call();
	}
	
	async unlockTime(sender) {
		return await this.contractReader.methods.unlockTime(sender).call();
	}
}

export default LockPool;