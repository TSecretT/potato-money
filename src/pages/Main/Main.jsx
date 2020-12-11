import React from 'react';
import styles from './Main.module.css';
import gStyles from '../../styles.module.css';

import { Row, Col, Divider, Button  } from 'antd';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Home from '../../components/Home/Home';
import NFT from '../../components/NFT/NFT';
import StakePlan from '../../components/StakePlan/StakePlan';

import Particles from 'react-particles-js';
import { particlesConfig } from '../../utils/particlesConfig';

import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';



const Main = ({scrollTo, setParallax}) => {
    const history = useHistory();
    
    React.useEffect(() => {
        if(history.location.hash && history.location.hash[0] === '#') scrollTo(history.location.hash[1])
    }, [])

    return (
        <div className={styles.page}>
            <Parallax pages={4} ref={ref => (setParallax(ref))} style={{ overflow: "hidden" }}>

            <ParallaxLayer offset={0} speed={0.5}>
                <Home />
                <Divider style={{ height: 300 }}/>
                <NFT />
                <Divider style={{ height: 300 }}/>
                <StakePlan />
            </ParallaxLayer>

            </Parallax>
            <Particles params={particlesConfig} />
        </div>
    )
}

export default Main;