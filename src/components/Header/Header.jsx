import React from 'react';
import gStyles from '../../styles.module.css';
import styles from './Header.module.css';
import clsx from 'clsx';

import Cow from '../../contracts/cow';
import Erc20 from '../../contracts/erc20';
import { Button, Row, Col, Menu, Dropdown } from 'antd';
import { MenuOutlined, WalletOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import potato from '../../assets/icons/potato.svg';

const Header = ({scrollTo}) => {
    const [wallet, setWallet] = React.useState();

    const history = useHistory();
    const ethereum = window.ethereum;

    const onConnectWallet = async () => {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
    }

    const checkAccounts = async () => {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        setWallet(accounts[0]);
        if(accounts[0]) localStorage.setItem('wallet', accounts[0]);
    }

    const navigateTo = (section) => {
        if(history.location.pathname === '/'){
            scrollTo(section);
        } else {
            history.push('/#' + section);
        }
    }
    
    React.useEffect(() => {
        checkAccounts();
    }, [wallet])

    const menu = (
        <Menu>
            <Menu.Item>
                <span className={gStyles.headerButton} onClick={() => navigateTo(0)}>Home</span>
            </Menu.Item>
            <Menu.Item>
                <span className={gStyles.headerButton} onClick={() => navigateTo(1)}>NFT</span>
            </Menu.Item>
            <Menu.Item>
                <span className={gStyles.headerButton} onClick={() => navigateTo(2)}>Farming</span>
            </Menu.Item>
            <Menu.Item>
                <span className={gStyles.headerButton} onClick={() => navigateTo(3)}>BATTLE</span>
            </Menu.Item>
        </Menu>
      );

    return (
        <Row className={styles.container}>
            <Col xs={0} md={24}>
                <Row>
                    <a href="/" style={{ display: "flex", alignItems: "center" }}>
                        <img src={potato} className={styles.brandLogo} alt="brand" />
                        <span className={styles.brand}>POTATO</span>
                    </a>
                    <div className={clsx(gStyles.row, styles.buttons)}>
                        <Button type="text" className={gStyles.headerButton} onClick={() => navigateTo(0)}>Home</Button>
                        <Button type="text" className={gStyles.headerButton} href="/nft">NFT</Button>
                        <Button type="text" className={gStyles.headerButton} onClick={() => navigateTo(1)}>Farming</Button>
                        <Button type="text" className={gStyles.headerButton} href="/game" >BATTLE</Button>
                    </div>
                    {wallet? <span className={styles.wallet}><WalletOutlined /> ...{wallet.slice(wallet.length-10, wallet.length)}</span> : <Button type="ghost" className={styles.connectBtn} onClick={onConnectWallet}>Connect Metamask</Button>}
                </Row>
            </Col>
            <Col xs={24} md={0}>
                <a href="/">
                    <img src={potato} className={styles.brandLogo} alt="brand" />
                    <span className={styles.brand}>POTATO</span>
                </a>
                <Dropdown className={styles.menuIcon} overlay={menu}>
                    <MenuOutlined />
                </Dropdown>
            </Col>
        </Row>
    )
}

export default Header;