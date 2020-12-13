import React from 'react'
import styles from './NFT.module.css';
import gStyles from '../../styles.module.css';

import { useHistory } from 'react-router-dom';
import { Col, Row, Button } from 'antd';

import goldPotato from '../../assets/diamondPotato.jpg';
import silverPotato from '../../assets/silverPotato.jpg';
import diamondPotato from '../../assets/diamondPotato.jpg';
import platinumPotato from '../../assets/platinumPotato.jpg';

const NFT = () => {
    const history = useHistory();

    return (
        <Row>
            <Col xs={0} md={3} />
            <Col xs={24} md={5}>
                <div className={gStyles.container} style={{ alignItems: "flex-start" }}>
                    <span className={styles.exclusive}>Exclusive collection</span>
                    <p className={styles.limited}>POTATO Limited Edition</p>
                    <p className={gStyles.text} style={{ textAlign: "initial" }}>Put your POTATO to work and and collect digital content that you can truly own</p>
                    <Button type="ghost" className={gStyles.button} style={{ marginTop: 20 }} onClick={() => history.push('/nft')}>Take your NFTs</Button>
                </div>
            </Col>
            <Col xs={0} md={1} />
            <Col xs={0} md={15}>
                <div className={styles.row} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
                    <img className={styles.cardFull} src={silverPotato} alt="nft" />
                    <img className={styles.cardFull} src={goldPotato} alt="nft" />
                    <img className={styles.cardFull} src={platinumPotato} alt="nft" />
                    <img className={styles.cardFull} src={diamondPotato} alt="nft" />
                </div>
            </Col>
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