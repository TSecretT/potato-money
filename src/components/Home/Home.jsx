import React from 'react';
import styles from './Home.module.css';
import gStyles from '../../styles.module.css';

import { Col, Row, Button } from 'antd';

import uranus from '../../assets/icons/uranus.svg';
import rocket from '../../assets/icons/rocket-launch.svg';

const Home = () => {

    return(
        <Row style={{ marginTop: 50 }}>
            <Col xs={0} md={3} />
            <Col xs={24} md={8}>
                <div className={styles.container} style={{ justifyContent: "center", height: "100%" }}>
                    <span className={styles.title}>POTATO MONEY</span>
                    <span className={styles.subTitle}>Farm NFTs and win BATTLES</span>
                    <div>
                        <p className={styles.p}><strong>POTATO</strong> – first experimental non-fungible tokens that mashing up Gaming NFT world innovated in DeFi and crypto.</p>
                        <p className={styles.p}>Enjoy your <strong>POTATO</strong> with FRIE and win more in first Gaming NFT Battle in DeFI world</p>
                    </div>
                </div>
            </Col>
            <Col xs={0} md={1} />
            <Col xs={0} md={9}>
                <div className={styles.container} style={{ alignItems: "center" }}>
                    <img className={styles.uranus} src={uranus} alt="uranus" />
                    <Button onClick={() => {}} className={styles.button} type="ghost">
                        <img className={styles.rocket} src={rocket} alt="rocket" />
                        Start Farming
                    </Button>
                </div>
            </Col>
            <Col xs={0} md={3} />
        </Row>
    )
}

export default Home;