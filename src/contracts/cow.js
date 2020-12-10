import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { BigNumber } from 'bignumber.js'
BigNumber.set({ DECIMAL_PLACES: 18 })

const COW_ABI = require('./cow.json');


export class Cow {
	constructor(address, stakeToken, yieldToken) {
		this.web3 = new Web3(window.ethereum);
		this.address = address;
		this.contract = new this.web3.eth.Contract(COW_ABI, address);
		this.stakeToken = stakeToken;
		this.yieldToken = yieldToken;
		this.defaultGasPrice = 20000000000;
		this.stakePrecision = BigNumber(10).pow(BigNumber(this.stakeToken.decimals));
		this.yieldPrecision = BigNumber(10).pow(BigNumber(this.yieldToken.decimals));
	}

	fromBN(amount){
		return amount.c[0]
	}

	setProvider(provider) {
		this.web3.setProvider(provider)
	}

	async stakeTokenAddress() {
		return this.stakeToken ? this.stakeToken.address : await this.contract.methods.stakeToken().call();
	}

	async yieldTokenAddress() {
		return this.yieldToken ? this.stakeToken.address : await this.contract.methods.yieldToken().call();
	}

	async totalSupply() {
		let supply = await this.contract.methods.totalSupply().call();
		return this.fromBN(BigNumber(supply).div(this.yieldPrecision))
	}

	async totalStaked() {
		let supply = await this.contract.methods.totalstaked().call();
		return this.fromBN(BigNumber(supply).div(this.yieldPrecision))
	}

	async gasPrice() {
		return await this.web3.eth.getGasPrice() || this.defaultGasPrice;
	}

	async stake(sender, amount, callback) {
		let weiAmount = BigNumber(amount).times(this.stakePrecision);
		console.log(weiAmount);
		var gasPrice = await this.gasPrice();
		var tx = this.contract.methods.stake(toBN(weiAmount));
		let gasLimit = 150000;
		try {
			gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address });
		} catch(err) {
			console.log("Gas limit error", err)
		}
		return tx.send({
			from: sender,
			gasPrice: gasPrice,
			gas: Math.round(gasLimit * 1.1)
		}, callback);
	}

	async earned(sender) {
		let earned = await this.contract.methods.earned(sender).call();
		return this.fromBN(BigNumber(earned).div(this.stakePrecision));
	}	
	
	async balanceOf(sender) {
		let balance =  await this.contract.methods.balanceOf(sender).call();
		return this.fromBN(BigNumber(balance).div(this.stakePrecision));
	}

	async periodFinish() {
		return await this.contract.methods.periodFinish().call();
	}

	async duration() {
		return await this.contract.methods.duration().call();
	}

	async lastUpdateTime() {
		return await this.contract.methods.lastUpdateTime().call();
	}

	async startTime() {
		return await this.contract.methods.starttime().call();
	}

	async finishTime() {
		return await this.contract.methods.finishTime().call();
	}

	async initreward() {
		let initReward = await this.contract.methods.initreward().call();
		return this.fromBN(BigNumber(initReward).div(this.yieldPrecision));
	}

	async rewardRate() {
		let rewardRate = await this.contract.methods.rewardRate().call();
		return this.fromBN(BigNumber(rewardRate).div(this.yieldPrecision));
	}

	async getReward(sender, callback) {
		var gasPrice = await this.gasPrice();
		var tx = this.contract.methods.getReward();
		var gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address });
		return tx.send({
			from: sender,
			gasPrice: gasPrice,
			gas: Math.round(gasLimit * 1.1)
		}, callback);
	}

	async exit(sender, callback) {
		var gasPrice = await this.gasPrice();
		var tx = this.contract.methods.exit();
		var gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address });
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
		return await this.contract.methods.canRedeem(sender).call();
	}

}

export default Cow;