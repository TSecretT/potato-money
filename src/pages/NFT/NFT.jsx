import React from 'react';
import styles from './NFT.module.css';
import gStyles from '../../styles.module.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import clsx from 'clsx';

import { Row, Col, Button, Alert, Progress } from 'antd';

import ReactParticles from 'react-particles-js';
import { particlesConfig } from '../../utils/particlesConfig';
import Header from '../../components/Header/Header';
import goldPotato from '../../assets/goldPotato.jpg';
import diamondPotato from '../../assets/diamondPotato.jpg';
import silverPotato from '../../assets/silverPotato.jpg';
import platinumPotato from '../../assets/platinumPotato.jpg';

import {BigNumber} from 'bignumber.js'
import Cow from '../../contracts/cow';
import Erc20 from '../../contracts/erc20';
import LockPool from '../../contracts/lock_pool';
import CowHero from '../../contracts/cow_hero';

import config from '../../config';

const tiers = {
    silver: silverPotato,
    gold: goldPotato,
    diamond: diamondPotato,
    platinum: platinumPotato
}

let lockPool;
let lockToken;
let lockHero;

const NFT = () => {
    const [loaded, setLoaded] = React.useState(false);
    const [percent, setPercent] = React.useState(0);
    const [lockTotal, setLockTotal] = React.useState("--");
    const [lockAmount, setLockAmount] = React.useState("--");
    const [lockDays, setLockDays] = React.useState("--");
    const [balance, setBalance] = React.useState("--");
    const [allowed, setAllowed] = React.useState();
    const [isLocked, setLocked] = React.useState();
    const [redeemable, setRedeemable] = React.useState();
    const [unlockTime, setUnlockTime] = React.useState();
    const [processing, setProcessing] = React.useState(false); // Locking process
    const [hash, setHash] = React.useState();
    const [error, setError ] = React.useState();

    const { tier } = useParams();

    const wallet = localStorage.wallet;

    const onStake = async () => {
        if(!lockPool) return;
        setProcessing(true);
        setHash();
        setError();

        lockPool.lock(wallet, (err, txHash) => {
            if(txHash) setHash(txHash)
        })
        .then((receipt, b) => {
            if(receipt) console.log("Receipt", receipt);
            if(b) console.log("b", b);
            update();
            setProcessing(false);
        })
        .catch(error => { console.log(error); setProcessing(false); setError(error.message) });
    }

    const onUnstake = () => {
        if(!lockPool) return;
        setHash();
        setError();
        setProcessing(true);

        lockPool.redeem(wallet, (err, txHash) => {
            if(txHash) setHash(txHash)
        })
        .then(receipt => {
            if(receipt) console.log("Receipt", receipt)
            update();
            setProcessing(false);
        })
        .catch(error => { console.log(error); setProcessing(false); setError(error.message) });
    }

    const update = async () => {
        let lockTotal = await lockHero.totalSupply();
        let lockAmount = await lockPool.lockAmount();
        let lockDays = await lockPool.lockPeriod();
        setLockTotal(lockTotal);
        setLockAmount(lockAmount);
        setLockDays(lockDays);
        if(wallet){
            let balance = await lockToken.balanceOf(wallet);
            let allowance = await lockToken.allowance(wallet, lockPool.address);
            if(allowance) setAllowed(true);
            let canRedeem = await lockPool.canRedeem(wallet);
            let isLocked = await lockPool.isLocked(wallet);
            let unlockTime = await lockPool.unlockTime(wallet);
            setBalance(balance);
            setLocked(isLocked);
            setRedeemable(canRedeem);
            setUnlockTime(unlockTime);
            console.log("Balance:", balance, "Allowance:", allowance, "Allowed:", allowed, "canRedeem:", canRedeem, "isLocked:", isLocked, "unlockTime:", unlockTime)
        }
    }

    const init = async () => {
        lockPool = new LockPool(config.lockPool, config.lockToken);
        lockToken = new Erc20(config.lockToken.address, config.lockToken.symbol, config.lockToken.decimals);
        lockHero = new CowHero(config.lockHero);
        let lockTotal = await lockHero.totalSupply();
        setLockTotal(lockTotal);
        setPercent(15);
        let lockAmount = await lockPool.lockAmount();
        setLockAmount(lockAmount);
        setPercent(30);
        let lockDays = await lockPool.lockPeriod();
        setLockDays(lockDays);
        setPercent(45);

        if(wallet){
            let isLocked = await lockPool.isLocked(wallet);
            setLocked(60);
            let balance = await lockToken.balanceOf(wallet);
            setBalance(balance);
            setPercent(75);
            let allowance = await lockToken.allowance(wallet, lockPool.address);
            if(allowance) setAllowed(true);
            let canRedeem = await lockPool.canRedeem(wallet);
            setRedeemable(canRedeem);
            setPercent(90);
            let unlockTime = await lockPool.unlockTime(wallet);
            setUnlockTime(unlockTime);
            setPercent(100);
            console.log("Balance:", balance, "Allowance:", allowance, "Allowed:", allowed, "canRedeem:", canRedeem, "isLocked:", isLocked, "unlockTime:", unlockTime)
        }

        setLoaded(true);
        setInterval(update, 5*1000);
    }

    React.useEffect(() => {
        init();
    }, [])

    return (
        <>
        <Row style={{ margin: "100px 0px" }}>
            <Col xs={24} md={10}>
                <div className={styles.cardContainer}>
                    <img className={styles.image} src={tiers[tier]} alt='potato' />
                </div>
            </Col>
            <Col xs={24} md={14}>
                <div className={styles.container}>
                    <span className={styles.header}>{tier.toUpperCase()} POTATO</span>
                    <span className={styles.category}><strong>Category:</strong> POTATO LIMITED COLLECTION</span>
                    <span className={gStyles.text} style={{ textAlign: "initial" }}>{config.NFT_TEXTS[tier]}</span>
                    <div style={{ margin: "40px 0", display: "flex", flexDirection: "column" }}>
                        <span className={styles.text}><strong>{lockTotal}</strong>/1000 minted</span>
                        <span className={styles.text}>Lock <strong>{lockAmount}</strong> {config.lockToken.symbol} for <strong>{lockDays} minutes</strong></span>
                        {/* <span className={clsx(styles.header, styles.info)}>Lock your <span className={styles.bigHeader}>BNB-Potato LP</span> token to get <span className={styles.bigHeader}>{tier.charAt(0).toUpperCase() + tier.slice(1)} Potato NFT</span></span> */}
                    </div>
                    {loaded? (
                        <div className={styles.nftContainer}>
                            <span className={styles.text}>Your balance: <strong>{balance}</strong> BNB Potato</span>
                            {isLocked? <span className={styles.text}>You can redeem at: {moment(unlockTime*1000).format("HH:mm DD/MM/YYYY")}</span> :null}
                            {hash? <Alert className={styles.alert} type={processing? "info" : (!processing && error)? "error" : "success"} message={`Transaction HASH: ${hash}`} /> : null}
                            {error? <Alert className={styles.alert} type="error" message={`Transaction Error: ${error}`} /> : null}
                            {isLocked? (
                                <Button type="ghost" loading={processing} onClick={onUnstake} className={styles.button} disabled={!redeemable}>Redeem</Button>
                            ) : <Button type="ghost" loading={processing} onClick={onStake} className={styles.button}>Lock {config.lockToken.symbol}</Button>}
                        </div>
                    ) : (
                        <Progress trailColor="#232323" strokeColor="white" style={{ margin: 10 }} type="circle" percent={percent} showInfo={false} />
                    )}
                </div>
            </Col>
            
        </Row>
        </>
    )
}

export default NFT;