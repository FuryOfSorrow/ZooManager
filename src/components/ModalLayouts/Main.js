import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal } from './../../redux/actions/appActions';

import { ConsumablePurchaseLayout } from './ConsumablePurchaseLayout/Layout';
import { AnimalPurchaseLayout } from './Animal/PurchaseLayout/Layout';
import { CashLeftBlock } from './CashLeftBlock';
import { CloseBtn } from './../../assets/graphics/ui/CloseBtn';



export const ModalLayouts = () => {
	let content;

	const dispatch = useDispatch();
	const modal = useSelector((state) => state.app.modal);

	const closeModal = () => {
		console.log('Hiding modal...');
		dispatch(hideModal());
	};


	if (modal.show) {
		console.log(modal.type);
		if (modal.type === 'purchase-consumable-category')
			content = (<ConsumablePurchaseLayout />);
		else if (modal.type === 'purchase-animal-category')
			content = (<AnimalPurchaseLayout />);
		else
			content = null;

		return (
			<div className="modal-layouts">
				<CashLeftBlock />
				<CloseBtn onClick={ closeModal } />
				{ content }
			</div>
		)
	} else {
		content = null;
	}


	return (
		<>{ content }</>
	);
};