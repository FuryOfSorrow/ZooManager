import React from 'react';
import { useSelector } from 'react-redux';

import { ItemToPick } from './../ItemToPick';



export const OwnershipLayout = () => {
	const ownershipArr = useSelector(state => state.game.ownings.animals);

	let act = 'manage-owned-animal';


	return (
		<div className="ownership-layout">
			<div className="title-container">
				<div className="inner">
					<span className="static">You own</span>
				</div>
			</div>
			<div className="content">
				<div className="inner-container-big">
					<div className="inner-container-small">
						{
							ownershipArr.map((el, i, arr) => {
								return (
									<ItemToPick elem={ el } array={ arr } act={ act } key={ el.id.toString() } />
								);
							})
						}
					</div>
				</div>
			</div>
		</div>
	);
};