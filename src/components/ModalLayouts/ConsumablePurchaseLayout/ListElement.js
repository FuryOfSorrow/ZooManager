import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { consumablePurchased } from './../../../redux/actions/gameActions';

import { BuyBtn } from './../../../assets/graphics/ui/BuyBtn';
import { CashImgComponent } from './../../../assets/graphics/resources/Cash';



export const ListElement = ({ elem, image }) => {
	const dispatch = useDispatch();
	const currentCash = useSelector(state => state.game.resources.cash.total);

	const listEl = useRef(null);
	const buyBtnEl = useRef(null);

	useEffect(() => {
		let element = listEl.current;

		const sleep = (ms) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, ms);
			});
		};

		element.transitioning = {
			state: false,
			timings: {
				f0t1: 500,
				f1t2: 600,
				f2t3: 400,
				f3t4: 300
			},
			curClassNum: 0
		};

		element.removeStateClasses = function() {
			this.classList.remove('hov-0');
			this.classList.remove('hov-1');
			this.classList.remove('hov-2');
			this.classList.remove('hov-3');
			this.classList.remove('hov-4');
		};

		element.setDynamicClass = function(a) {
			this.classList.remove('trans-from-0-to-1');
			this.classList.remove('trans-from-1-to-0');
			this.classList.remove('trans-from-1-to-2');
			this.classList.remove('trans-from-2-to-1');
			this.classList.remove('trans-from-2-to-3');
			this.classList.remove('trans-from-3-to-2');
			this.classList.remove('trans-from-3-to-4');
			this.classList.remove('trans-from-4-to-3');

			if (a)
				this.classList.add(a);
		}

		element.classesSetForward = function(a) {
			this.classList.add(`hov-${a}`);
			this.transitioning.curClassNum = a;
			this.manageTransition(this.transitioning.timings[`f${this.transitioning.curClassNum - 1}t${this.transitioning.curClassNum}`]);
		};

		element.classesSetBackward = function(a) {
			this.classList.add(`hov-${a}`);
			this.transitioning.curClassNum = a;
			this.manageTransition(this.transitioning.timings[`f${this.transitioning.curClassNum}t${this.transitioning.curClassNum + 1}`]);
		};

		element.manageTransition = function(delay) {
			if (!this.transitioning.state) {
				this.transitioning.state = true;

				sleep(delay)
					.then((data) => {
						this.transitioning.state = false;

						if (this.classList.contains('hovered')) {
							//направляемся вперед

							if (this.classList.contains('hov-0') || this.classList.contains('trans-from-1-to-0')) {
								this.removeStateClasses();
								this.classesSetForward(1);
								this.setDynamicClass('trans-from-0-to-1');
							} else if (this.classList.contains('trans-from-0-to-1') || this.classList.contains('trans-from-2-to-1')) {
								this.removeStateClasses();
								this.classesSetForward(2);
								this.setDynamicClass('trans-from-1-to-2');
							} else if (this.classList.contains('trans-from-1-to-2') || this.classList.contains('trans-from-3-to-2')) {
								this.removeStateClasses();
								this.classesSetForward(3);
								this.setDynamicClass('trans-from-2-to-3');
							} else if (this.classList.contains('trans-from-2-to-3') || this.classList.contains('trans-from-4-to-3')) {
								this.removeStateClasses();
								this.classesSetForward(4);
								this.setDynamicClass('trans-from-3-to-4');
							} else if (this.classList.contains('hov-4') || this.classList.contains('trans-from-3-to-4')) {
								this.removeStateClasses();
								this.classList.add('hov-4');
								this.setDynamicClass();
							}
						} else {
							//направляемся назад

							if (this.classList.contains('hov-0') || this.classList.contains('trans-from-1-to-0')) {
								this.removeStateClasses();
								this.classList.add('hov-0');
								this.setDynamicClass();
							} else if (this.classList.contains('trans-from-0-to-1') || this.classList.contains('trans-from-2-to-1')) {
								this.removeStateClasses();
								this.classesSetBackward(0);
								this.setDynamicClass('trans-from-1-to-0');
							} else if (this.classList.contains('trans-from-1-to-2') || this.classList.contains('trans-from-3-to-2')) {
								this.removeStateClasses();
								this.classesSetBackward(1);
								this.setDynamicClass('trans-from-2-to-1');
							} else if (this.classList.contains('trans-from-2-to-3') || this.classList.contains('trans-from-4-to-3')) {
								this.removeStateClasses();
								this.classesSetBackward(2);
								this.setDynamicClass('trans-from-3-to-2');
							} else if (this.classList.contains('hov-4') || this.classList.contains('trans-from-3-to-4')) {
								this.removeStateClasses();
								this.classesSetBackward(3);
								this.setDynamicClass('trans-from-4-to-3');
							}
						}
					});
			}
		};


		element.addEventListener('mouseenter', function() {
			this.classList.add('hovered');

			this.manageTransition(0);
		});
		element.addEventListener('mouseleave', function() {
			this.classList.remove('hovered');

			this.manageTransition(0);
		});
	}, []);

	useEffect(() => {
		let el = buyBtnEl.current;

		if (currentCash < elem.price)
			el.classList.add('disabled');
	}, [currentCash]);


	const buyConsumable = (e) => {
		let el = buyBtnEl.current;

		if (el.classList.contains('disabled'))
			return;

		dispatch(consumablePurchased(elem));
	};


	return (
		<li ref={ listEl } className="elem hov-0">
			<div className="img-block" style={{ backgroundImage: `url(${image})` }}></div>
			<div className="description-block">
				<div className="title">Buy { elem.title }</div>
				<div className="caption">{ elem.tooltip }</div>
				<div className="offer-block">
					<div className="inner-container">
						<div className="price-block">Price: { elem.price }</div>
						<div className="cash-container">
							<CashImgComponent />
						</div>
						<button ref={ buyBtnEl } className="buy-btn" onClick={ buyConsumable }>
							<BuyBtn />
						</button>
					</div>
				</div>
			</div>
		</li>
	);
};