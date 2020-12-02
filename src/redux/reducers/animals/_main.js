import React from 'react';

import { clone } from './../../../serv/deepClone';



export const animal = {
	id: undefined, //<=================================should be changed on item pushed in shop as well as on purchased unit
	version: 0,
	name: undefined,
	gender: undefined,
	owned: false,


	init: function() {
		this.defineInitAge();
		this.setAgeStatusString();
		this.makeCurrentAgeLookNice();
		this.setInitHp();
		this.setGender();
		this.formCurrentPrice();
		this.setLifespanExpectancyTxt();
		this.initAnimalSizeStrings();
		this.setCurrentAnimalSize();
		this.setInitMood();
		this.setInitCustomers();

		this.updateVersion();


		console.log(this);
		return this;
	},
	defineInitAge: function() {
		let min, max;
		// Роллим, кого мы хотим получить: мелкого, подростка или взрослого
		let roll = Math.floor(Math.random() * (100 - 0) + 0);

		if (roll >= 0 && roll < 12) {
			min = 0;
			max = this.age.status.cub;
		} else if (roll >= 12 && roll < 40) {
			min = this.age.status.cub;
			max = this.age.status.young;
		} else if (roll >= 40 && roll < 100) {
			min = this.age.status.young;
			max = this.age.status.adult;
		} else {
			min = this.age.status.adult;
			max = this.age.status.old;
		}

		this.age.current = (Math.floor(Math.random() * (max - min)) + min);
	},
	setAgeStatusString: function() {
		let lowestAge = 0;
		let highestAge = this.age.status.cub;

		for (let x in this.age.status) {
			if (this.age.status[x] > highestAge)
				highestAge = this.age.status[x];

			// Поскольку используем мягкое сравнение и не делаем return, то возраст будет пересчитываться еще раз если
			// он будет "на стыке" (так 6-месячный кролик уже молодняк, а не мелочь и 12-месячный енот — уже взрослый)
			if (this.age.current <= highestAge && this.age.current >= lowestAge)
				this.age.statusStr = x;

			lowestAge = this.age.status[x];
		}
	},
	makeCurrentAgeLookNice: function() {
		let yearsStr, monthsStr;
		let fullYears = parseInt(this.age.current / 12);
		let fullMonths = this.age.current - fullYears * 12;

		if (fullYears > 0) {
			if (fullYears > 1)
				yearsStr = fullYears + ' years ';
			else
				yearsStr = fullYears + ' year ';
		} else {
			yearsStr = '';
		}

		if (fullMonths > 0) {
			if (fullMonths > 1)
				monthsStr = fullMonths + ' months';
			else
				monthsStr = fullMonths + ' month';
		} else {
			if (yearsStr === '')
				monthsStr = fullMonths + ' months';
			else
				monthsStr = '';
		}


		this.age.currentStr = yearsStr + monthsStr;
	},
	setLifespanExpectancyTxt: function() {
		const formAgeTxt = (age) => {
			let yearsStr, monthsStr;
			let fullYears = parseInt(age / 12);
			let fullMonths = age - fullYears * 12;
	
			if (fullYears > 0) {
				yearsStr = fullYears + 'y ';
			} else {
				yearsStr = '';
			}
	
			if (fullMonths > 0) {
				monthsStr = fullMonths + 'm';
			} else {
				if (yearsStr === '')
					monthsStr = fullMonths + 'm';
				else
					monthsStr = '';
			}
	
			let a = yearsStr + monthsStr;


			return a;
		};


		this.age.lifespanExpectancy.min = formAgeTxt(this.age.status.adult);
		this.age.lifespanExpectancy.max = formAgeTxt(this.age.status.old);
	},
	formCurrentPrice: function() {
		let currentPrice = this.price.default;

		if (this.age.current >= 0 && this.age.current < this.age.status.cub)
			currentPrice = Math.round((currentPrice / 1.3));
		
		if (this.age.current >= this.age.status.young && this.age.current < this.age.status.adult) {
			currentPrice = definePriceFromAgeProportion(
				this.age.status.young,
				this.age.status.adult,
				this.age.current
			);
		} else if (this.age.current >= this.age.status.adult && this.age.current < this.age.status.old) {
			currentPrice = currentPrice / 3;
		}

		if (this.owned)
			this.price.current = Math.round(currentPrice / 3);
		else
			this.price.current = currentPrice;


		function definePriceFromAgeProportion(startingAge, endingAge, currentAge) {
			let maxPrice = currentPrice;
			let minPrice = currentPrice / 3;

			let interval = endingAge - startingAge;
			let priceReductionInterval = Math.round(interval * 0.6);


			if (currentAge > (endingAge - priceReductionInterval) && currentAge <= endingAge) {
				let startPoint = endingAge - priceReductionInterval;
				let unitsFromStart = currentAge - startPoint;

				let priceDiff = maxPrice - minPrice;
				let dPrice = priceDiff / priceReductionInterval;

				currentPrice = Math.round(maxPrice - (dPrice * unitsFromStart));
			}	else {
				currentPrice = maxPrice;
			}


			return currentPrice;
		}
	},
	setInitHp: function() {
		let x = Math.random();

		if (this.age.statusStr === 'cub')
			x = x * 0.3 + 0.1;
		else if (this.age.statusStr === 'young')
			x = x * 0.3 + 0.3;
		else
			x = x * 0.7 + 0.3;


		this.hp.current = Math.round(this.hp.max * x);
	},
	setInitMood: function() {
		this.mood.current = 0;
		let posOrNeg, mood;
		let i = Math.random();

		posOrNeg = Math.random();

		if (i >= 0 && i < 0.7) {
			//от -10 до 10
			mood = Math.random() * 20 - 10; 
		} else if (i >= 0.7 && i < 0.9) {
			//от -15 до -10 или от 10 до 15
			if (posOrNeg >= 0 && posOrNeg < 0.5)
				mood = Math.random() * 5 - 15;
			else
				mood = Math.random() * 5 + 10;
		} else {
			//от -20 до -15 или от 15 до 20
			if (posOrNeg >= 0 && posOrNeg < 0.5)
				mood = Math.random() * 5 - 20;
			else
				mood = Math.random() * 5 + 15;
		}

		this.mood.current = Math.round(mood);
	},
	updateHpAndMood: function() {
		let rationData = this.ration.find((el) => el.active === true);

		this.hp.current = this.hp.current + rationData.hp;
		this.mood.current = this.mood.current + rationData.mood;

		if (this.hp.current > this.hp.max)
			this.hp.current = this.hp.max;

		if (this.hp.current < 0)
			this.hp.current = 0;

		if (this.mood.current > 100)
			this.mood.current = 100;

		if (this.mood.current < -100)
			this.mood.current = -100;
	},
	initAnimalSizeStrings: function() {
		for (let x in this.size) {
			if (x !== 'current') {
				if (this.size[x].num === 1)
					this.size[x].str = 'tiny';
				else if (this.size[x].num === 4)
					this.size[x].str = 'small';
				else if (this.size[x].num === 16)
					this.size[x].str = 'medium';
				else if (this.size[x].num === 64)
					this.size[x].str = 'big';
				else if (this.size[x].num === 256)
					this.size[x].str = 'huge';
			}
		}
	},
	setInitCustomers: function() {
		this.customers.current = 0;
	},
	setCustomersCount: function() {
		let customersDelta = this.customers.max - this.customers.min;
		this.customers.current = Math.round(Math.random() * customersDelta) + this.customers.min;
	},
	setCurrentAnimalSize: function() {
		this.size.current.num = this.size[`${this.age.statusStr}`].num;
		this.size.current.str = this.size[`${this.age.statusStr}`].str;
	},
	setGender: function() {
		let i = Math.round(Math.random());
		this.gender = i === 0 ? 'male' : 'female';
	},
	defineName: function(name) {
		if (!name)
			this.name = `Default_${this.type}_Name_${this.id.split('--')[0]}`;
		else
			this.name = name;

		this.updateVersion();
	},
	setActiveRation: function(num) {
		this.ration.map((el) => {
			el.active = false;
			return el;
		});
		this.ration[num].active = true;

		this.updateVersion();
	},
	setInitDeathChances: function() {
		this.deathChance.default = 1 / this.age.status.old;
		this.deathChance.current = this.deathChance.default;
	},
	generateIdForShop: function() {
		const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
		this.id = `${id}--${this.idTemplate.toLowerCase()}`;
	},
	generateIdForOwnings: function(num) {
		this.id = `${num}--${this.idTemplate.toLowerCase()}`;
	},


	uponPurchased: function() {
		this.owned = true;
		this.formCurrentPrice();
		this.defineName();
		this.setActiveRation(2);
		this.setInitDeathChances();
	},
	growOlder: function() {
		this.age.current++;
		this.setAgeStatusString();
		this.makeCurrentAgeLookNice();
	},
	setNextMonthData: function() {
		this.growOlder();
		this.formCurrentPrice();
		this.setCustomersCount();
		this.updateHpAndMood();

		//Кажется здесь оно должно сдохнуть от старости или, если нет хп
		if (this.isDead() || this.hp.current === 0)
			this.die();

		this.updateVersion();
	},
	isDead: function() {
		this.deathChance.current = this.deathChance.default;

		if (this.age.current >= 0 && this.age.current < this.age.status.cub)
			this.deathChance.current *= 3;
		
		if (this.age.current >= this.age.status.adult && this.age.current <= this.age.status.old) {
			this.deathChance.current = getBoostedDeathChance(
				this.deathChance.current,
				this.age.status.adult,
				this.age.status.old,
				this.age.current
			);
		} else if (this.age.current > this.age.status.old) {
			this.deathChance.current = 1;
		}

		return valarMorgulis(this.deathChance.current);


		function getBoostedDeathChance(startingChance, startingAge, endingAge, currentAge) {
			let endingChance = 0.15;

			let interval = endingAge - startingAge;
			let chanceDiff = endingChance - startingChance;
			let dChance = chanceDiff / interval;
			let unitsFromStart = currentAge - startingAge;

			return startingChance + (dChance * unitsFromStart);
		}

		function valarMorgulis(a) {
			let deathRoll = Math.random();

			return (deathRoll <= a);
		}
	},
	die: function() {
		this.owned = false;
	},






	updateVersion: function() {
		//Вызывается внутри методов, которые меняют версию животного (Обновилось имя, обновился возраст, сменился рацион и так далее)
		this.version++;
	},

	
	//UNDONE BUT NEEDED METHODS





	//TEST METHODS
	test: function() {
		console.log(this);
	}
};

//age>>current and so define status
//hp>>current
//name (when defined by user)


//sizes: 1 (tiny), 4 (small), 16 (average), 64 (big), 256 (huge)


//export const Rabbit = 