import React from 'react';



export const animal = {
	lol: 'kek',
	init: function() {
		this.defineInitAge();
		this.setAgeStatusString();
		this.makeCurrentAgeLookNice();
		this.setHp();
		this.setGender();
		this.formCurrentPrice();
		this.setLifespanExpectancyTxt();
		this.initAnimalSize();


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
		} else if (this.age.current >= this.age.status.old) {
			currentPrice = currentPrice / 3;
		}

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
	setHp: function() {
		let x = Math.random();

		if (this.age.statusStr === 'cub')
			x = x * 0.3;
		else if (this.age.statusStr === 'young')
			x = x * 0.3 + 0.2;
		else
			x = x * 0.7 + 0.3;


		this.hp.current = Math.round(this.hp.max * x);
	},
	initAnimalSize: function() {
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

		this.setCurrentAnimalSize();
	},
	setCurrentAnimalSize: function() {
		this.size.current.num = this.size[`${this.age.statusStr}`].num;
		this.size.current.str = this.size[`${this.age.statusStr}`].str;
	},
	setGender: function() {
		let i = Math.round(Math.random());
		this.gender = i === 0 ? 'male' : 'female';
	},
	die: function() {
		const displayMessage = () => {
			console.log(`Wow, it seems I am a dead ${this.type} now!`);
		}
		
		displayMessage();
	}
};

//gender
//age>>current and so define status
//hp>>current
//name (when defined by user)


//sizes: 1 (tiny), 4 (small), 16 (average), 64 (big), 256 (huge)


//export const Rabbit = 