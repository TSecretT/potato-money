import React from 'react';
import styles from './StakePlan.module.css';
import gStyles from '../../styles.module.css';
import { useSpring, animated } from 'react-spring'

import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

import StakeCard from '../../components/StakeCard/StakeCard';

import potato_field from '../../assets/icons/farmland.png'
import potato_greenhouse from '../../assets/icons/greenhouse.png'
import potato_spaceport from '../../assets/icons/farm.png'
import potato_planetstation from '../../assets/icons/potato-mars.png'

const StakePlan = () => {
    let history = useHistory();

    return (
        <div className={gStyles.container}>
            <span className={gStyles.header}>Stake Plan</span>
            <div className={styles.cards}>
                <StakeCard image={potato_field} tierName="POTATO FIELD" tokenName={<strong>USDT</strong>} duration={<span><strong>1</strong> week</span>} percent={2} />
                <StakeCard image={potato_greenhouse} tierName="POTATO GREENHOUSE" tokenName={<strong>BUSD</strong>} duration={<span><strong>1</strong> month</span>} percent={5} />
                <StakeCard image={potato_spaceport} tierName="POTATO SPACEPORT" tokenName={<strong>BNB</strong>} duration={<span><strong>1</strong> year</span>} percent={10} />
                <StakeCard hot image={potato_planetstation} tierName="POTATO PLANET STATION" tokenName={<strong>BNB-POTATO LP</strong>} duration={<span><strong>3</strong> years</span>} percent={17} />
            </div>
        </div>
    )
}

export default StakePlan;