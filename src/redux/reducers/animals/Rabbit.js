import { animal } from './_main';



export function Rabbit() {
	this.idTemplate = 'rabbit-obj';
	this.type = 'Rabbit';
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
		default: 80,
		current: undefined
	};
	this.hp = {
		max: 10,
		current: undefined
	};
	this.mood = {
		influence: 20,
		current: undefined
	};
	this.age = {
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
	};
	this.pregnancy = {
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
	};
	this.customers = {
		min: 1,
		max: 3,
		current: undefined
	};
	this.available = true;
	this.img = '/graphics/animals/rabbit.png';
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
	];
}


Rabbit.prototype = animal;
//Object.setPrototypeOf(Rabbit, animal);