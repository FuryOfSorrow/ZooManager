import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { switchModeTo } from './../../../redux/actions/appActions';



export const ModesLayout = () => {
	const activeMode = useSelector((state) => state.app.mode);

	const dispatch = useDispatch();
	const btnsContainer = useRef(null);

	const setModeType = (type) => {
		let allBtns = btnsContainer.current.children;
		for (let i = 0; i < allBtns.length; i++) {
			allBtns[i].classList.remove('active');

			if (allBtns[i].classList.contains(`btn--${type}`))
				allBtns[i].classList.add('active');
		}
	};

	useEffect(() => {
		setModeType(activeMode);
	}, [activeMode]);


	return (
		<div className="modes-layout">
			<div ref={ btnsContainer } className="middle-container">
				<button className="btn btn--animals" onClick={() => {dispatch(switchModeTo('animals'))}}>Animals</button>
				<button className="btn btn--consumables" onClick={() => {dispatch(switchModeTo('consumables'))}}>Consumables</button>
			</div>
		</div>
	);
};