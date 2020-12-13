import React from 'react'
import styles from './StakeCard.module.css';
import gStyles from '../../styles.module.css';

import { Button } from 'antd';
import Cow from '../../contracts/cow';
import { STAKE_LOW } from '../../config';

import config from '../../config';

const StakeCard = ({hot, image, tierName, tokenName, duration, percent}) => {
    const [staked, setStaked] = React.useState("--");

    const getStaked = async (contract) => {
        setStaked(await contract.totalSupply());
    }

    React.useEffect(() => {
        let contract = new Cow(STAKE_LOW.address, STAKE_LOW.stakeToken, STAKE_LOW.yieldToken);
        getStaked(contract)
    }, [])
    
    return (
        <div className={styles.card}>
            <img src={image} alt="image" className={styles.image} />
            <span className={hot? styles.tierNameHot : styles.tierName}>{tierName}</span>
            <p className={styles.text}><strong>Deposit:</strong> {tokenName}</p>
            <p className={styles.text}><strong>Earn:</strong> POTATO</p>
            <p className={styles.text}><strong>APY:</strong> {percent}%</p>
            <p className={styles.text}><strong>Period:</strong> {duration}%</p>
            <p className={styles.text}>Total <strong>{staked}</strong> staked</p>
            <Button href={`/stake/${tierName.toLowerCase().replace(/\s+/g, '-')}`} type="ghost" className={gStyles.button} style={{ margin: "40px 0px 20px 0px", height: 40 }}>Select</Button>
            <a href={`https://testnet.bscscan.com/address/${config.STAKE_LOW.address}`} className={styles.link}>View on BscScan</a>
        </div>
    )
}

export default StakeCard;