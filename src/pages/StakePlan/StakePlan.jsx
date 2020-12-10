import React from 'react';
import styles from './StakePlan.module.css';
import gStyles from '../../styles.module.css';
import { useParams } from 'react-router-dom';

import { Row, Col, Button, Modal, InputNumber, Alert, Spin, Result } from 'antd';

import Header from '../../components/Header/Header';
import clsx from 'clsx';

import barn from '../../assets/icons/barn.svg'
import bread from '../../assets/icons/bread.svg'
import seeding from '../../assets/icons/seeding.svg'


import Cow from '../../contracts/cow';
import Erc20 from '../../contracts/erc20';
import { STAKE_LOW } from '../../config';

let contract, stakeToken_erc, yieldToken_erc;

const StakePlan = () => {
    const [modalVisible, setModalVisible] = React.useState(false); // Modal visible
    const [harvestModalVisible, setHarvestModalVisible] = React.useState(false); // Harvest modal visible
    const [exitModalVisible, setExitModalVisible] = React.useState(false); // Exit modal visible
    const [error, setError] = React.useState(); // Error
    const [hash, setHash] = React.useState(); // Hash
    const [successfull, setSuccessfull] = React.useState();
    const [processing, setProcessing] = React.useState(false); // is staking process;
    
    const [balance, setBalance] = React.useState("--"); // my balance of tokens
    const [toStake, setToStake] = React.useState(); // amount of tokens to stake
    const [staked, setStaked] = React.useState("--"); // amount of tokens I staked
    const [totalStaked, setTotalStaked] = React.useState("--"); // total amount of tokens staked in contract
    const [rewards, setRewards] = React.useState("--"); // my rewards
    const [canRedeem, setCanRedeem] = React.useState(); // If user can redeem tokens
    

    let { tier } = useParams();
    const wallet = localStorage.wallet;
    
    const onStake = async () => {
        clear();
        setProcessing(true);
        contract.stake(wallet, parseInt(toStake), (err, txHash) => {
            if(txHash) setHash(txHash);
        })
        .then((receipt, b) => {
            setSuccessfull(true);
            update();
            setProcessing(false);
        }).catch(error => {
            console.log(error)
            setSuccessfull(false);
            setError("Unknown Error")
        });
    }

    const onUnstake = async () => {
        clear();
        setProcessing(true);
        let amount = parseFloat(this.unstakeAmount);
        if(amount <= 0) return;
        contract.withdraw(this.$store.state.connectedAccount, amount, (err, txHash) => {
            if(txHash) setHash(txHash)
        }).then(receipt => {
            console.log(receipt)
            setSuccessfull(true);
            setProcessing(false);
        }).catch(err => {
            setSuccessfull(false);
            setError(err)
        })
    }

    const onExit = async () => {
        clear();
        setProcessing(true);
        contract.exit(wallet, (err, txHash) => {
            if(txHash) setHash(txHash)
        }).then(receipt => {
            console.log(receipt)
            setSuccessfull(true);
            setProcessing(false);
        }).catch(err => {
            setSuccessfull(false);
            setError(err)
        })
    }

    const onHarvest = () => {
        clear();
        setProcessing(true);
        contract.getReward(wallet, (err, txHash) => {
            if(txHash) setHash(txHash)
        }).then(receipt => {
            console.log(receipt)
            setSuccessfull(true);
            setProcessing(false);
            update();
        }).catch(err => {
            setSuccessfull(false);
            setError(err)
        })
    }

    const clear = () => {
        setHash();
        setError();
        setSuccessfull();
        setProcessing(false);
    }

    const init = async () => {
        // Init objects
        contract = new Cow(STAKE_LOW.address, STAKE_LOW.stakeToken, STAKE_LOW.yieldToken);
        stakeToken_erc = new Erc20(STAKE_LOW.stakeToken.address);
        yieldToken_erc = new Erc20(STAKE_LOW.yieldToken.address);

        // Get balance
        update();
        setInterval(update, 10000);
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

    React.useEffect(() => {
        init();
    }, [])

    return (
        <div className={gStyles.page}>
            <Modal
                title={null}
                bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#232323",
                    border: "1px solid white",
                    borderRadius: 8
                }}
                wrapClassName={styles.background}
                visible={modalVisible || harvestModalVisible || exitModalVisible}
                onCancel={() => { clear(); setModalVisible(false); setHarvestModalVisible(false); setExitModalVisible(false); }}
                footer={null}
            >
                <div className={gStyles.col}>
                    {processing? (
                        <>
                            {hash? <Alert className={styles.alert} message={hash} type={successfull? "success" : "info"} /> : null}
                            {error? <Alert className={styles.alert} message={error} type="error" /> : null}
                            {processing? <Spin /> : null}
                        </>
                    ) : successfull? (
                        <Result
                            status="success"
                            title={<p>{modalVisible? `Staked ${toStake} tokens` : harvestModalVisible? "Harvested" : exitModalVisible? "Harvest and Exit complete" : ""}</p>}
                            subTitle={<p>{`Hash number ${hash}`}</p>}
                        />
                    ) : (
                        <>  
                            <p>{modalVisible? "💸 Stake your tokens 💸" : harvestModalVisible? `Do you want to harvest ${rewards} tokens?` : exitModalVisible? "Do you want to harvest and exit?" : ""}</p>
                            {modalVisible? <p>{`Your balance: ${balance}`}</p> : null}
                            {modalVisible? <InputNumber className={styles.input} onChange={number => { setToStake(number) }} /> : null}
                        </>
                    )}

                    <div className={gStyles.row}>
                        <Button className={clsx(gStyles.button, styles.modalButton)} type="ghost" onClick={() => {
                            clear();
                            setModalVisible(false);
                            setHarvestModalVisible(false);
                            setExitModalVisible(false);
                        }}>Cancel</Button>
                        <Button className={clsx(gStyles.button, styles.modalButton)} type="ghost" disabled={hash || successfull} onClick={() => {
                            if(modalVisible) onStake();
                            if(harvestModalVisible) onHarvest();
                            if(exitModalVisible) onExit();
                        }}>OK</Button>
                    </div>
                </div>
            </Modal>

            <div className={gStyles.col}>
                <img src={barn} alt="icon" className={styles.barn} />
                <span className={styles.tier}>{tier.toUpperCase()}</span>
                <span className={styles.underTier}>staking</span>
                <span className={styles.text} style={{ margin: "50px 0" }}>Total <strong>{totalStaked}</strong> minted</span>
            </div>

            <div className={clsx(gStyles.row, styles.blocks)}>
                <div className={styles.block}>
                    <p className={styles.text}><strong>{rewards}</strong></p>
                    <p className={styles.text}>earned</p>
                    <Button style={{ position: "absolute", bottom: 15 }} className={gStyles.button} type="ghost" onClick={() => { setHarvestModalVisible(true) }}>Harvest <img src={bread} alt="bread" className={styles.buttonIcon} /></Button>
                </div>
                <div className={styles.block}>
                    <p className={styles.text}><strong>{staked}</strong></p>
                    <p className={styles.text}>staked</p>
                    <Button style={{ position: "absolute", bottom: 15 }} className={gStyles.button} type="ghost" onClick={() => { setModalVisible(true) }}>Stake <img src={seeding} alt="seeding" className={styles.buttonIcon} /></Button>
                </div>
            </div>
            
            <Button className={gStyles.button} type="ghost" onClick={() => { setExitModalVisible(true) }}>{"Harvest & Exit"}</Button>
        </div>
    )
}

export default StakePlan;