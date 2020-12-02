import { GAME_INIT, NEXT_MONTH, CONSUMABLE_PURCHASED, ANIMAL_PURCHASED, ANIMAL_UPDATED, ANIMAL_SOLD, CONS_RECALC_INCOME } from './../types';

import { goodMath } from './../../serv/globalFuncs';

import { MeatConsumableCategory } from './consumables/main';
import { PlantsConsumableCategory } from './consumables/main';
import { ExoticsConsumableCategory } from './consumables/main';
import { MedicineConsumableCategory } from './consumables/main';

import { Rabbit } from './animals/Rabbit';
import { Racoon } from './animals/Racoon';


const initialState = {
	month: 0,
	customers: {
		count: 0,
		mood: 0,
		ticketPrice: {
			default: 5,
			current: undefined
		}
	},
	manageCost: 5,
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
		maxAnimals: 3,
		animals: [
			new Rabbit().init()
			//new Racoon()
		],
		consumables: [
			MeatConsumableCategory,
			PlantsConsumableCategory,
			ExoticsConsumableCategory,
			MedicineConsumableCategory
		]
	},
	ownings: {
		animals: []
	}
};



export const gameReducer = (state = initialState, action) => {
	let newConsumables;
	let newAnimalsArr;


	switch (action.type) {
		case GAME_INIT:
			return state;

		case NEXT_MONTH:
			console.log(action.payload.ownings.animals);
			return {
				...state,
				month: action.payload.month,
				customers: action.payload.customers,
				resources: action.payload.resources,
				consumables: action.payload.consumables,
				ownings: {
					animals: action.payload.ownings.animals
				},
				shop: {
					...state.shop,
					animals: action.payload.newAnimalsInShop
				}
			};

		case CONSUMABLE_PURCHASED:
			let consType = action.payload.resource;
			
			let updatedConsData = {
				total: Math.round(state.consumables[`${consType}`].total + action.payload.quantity),
				income: Math.round(state.consumables[`${consType}`].income)
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
						total: goodMath(cashObj.total - action.payload.price, 1),
						income: cashObj.income
					}
				}
			};

		case ANIMAL_PURCHASED:
			let newOwnings = {
				animals: [
					...state.ownings.animals,
					action.payload.newAnimal
				]
			};

			return {
				...state,
				resources: {
					...state.resources,
					cash: {
						...state.resources.cash,
						total: goodMath(state.resources.cash.total - action.payload.cost, 0)
					}
				},
				ownings: newOwnings,
				shop: {
					...state.shop,
					animals: action.payload.newAnimalsArrayInShop
				}
			};

		case ANIMAL_UPDATED:
			newAnimalsArr = removeItem(state.ownings.animals, action.payload);
			newAnimalsArr = insertItem(newAnimalsArr, action.payload);

			return {
				...state,
				version: state.version + 1,
				ownings: {
					animals: newAnimalsArr
				}
			};

		case ANIMAL_SOLD:
			newAnimalsArr = state.ownings.animals.filter(el => el.id !== action.payload.id);

			return {
				...state,
				resources: {
					...state.resources,
					cash: {
						...state.resources.cash,
						total: goodMath(state.resources.cash.total + action.payload.cost, 0)
					}
				},
				ownings: {
					animals: newAnimalsArr
				}
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


function insertItem(array, action) {
	return [
		...array.slice(0, action.index),
		action.item,
		...array.slice(action.index)
	];
}

function removeItem(array, action) {
	return [...array.slice(0, action.index), ...array.slice(action.index + 1)];
}