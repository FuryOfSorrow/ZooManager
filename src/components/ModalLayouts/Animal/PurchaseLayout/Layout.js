import React from 'react';
import { useSelector } from 'react-redux';

import { CardElement } from './CardElement';



export const AnimalPurchaseLayout = () => {
	const activeContent = useSelector(state => state.app.modal.content);

	return (
		<div className="animal-purchase-layout">
			<CardElement elem={ activeContent } />
		</div>
	);
};