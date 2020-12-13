import React from 'react';
import styles from './NFTSelect.module.css';
import gStyles from '../../styles.module.css';



import { Row, Col, Button } from 'antd';

import Header from '../../components/Header/Header';
import goldPotato from '../../assets/goldPotato.jpg';
import diamondPotato from '../../assets/diamondPotato.jpg';
import silverPotato from '../../assets/silverPotato.jpg';
import platinumPotato from '../../assets/platinumPotato.jpg';

const tiers = {
    silver: silverPotato,
    gold: goldPotato,
    diamond: diamondPotato,
    platinum: platinumPotato
}

const cards = [
    'silver',
    'gold',
    'diamond',
    'platinum'
]

const NFTSelect = () => {

    return (
        <>
        <Row justify="center" style={{ margin: "100px 0px" }}>
            <span className={gStyles.header}>Choose your NFT</span>
        </Row>
        <Row >
            <Col xs={0} md={4}/>
            <Col xs={24} md={16}>
                <div className={styles.container}>
                    <a href={`/nft/silver`} className={styles.cardContainer}>
                        <img src={silverPotato} alt="card" className={styles.card} />
                        <div className={styles.details}>
                            <span className={styles.text}>Price: 30 BNB</span>
                            <Button type="ghost" className={gStyles.button} style={{ height: 30, position: "absolute", bottom: 10 }}>View</Button>
                        </div>
                    </a>
                    <a href={`/nft/gold`} className={styles.cardContainer}>
                        <img src={goldPotato} alt="card" className={styles.card} />
                        <div className={styles.details}>
                            <span className={styles.text}>Price: 30 BNB</span>
                            <Button type="ghost" className={gStyles.button} style={{ height: 30, position: "absolute", bottom: 10 }}>View</Button>
                        </div>
                    </a>
                    <a href={`/nft/platinum`} className={styles.cardContainer}>
                        <img src={platinumPotato} alt="card" className={styles.card} />
                        <div className={styles.details}>
                            <span className={styles.text}>Price: 30 BNB</span>
                            <Button type="ghost" className={gStyles.button} style={{ height: 30, position: "absolute", bottom: 10 }}>View</Button>
                        </div>
                    </a>
                    <a href={`/nft/diamond`} className={styles.cardContainer}>
                        <img src={diamondPotato} alt="card" className={styles.card} />
                        <div className={styles.details}>
                            <span className={styles.text}>Price: 30 BNB</span>
                            <Button type="ghost" className={gStyles.button} style={{ height: 30, position: "absolute", bottom: 10 }}>View</Button>
                        </div>
                    </a>
                </div>
            </Col>
            <Col xs={0} md={4}/>
        </Row>
        </>
    )
}

export default NFTSelect;