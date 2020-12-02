import { animal } from './_main';



export function Racoon() {
	this.idTemplate = 'racoon-obj'; //<=================================should be changed on purchased unit
	this.type = 'Racoon';
	this.deathChance = {
		default: undefined,
		current: undefined
	};
	this.size = {
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
	};
	this.price = {
		default: 120,
		current: undefined
	};
	this.hp = {
		max: 20,
		current: undefined
	};
	this.mood = {
		influence: 35,
		current: undefined
	};
	this.age = {
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
	};
	this.pregnancy = {
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
	};
	this.customers = {
		min: 3,
		max: 6,
		current: undefined
	};
	this.available = true;
	this.img = '/graphics/animals/racoon.png';
	this.ration = [
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
	];
}


Racoon.prototype = animal;
//Object.setPrototypeOf(Racoon, animal);