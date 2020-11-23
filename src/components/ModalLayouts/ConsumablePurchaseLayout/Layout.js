import React from 'react';
import { useSelector } from 'react-redux';

import { ListElement } from './ListElement';



export const ConsumablePurchaseLayout = () => {
	const activeConsumableContent = useSelector(state => state.app.modal.content);


	return (
		<div className="consumable-purchase-layout">
			<ul className="purchase-list">
				{
					activeConsumableContent.items.map((el) => {
						if (el.available)
							return (<ListElement key={ el.id } elem={ el } image={ activeConsumableContent.img } />);
					})
				}
			</ul>
		</div>
	);
};