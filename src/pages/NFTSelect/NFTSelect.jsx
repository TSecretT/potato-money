import React from 'react';
import styles from './NFTSelect.module.css';
import gStyles from '../../styles.module.css';


import ReactParticles from 'react-particles-js';
import { particlesConfig } from '../../utils/particlesConfig';
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
        <ReactParticles params={particlesConfig} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}/>
        <Row justify="center" style={{ margin: "100px 0px" }}>
            <span className={gStyles.header}>Choose your NFT</span>
        </Row>
        <Row >
            <Col xs={0} md={4}/>
            <Col xs={24} md={16}>
                <div className={styles.container}>
                    {[cards.map((card, i) => {return(
                        <a href={`/nft/${card}`}>
                            <img src={tiers[card]} alt="card" className={styles.card} />
                        </a>
                    )})]}
                </div>
            </Col>
            <Col xs={0} md={4}/>
        </Row>
        
        </>
    )
}

export default NFTSelect;