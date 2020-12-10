import React from 'react';
import styles from './StakePlan.module.css';
import gStyles from '../../styles.module.css';
import { useSpring, animated } from 'react-spring'

import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

import StakeCard from '../../components/StakeCard/StakeCard';

import earth from '../../assets/icons/earth.svg';
import mars from '../../assets/icons/mars.svg';
import saturn from '../../assets/icons/saturn.svg';
import rocket_planet from '../../assets/icons/rocket-planet.svg';

const StakePlan = () => {

    let history = useHistory();

    return (
        <div className={gStyles.container}>
            <span className={gStyles.header}>Stake Plan</span>
            <div className={styles.cards}>
                <StakeCard image={earth} tierName="LOW" tokenName={<strong>USDT</strong>} duration={<span><strong>1</strong> week</span>} percent={2} />
                <StakeCard image={mars} tierName="MEDIUM" tokenName={<strong>BUSD</strong>} duration={<span><strong>1</strong> month</span>} percent={5} />
                <StakeCard image={saturn} tierName="HIGH" tokenName={<strong>BNB</strong>} duration={<span><strong>1</strong> year</span>} percent={10} />
                <StakeCard hot image={rocket_planet} tierName="ULTIMATE" tokenName={<strong>BNB-POTATO LP</strong>} duration={<span><strong>3</strong> years</span>} percent={17} />
            </div>
        </div>
    )
}

export default StakePlan;