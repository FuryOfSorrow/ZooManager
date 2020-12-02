import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CardElement } from './CardElement';



export const ManageOwnedAnimalLayout = () => {
	const activeContent = useSelector(state => state.app.modal.content);


	return (
		<div className="manage-owned-animal-layout">
			<CardElement elemId={ activeContent.id } />
		</div>
	);
};