import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import StakePlan from './pages/StakePlan/StakePlan';
import NFT from './pages/NFT/NFT';
import NFTSelect from './pages/NFTSelect/NFTSelect';

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
			<Header scrollTo={scrollTo}/>
			<Switch>
				<Route exact path="/" render={() => <Main scrollTo={scrollTo} setParallax={setParallax} />} />
				<Route exact path="/stake/:tier" component={StakePlan} />
				<Route exact path="/nft/:tier" component={NFT} />
				<Route exact path="/nft/" component={NFTSelect} />
			</Switch>
		</Router>
	);
}

export default App;
