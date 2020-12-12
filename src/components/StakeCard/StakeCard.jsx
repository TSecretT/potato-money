import React from 'react'
import styles from './StakeCard.module.css';

import Cow from '../../contracts/cow';
import { STAKE_LOW } from '../../config';

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
        <a href={`/stake/${tierName.toLowerCase().replace(/\s+/g, '-')}`} className={styles.card}>
            <img src={image} alt="image" className={styles.image} />
            <span className={hot? styles.tierNameHot : styles.tierName}>{tierName}</span>

            <div style={{ position: "absolute", bottom: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p className={styles.duration}>{duration}</p>
                <p className={styles.percent}>APY: <strong>{percent}%</strong></p>
                <p className={styles.percent}>Total <strong>{staked}</strong> staked</p>
                <p className={styles.tokenName}>
                    <p style={{ fontSize: 14 }}>fertilized with</p>
                    {tokenName}
                </p>
            </div>
        </a>
    )
}

export default StakeCard;