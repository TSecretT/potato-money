import { BN } from 'web3-utils'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const MAX_UINT256 = new BN('2').pow(new BN('256')).sub(new BN('1'));

export const contractAdress = "0xb990800fbADD2c94c06203Aeb572e5965Da1D3C1"
export const stakeContractAddress = "0xa7222Ef81870a68b848D49ecaf99ae90f9db0472";

export const tokenHero = "0xE325944d6c87a86A5fD0E1b6EeC7576d7Cd2ef83";
export const lockPool = "0xe3d83BD18F74c19e8403BB5545b52263E4687Be9"

export const stakeToken = {
    address: "0x93c3387878ec990d329a0f7295c487608524c975",
    decimals: 18,
    symbol: "BNB-ZHGN LP"
}

export const yieldToken =  {
    address: "0x93c3387878ec990d329a0f7295c487608524c975",
    decimals: 18,
    symbol: "ZGN"
}