import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal } from './../../../../redux/actions/appActions';
import { animalSold, recalcConsumablesIncome, renameAnimal } from './../../../../redux/actions/gameActions';

import { RationsBlock } from './../RationsBlock';

import { EditBtn } from './../../../../assets/graphics/ui/EditBtn';
import { BuyBtn } from './../../../../assets/graphics/ui/BuyBtn';
import { CashImgComponent } from './../../../../assets/graphics/resources/Cash';



export const CardElement = ({ elemId }) => {
	const elem = useSelector(state => state.game.ownings.animals.find(el => el.id === elemId));

	const [editNameMode, setEditNameMode] = useState(false);
	const [animalName, setAnimalName] = useState(elem.name);

	const dispatch = useDispatch();
	const inputRef = useRef(null);


	//elem.test();
	let editMode = '';

	if (editNameMode === false)
		editMode = '';
	else if (editNameMode === true)
		editMode = 'editting';


	useEffect(() => {
		if (editNameMode === true)
			inputRef.current.focus();
	}, [editMode]);

	const sellAnimal = (el) => {
		dispatch(hideModal());
		dispatch(animalSold(el));
		dispatch(recalcConsumablesIncome());
	};

	const focusOnInput = () => {
		setEditNameMode(true);
	};

	const focusOut = () => {
		setEditNameMode(false);
		dispatch(renameAnimal(elem, animalName));
	};



	return (
		<div className="card-element">
			<div className="img-container">
				<div className="img-block" style={{ backgroundImage: `url(${elem.img})` }}></div>
				<div className="gradient-block"></div>
			</div>
			<div className={`name-container ${editMode}`}>
				<span className="txt-container">{ animalName }</span>
				<button className="edit-btn" onClick={ focusOnInput }>
					<EditBtn />
				</button>
				<input
					ref={ inputRef } className="input-container" type="text" value={ animalName }
					onChange={(e) => { setAnimalName(e.target.value) }}
					onBlur={focusOut}
				/>
			</div>
			<div className="data-container">
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
					<span className="val">{ elem.size.current.str }</span>
				</div>
				<div className="customers info-line">
					<span className="type">Attracts customers:</span>
					<span className="val">{ elem.customers.min } - { elem.customers.max } (current: { elem.customers.current })</span>
				</div>
				<div className="mood info-line">
					<span className="type">Animal's mood:</span>
					<span className="val">{ elem.mood.current }</span>
				</div>
				<div className="influence info-line">
					<span className="type">Animal's influence:</span>
					<span className="val">{ elem.mood.influence }</span>
				</div>
				<div className="fertility info-line">
					<span className="type">Fertility:</span>
					<span className="val">{ elem.pregnancy.txt }</span>
				</div>
			</div>
			<div className="status-block">
				<div className="placeholder-block">
					<span>Status effects will be displayed here, as soon as animal gets any</span>
				</div>
			</div>
			<RationsBlock elem={ elem } />
			<div className="actions-block">
				<div className="act-block sell-block">
					<div className="caption-block">
						<span className="caption">Sell this { elem.type } for</span>
						<div className="cost-container">
							<span className="cost">{ elem.price.current }</span>
							<div className="cash-img">
								<CashImgComponent />
							</div>
						</div>
					</div>
					<button className="buy-btn" onClick={ () => { sellAnimal(elem) } }>
						<BuyBtn />
					</button>
				</div>
			</div>
		</div>
	);
};