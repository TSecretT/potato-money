import React from 'react'
import styles from './NFT.module.css';
import gStyles from '../../styles.module.css';

import { useHistory } from 'react-router-dom';
import { Col, Row, Button } from 'antd';

import goldPotato from '../../assets/diamondPotato.jpg';
import silverPotato from '../../assets/silverPotato.jpg';
import diamondPotato from '../../assets/diamondPotato.jpg';
import platinumPotato from '../../assets/platinumPotato.jpg';
import Deck from '../../components/Deck/Deck';

import windMill from '../../assets/icons/wind-mill.svg';

const NFT = () => {
    const history = useHistory();

    return (
        <Row>
            <Col xs={0} md={4} />
            <Col xs={24} md={6}>
                <div className={gStyles.container}>
                    <div className={gStyles.row}>
                        <img src={windMill} alt="wind-mill" className={styles.icon} />
                        <span className={gStyles.header}>NFT Farm</span>
                    </div>
                    <p className={gStyles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. A minima cupiditate temporibus tempore! Laborum similique sequi corrupti architecto, nesciunt ut, repudiandae dolore illo voluptate numquam iusto placeat ea maxime assumenda?</p>
                    <Button type="ghost" className={gStyles.button} style={{ marginBottom: 20 }} onClick={() => history.push('/nft')}>See more</Button>
                </div>
                
            </Col>
            <Col md={2} >
                
            </Col>
            <Col xs={0} md={8}>
                <Deck />
            </Col>
            <Col xs={0} md={4} />
            
            <Col xs={24} md={0}>
                <div className={gStyles.row} style={{ width: "100%", justifyContent: "center" }}>
                    <img className={styles.card} src={goldPotato} alt="nft" />
                    <img className={styles.card} src={silverPotato} alt="nft" />
                </div>
                <div className={gStyles.row} style={{ width: "100%", justifyContent: "center" }}>
                    <img className={styles.card} src={diamondPotato} alt="nft" />
                    <img className={styles.card} src={platinumPotato} alt="nft" />
                </div>
            </Col>
        </Row>
    )
}

export default NFT;