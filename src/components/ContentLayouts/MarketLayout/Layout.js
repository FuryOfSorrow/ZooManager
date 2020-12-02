import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animal } from '../../../redux/reducers/animals/_main';

import { ItemToPick } from './../ItemToPick';



export const MarketLayout = () => {
	const activeMode = useSelector((state) => state.app.mode);

	const animalsArray = useSelector((state) => state.game.shop.animals);
	const consumablesArray = useSelector((state) => state.game.shop.consumables);

	let displayedArray, act;
	let domArray;


	if (activeMode === 'animals') {
		displayedArray = animalsArray;
		act = 'purchase-animal-category';
	} else if (activeMode === 'consumables') {
		displayedArray = consumablesArray;
		act = 'purchase-consumable-category';
	}

	domArray = (
		<>{
			displayedArray.map((el, i, arr) => {
				console.log(el);
				return (<ItemToPick elem={ el } array={ arr } act={ act } key={ (activeMode + i + el.id).toString() } />);
			})
		}</>
	);


	return (
		<div className="market-layout">
			<div className="items-container">
				<div className="middle-container">
					{ domArray }
				</div>
			</div>
		</div>
	);
};