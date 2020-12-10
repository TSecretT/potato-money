import React from 'react'
import styles from './StakeCard.module.css';

const StakeCard = ({hot, image, tierName, tokenName, duration, percent}) => {
    return (
        <a href={`/stake/${tierName.toLowerCase()}`} className={styles.card}>
            <img src={image} alt="image" className={styles.image} />
            <span className={hot? styles.tierNameHot : styles.tierName}>{tierName}</span>

            <div style={{ position: "absolute", bottom: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p className={styles.duration}>{duration}</p>
                <p className={styles.percent}>APY: <strong>{percent}%</strong></p>
                <p className={styles.tokenName}>
                    <p style={{ fontSize: 14 }}>fertilized with</p>
                    {tokenName}
                </p>
            </div>
        </a>
    )
}

export default StakeCard;