import { GAME_INIT, NEXT_MONTH, CONSUMABLE_PURCHASED, ANIMAL_PURCHASED, CONS_RECALC_INCOME } from './../types';

import { MeatConsumableCategory } from './consumables/main';
import { PlantsConsumableCategory } from './consumables/main';
import { ExoticsConsumableCategory } from './consumables/main';
import { MedicineConsumableCategory } from './consumables/main';

import { Rabbit } from './animals/Rabbit';
import { Racoon } from './animals/Racoon';


const initialState = {
	activeSellings: {
		animals: [],
		staff: [],
		consumables: [],
		upgrades: []
	},
	month: 0,
	customers: {
		count: 0,
		mood: 0
	},
	resources: {
		cash: {
			total: 500,
			income: -5
		},
		energy: {
			req: 0,
			prod: 50
		}
	},
	consumables: {
		meat: {
			total: 0,
			income: 0
		},
		plant: {
			total: 0,
			income: 0
		},
		exotic: {
			total: 0,
			income: 0
		},
		medicine: {
			total: 0,
			income: 0
		}
	},
	shop: {
		animals: [
			Rabbit.init(),
			Racoon.init()
		],
		consumables: [
			MeatConsumableCategory,
			PlantsConsumableCategory,
			ExoticsConsumableCategory,
			MedicineConsumableCategory
		]
	},
	ownings: {
		animals: [
		]
	}
};


export const gameReducer = (state = initialState, action) => {
	let newConsumables;


	switch (action.type) {
		case GAME_INIT:
			return state;

		case NEXT_MONTH:
			return {...state, ...action.payload};

		case CONSUMABLE_PURCHASED:
			let consType = action.payload.resource;
			
			let updatedConsData = {
				total: state.consumables[`${consType}`].total + action.payload.quantity,
				income: state.consumables[`${consType}`].income
			};

			newConsumables = {
				...state.consumables,
				[`${consType}`]: updatedConsData
			};

			let cashObj = state.resources.cash;

			return {
				...state,
				consumables: newConsumables,
				resources: {
					...state.resources,
					cash: {
						total: cashObj.total - action.payload.price,
						income: cashObj.income
					}
				}
			};

		case ANIMAL_PURCHASED:
			let newOwnings = {
				animals: [
					...state.ownings.animals,
					action.payload
				]
			};

			return {
				...state,
				ownings: newOwnings
			};

		case CONS_RECALC_INCOME:
			newConsumables = {
				meat: {
					total: state.consumables.meat.total,
					income: action.payload.meat
				},
				plant: {
					total: state.consumables.plant.total,
					income: action.payload.plant
				},
				exotic: {
					total: state.consumables.exotic.total,
					income: action.payload.exotic
				},
				medicine: {
					total: state.consumables.medicine.total,
					income: action.payload.medicine
				}
			};

			return {
				...state,
				consumables: newConsumables
			};

		default:
			return state;
	}
};