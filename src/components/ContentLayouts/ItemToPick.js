import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from './../../redux/actions/appActions';



export const ItemToPick = ({ elem, array, act }) => {
	let dispatch = useDispatch();
	let el = elem;

	let itemRef = useRef(null);


	useEffect(() => {
		let item = itemRef.current;


		item.addEventListener('mouseenter', function(e) {
			this.classList.add('hovered');
		});
		item.addEventListener('mouseleave', function(e) {
			this.classList.remove('hovered');
			this.classList.remove('active');
		});
		item.addEventListener('mousedown', function(e) {
			this.classList.add('active');
		});
		item.addEventListener('mouseup', function(e) {
			this.classList.remove('active');
		});
		item.addEventListener('click', function(e) {
			let itemToPick = this;

			let contentObj = array.find((el) => {
				if (el.id === itemToPick.dataset.id)
					return el;
			});

			dispatch(showModal(this.dataset.action, contentObj));
		});
	}, []);


	return (
		<div ref={ itemRef } className="elem" data-action={ act } data-id={ el.id }>
			<div className="img-container">
				<div className="img" style={{ backgroundImage: `url(${el.img})` }}></div>
			</div>
			<div className="fader-container">
				<div className="title-fader">{ el.type }</div>
				<div className="tip-fader">Click for more info</div>
			</div>
		</div>
	);
};