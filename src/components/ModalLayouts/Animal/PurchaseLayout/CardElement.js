import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { animalPurchased, recalcConsumablesIncome } from './../../../../redux/actions/gameActions';
import { hideModal } from './../../../../redux/actions/appActions';

import { RationsBlock } from './../RationsBlock';

import { BuyBtn } from './../../../../assets/graphics/ui/BuyBtn';
import { CashImgComponent } from './../../../../assets/graphics/resources/Cash';



export const CardElement = ({ elem }) => {
	const dispatch = useDispatch();
	const currentCash = useSelector(state => state.game.resources.cash.total);

	let buyBtnEl = useRef(null);

	useEffect(() => {
		console.log(currentCash);
		console.log(elem.price.current);

		if (currentCash < elem.price.current) {
			buyBtnEl.current.classList.add('disabled');
			console.log('тебе не хватает ', elem.price.current - currentCash);
		}
	}, []);

	const buyAnimal = (el) => {
		if (buyBtnEl.current.classList.contains('disabled'))
			return;

		dispatch(animalPurchased(el));
		dispatch(recalcConsumablesIncome());
		dispatch(hideModal());
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
					<button ref={ buyBtnEl } className='buy-btn' onClick={ () => { buyAnimal(elem) } }>
						<BuyBtn />
					</button>
				</div>
			</div>
		</div>
	);
};