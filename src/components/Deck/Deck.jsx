import React, { useState } from 'react'
import styles from './Deck.module.css'

import diamondPotato from '../../assets/diamondPotato.jpg';
import goldPotato from '../../assets/goldPotato.jpg';
import platinumPotato from '../../assets/platinumPotato.jpg';
import silverPotato from '../../assets/silverPotato.jpg';

const cards = [
	goldPotato, silverPotato, platinumPotato, diamondPotato,
]

const tiers = ["gold", "silver", "platinum", "diamond"]

const Deck = () => {
	return(
		<div className={styles.container}>
			{cards.map((card, i) => {
				let angle = i * 10; 
				let shiftX = i * (60);
				let shiftY = 0;
				return (
					<a href={`/nft/${tiers[i]}`}>
						<img className={styles.card} src={card} style={{ transform: `rotateZ(${angle}deg) translate(${shiftX}px, ${shiftY}px)`, left: shiftX }} alt="card" />
					</a>
				)
			})}
		</div>
	)
}

export default Deck;