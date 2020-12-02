import { NEW_ANIMAL_TYPE_UNLOCKED } from './../types';

import { Rabbit } from './animals/Rabbit';
import { Racoon } from './animals/Racoon';



const initialState = {
	animals: [
		{
			id: 'rabbit-obj',
			type: Rabbit,
			unlocked: true
		},
		{
			id: 'racoon-obj',
			type: Racoon,
			unlocked: true
		}
	]
};


export const unlockablesReducer = (state = initialState, action) => {
	let newArr;

	switch (action.type) {
		case NEW_ANIMAL_TYPE_UNLOCKED:
			newArr = state.animals.map((el) => {
				if (el.id === action.payload.id)
					el.unlocked = true;

				return el;
			});

			return {
				...state,
				animals: newArr
			};

		default:
			return state;
	}
};