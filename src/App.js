import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import StakePlan from './pages/StakePlan/StakePlan';
import NFT from './pages/NFT/NFT';
import NFTSelect from './pages/NFTSelect/NFTSelect';
import Reacteroids from './pages/Game/Reacteroids';

import ReactParticles from 'react-particles-js';
import { particlesConfig } from './utils/particlesConfig';

function App() {

	let parallax;

	const setParallax = (newParallax) => {
		parallax = newParallax;
	}

	const scrollTo = (page) => {
        parallax.scrollTo(page);
    }

	return (
		<Router>
			<ReactParticles params={particlesConfig} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, heigth: 0 }}/>
			<Header scrollTo={scrollTo}/>
			<Switch>
				<Route exact path="/" render={() => <Main scrollTo={scrollTo} setParallax={setParallax} />} />
				<Route exact path="/stake/:tier" component={StakePlan} />
				<Route exact path="/nft/:tier" component={NFT} />
				<Route exact path="/nft/" component={NFTSelect} />
				<Route exact path="/game" component={Reacteroids} />
			</Switch>
		</Router>
	);
}

export default App;
