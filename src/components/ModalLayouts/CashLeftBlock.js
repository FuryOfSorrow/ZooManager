import React from 'react';
import { useSelector } from 'react-redux';

import { CashImgComponent } from './../../assets/graphics/resources/Cash';



export const CashLeftBlock = () => {
	const currentCash = useSelector(state => state.game.resources.cash.total);


	return (
		<div className="cash-left-block">
			<div className="static">You have { currentCash }</div>
			<CashImgComponent style={{width: '42px', height: '42px'}} />
		</div>
	);
};