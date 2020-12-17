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
    return (
        <Row>
            <Col xs={0} sm={1} xxl={3} />
            <Col xs={24} sm={22} xxl={18} >
                <div className={gStyles.container}>
                    <span className={gStyles.header} style={{ textAlign: "center" }}>Grow you POTATO here!</span>
                    <div className={styles.cards}>
                        <StakeCard image={potato_field} tierName="POTATO FIELD" tokenName="BUSD" duration={<span><strong>1</strong> week</span>} percent={2} />
                        <StakeCard image={potato_greenhouse} tierName="POTATO GREENHOUSE" tokenName="WBNB" duration={<span><strong>1</strong> month</span>} percent={5} />
                        <StakeCard image={potato_spaceport} tierName="POTATO SPACEPORT" tokenName="WBNB-BUSD LP" duration={<span><strong>1</strong> year</span>} percent={10} />
                        <StakeCard hot image={potato_planetstation} tierName="POTATO PLANET STATION" tokenName="POTATO-BNB LP" duration={<span><strong>3</strong> years</span>} percent={17} />
                    </div>
                </div>
            </Col>
            <Col xs={0} sm={1} xxl={3} />
        </Row>
    )
}

export default StakePlan;