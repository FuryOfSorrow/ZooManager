import React from 'react';

import { animal } from './_main';

import { RabbitImgComponent } from './../../../assets/graphics/animals/Rabbit';



export const Rabbit = {
	id: 'rabbit-obj', //<=================================should be changed on purchased unit
	type: 'Rabbit',
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
		default: 80,
		current: undefined
	},
	hp: {
		max: 10,
		current: undefined
	},
	mood: {
		influence: 20,
		current: undefined
	},
	age: {
		lifespanExpectancy: {
			min: undefined,
			max: undefined
		},
		status: {
			cub: 6,
			young: 16,
			adult: 60,
			old: 144
		},
		current: undefined,
		currentStr: undefined
	},
	pregnancy: {
		txt: 'Extreme',
		possible: undefined,
		timings: {
			duration: 2,
			cooldown: 3,
			left: 2
		},
		cubs: {
			min: 1,
			max: 9
		},
		amount: {
			min: 3,
			max: 10,
			left: undefined
		}
	},
	customers: {
		min: 1,
		max: 3,
		current: undefined
	},
	available: true,
	img: '/graphics/animals/rabbit.png',
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
			mood: -5,
			hp: -5
		},
		{
			id: 'poor',
			active: false,
			consumes: {
				meat: 0,
				plant: 1,
				exotic: 0,
				medicine: 0
			},
			mood: -2,
			hp: -4
		},
		{
			id: 'normal',
			active: false,
			consumes: {
				meat: 0,
				plant: 3,
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
				meat: 0,
				plant: 5,
				exotic: 0,
				medicine: 0
			},
			mood: 1,
			hp: 0
		},
		{
			id: 'awesome',
			active: false,
			consumes: {
				meat: 0,
				plant: 8,
				exotic: 0,
				medicine: 0
			},
			mood: 2,
			hp: 1
		}
	]
};


Object.setPrototypeOf(Rabbit, animal);