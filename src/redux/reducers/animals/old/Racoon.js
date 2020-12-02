import React from 'react';

import { animal } from './_main';

import { RacoonImgComponent } from './../../../assets/graphics/animals/Racoon';



export const Racoon = {
	id: 'racoon-obj', //<=================================should be changed on purchased unit
	type: 'Racoon',
	name: undefined,
	gender: undefined,
	size: {
		current: {
			num: undefined,
			str: undefined
		},
		cub: {
			num: 1,
			str: undefined
		},
		young: {
			num: 4,
			str: undefined
		},
		adult: {
			num: 4,
			str: undefined
		},
		old: {
			num: 4,
			str: undefined
		}
	},
	price: {
		default: 120,
		current: undefined
	},
	hp: {
		max: 20,
		current: undefined
	},
	mood: {
		influence: 35,
		current: undefined
	},
	age: {
		lifespanExpectancy: {
			min: undefined,
			max: undefined
		},
		status: {
			cub: 6,
			young: 12,
			adult: 60,
			old: 204
		},
		current: undefined,
		currentStr: undefined
	},
	pregnancy: {
		txt: 'High',
		possible: undefined,
		timings: {
			duration: 2,
			cooldown: 12,
			left: 2
		},
		cubs: {
			min: 3,
			max: 6
		},
		amount: {
			min: 2,
			max: 5,
			left: undefined
		}
	},
	customers: {
		min: 3,
		max: 6,
		current: undefined
	},
	available: true,
	img: '/graphics/animals/racoon.png',
	ration: [
		{
			id: 'none',
			active: false,
			consumes: {
				meat: 0,
				plant: 0,
				exotic: 0,
				medicine: 0
			},
			mood: -8,
			hp: -7
		},
		{
			id: 'poor',
			active: false,
			consumes: {
				meat: 1,
				plant: 1,
				exotic: 0,
				medicine: 0
			},
			mood: -5,
			hp: -4
		},
		{
			id: 'normal',
			active: false,
			consumes: {
				meat: 2,
				plant: 2,
				exotic: 0,
				medicine: 0
			},
			mood: 0,
			hp: 0
		},
		{
			id: 'fine',
			active: false,
			consumes: {
				meat: 2,
				plant: 6,
				exotic: 0,
				medicine: 0
			},
			mood: 2,
			hp: 0
		},
		{
			id: 'awesome',
			active: false,
			consumes: {
				meat: 3,
				plant: 5,
				exotic: 0,
				medicine: 0
			},
			mood: 3,
			hp: 1
		}
	]
};


Object.setPrototypeOf(Racoon, animal);