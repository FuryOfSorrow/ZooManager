import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { animalPurchased, recountConsumablesIncome } from './../../../../redux/actions/gameActions';

import { RationsBlock } from './../RationsBlock';

import { BuyBtn } from './../../../../assets/graphics/ui/BuyBtn';
import { CashImgComponent } from './../../../../assets/graphics/resources/Cash';



export const CardElement = ({ elem }) => {
	const dispatch = useDispatch();

	const buyAnimal = (el) => {
		dispatch(animalPurchased(el));
		dispatch(recountConsumablesIncome());
	};


	return (
		<div className="card-element">
			<div className="upper-block">
				<div className="img-block" style={{ backgroundImage: `url(${elem.img})` }}></div>
				<div className="info-block">
					<div className="title">Buy { elem.type }</div>
					<div className="hp info-line">
						<span className="type">Hit points:</span>
						<span className="val">{ elem.hp.current } / { elem.hp.max }</span>
					</div>
					<div className="gender info-line">
						<span className="type">Gender:</span>
						<span className="val">{ elem.gender }</span>
					</div>
					<div className="age info-line">
						<span className="type">Age:</span>
						<span className="val">{ elem.age.currentStr } ({ elem.age.statusStr })</span>
					</div>
					<div className="lifespan-expectancy info-line">
						<span className="type">Lifespan expectancy:</span>
						<span className="val">{ elem.age.lifespanExpectancy.min } - { elem.age.lifespanExpectancy.max }</span>
					</div>
					<div className="size info-line">
						<span className="type">Animal's size:</span>
						<span className="val">{ elem.size.current.str } (max: { elem.size.adult.str })</span>
					</div>
					<div className="customers info-line">
						<span className="type">Attracts customers:</span>
						<span className="val">{ elem.customers.min } - { elem.customers.max }</span>
					</div>
					<div className="fertility info-line">
						<span className="type">Fertility:</span>
						<span className="val">{ elem.pregnancy.txt }</span>
					</div>
				</div>
			</div>
			<div className="lower-block">
				<RationsBlock elem={ elem } />
				<div className="purchase-block">
					<div className="info-container">
						<span className="caption-block">Price for this animal:</span>
						<div className="cost-container">
							<span className="cost">{ elem.price.current }</span>
							<div className="cash-img">
								<CashImgComponent />
							</div>
						</div>
					</div>
					<button className="buy-btn" onClick={ () => { buyAnimal(elem) } }>
						<BuyBtn />
					</button>
				</div>
			</div>
		</div>
	);
};