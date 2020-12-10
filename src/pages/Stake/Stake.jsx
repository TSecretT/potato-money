import React from 'react';
import styles from './Stake.module.css';

import { Col, Row, Button, Card, Modal, Input, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';

import Cow from '../../contracts/cow';
import Erc20 from '../../contracts/erc20';
import { stakeToken, yieldToken } from '../../contracts/constants';

import Header from '../../components/Header/Header';
import clsx from 'clsx';



const Stake = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [balance, setBalance] = React.useState("--"); // my balance of tokens
    const [toStake, setToStake] = React.useState(); // amount of tokens to stake
    const [staked, setStaked] = React.useState("--"); // amount of tokens I staked
    const [totalStaked, setTotalStaked] = React.useState("--"); // total amount of tokens staked in contract
    const [rewards, setRewards] = React.useState("--"); // my rewards
    const [staking, setStaking] = React.useState(false); // is staking process;
    const [exiting, setExiting] = React.useState(false); // is exiting process;

    let contract, stakeToken_erc, yieldToken_erc;

    const wallet = localStorage.wallet;
    const { year } = useParams();

    const init = async () => {
        // Init objects
        contract = new Cow(contractAdress, stakeToken, yieldToken);
        stakeToken_erc = new Erc20(stakeToken.address);
        yieldToken_erc = new Erc20(yieldToken.address);

        // Get balance
        try{
            setTotalStaked(await contract.totalSupply());
            setRewards(await contract.earned(wallet))
            setStaked(await contract.balanceOf(wallet))
            setBalance(await stakeToken_erc.balanceOf(wallet))
        } catch(error){
            console.log("Get Balance module error:", error)
        }
        setInterval(update(), 5000);
    }

    const update = async () => {
        try{
            setTotalStaked(await contract.totalSupply());
            setRewards(await contract.earned(wallet))
            setStaked(await contract.balanceOf(wallet))
            setBalance(await stakeToken_erc.balanceOf(wallet))
        } catch(error){
            console.log("Get Balance module error:", error)
        }
    }


    const onStake = async () => {
        setStaking(true);
        contract.stake(wallet, parseInt(toStake), (err, txHash) => {
            if(txHash) {
              console.log("txHash", txHash)
            }
          }).then((receipt, b) => {
            console.log("Receipt", receipt)
            console.log("b", b)
            
            update();
            setStaking(false);
            setModalVisible(false);

          }).catch(error => {
            console.log(error)
          });
    }

    const onHarvest = async () => {

    }

    const onExit = async () => {
        setExiting(true);
        contract.exit(wallet, (err, txHash) => {
            if(txHash) {
            }
            }).then(receipt => {
                setExiting(false);
                update();
            }).catch(err => {
                setExiting(false);
                message.error("Error. Please try again later")
                console.log("Exit module error:", err)
            })
    }

    React.useEffect(() => {
        init();
    },[])

    return (
        <div>
        <Modal
            title="Stake"
            visible={modalVisible}
            onOk={onStake}
            onCancel={() => setModalVisible(false)}
        >
            <div className={styles.modalContainer}>
                {staking? (
                    <>
                        <Spin size="large" />
                        <span className={styles.stakingText}>Staking ...</span>
                    </>
                ) : (
                    <>
                        <span>Your token balance <strong>{balance}</strong></span>
                        <Input palaceholder="Stake Amount" onChange={e => setToStake(e.target.value)} />
                    </>
                )}
            </div>
        </Modal>
        <Row>
            <Col span={7} />
            <Col span={10}>
                <div className={styles.container}>
                    <span className={styles.text}>{year} YEAR STAKING</span>
                    <span className={styles.stakeDesc}>CSNP APY 17%</span>
                    <span className={styles.text} style={{ margin: "20px 0px" }}>Total <strong>{totalStaked}</strong> CSNP is staking</span>
                    <div className={styles.row}>
                        <div className={styles.card}>
                            <span className={styles.stakeEarned}>{rewards}</span>
                            <span className={styles.text}>earned</span>
                            <Button disabled={staked === 0} className={clsx(styles.button, styles.btnHarvest)} onClick={onHarvest}>Harvest</Button>
                        </div>

                        <div className={styles.card}>
                            <span className={styles.stakeEarned}>{staked}</span>
                            <span className={styles.text}>CSNP staked</span>
                            <Button type="primary" className={clsx(styles.button, styles.btnStake)} onClick={() => setModalVisible(true)}>Stake</Button>
                        </div>
                    </div>
                    <Button loading={exiting} disabled={staked === 0} type="primary" className={clsx(styles.button, styles.exitBtn)} onClick={onExit}>{"Harvest && Exit"}</Button>
                </div>
            </Col>
            <Col span={7} />
        </Row>
        <div className={styles.exit}>
            
        </div>
        </div>
    )
}

export default Stake;