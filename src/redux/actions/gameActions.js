import { GAME_INIT, NEXT_MONTH, CONSUMABLE_PURCHASED, ANIMAL_PURCHASED, ANIMAL_UPDATED, ANIMAL_SOLD, CONS_RECALC_INCOME } from './../types';

import { clone } from './../../serv/deepClone';
import { goodMath } from './../../serv/globalFuncs';



let localAnimalId;

export const gameInit = () => {
	return {
		type: GAME_INIT
	};
};

export const goToNextMonth = (curGameStats, unlockablesData) => {
	let newData = setNewMonthData(curGameStats, unlockablesData);

	return {
		type: NEXT_MONTH,
		payload: {
			...newData
		}
	};


	function setNewMonthData(data, unlockables) {
		const setOwnedAnimalsArray = (prev) => {
			let newArr = prev.map((el) => {
				let newAnimal = clone(el);
				Object.setPrototypeOf(newAnimal, Object.getPrototypeOf(el));
				newAnimal.setNextMonthData();

				return newAnimal;
			});

			return newArr;
		};

		const makeDeadAnimals = (arr) => {
			return arr.filter((el) => el.owned);
		};

		const setConsumablesObj = (prev, animalsArr) => {
			let newConsumables = clone(prev);

			let rationsArr = animalsArr.map((el) => {
				return el.ration.find((el) => el.active === true).consumes;
			});

			let meatConsumed = rationsArr.reduce((total, el) => {
				return total + el.meat;
			}, 0);
			let plantConsumed = rationsArr.reduce((total, el) => {
				return total + el.plant;
			}, 0);
			let exoticConsumed = rationsArr.reduce((total, el) => {
				return total + el.exotic;
			}, 0);
			let medicineConsumed = rationsArr.reduce((total, el) => {
				return total + el.medicine;
			}, 0);


			return {
				meat: {
					total: goodMath(newConsumables.meat.total - meatConsumed, 1),
					income: -meatConsumed
				},
				plant: {
					total: goodMath(newConsumables.plant.total - plantConsumed, 1),
					income: -plantConsumed
				},
				exotic: {
					total: goodMath(newConsumables.exotic.total - exoticConsumed, 1),
					income: -exoticConsumed
				},
				medicine: {
					total: goodMath(newConsumables.medicine.total - medicineConsumed, 1),
					income: -medicineConsumed
				}
			};
		};

		const setCustomersObj = (animalsArr, defaultTicketPrice) => {
			let totalMood;
			
			if (animalsArr.length)
				totalMood = getTotalMood(animalsArr);
			else
				totalMood = 0;

			const customersCount = animalsArr.map(el => el.customers.current).reduce((total, el) => {
				return total + el;
			}, 0);


			return {
				count: customersCount,
				mood: Math.round(totalMood),
				ticketPrice: {
					default: defaultTicketPrice,
					current: goodMath(defaultTicketPrice + defaultTicketPrice * totalMood / 100, 1)
				}
			};


			function getTotalMood(arr) {
				let arrayOfAnimalMoods = arr.map((el) => {
					return {
						influence: el.mood.influence,
						curMood: el.mood.current
					};
				});
				let arrayOfTotalMoods = arrayOfAnimalMoods.map(el => el.influence * el.curMood);
	
				let sumOfInfluences = arrayOfAnimalMoods.reduce((total, el) => {
					return total + el.influence;
				}, 0);
				let sumOfTotalMoods = arrayOfTotalMoods.reduce((total, el) => {
					return total + el;
				}, 0);
	
				return sumOfTotalMoods / sumOfInfluences;
			}
		};

		const setResourcesObj = (prev, customerObj, manageCost) => {
			let newEnergyObj = clone(prev.energy);
			let newCashIncome = recalcIncome(customerObj, manageCost);
			let newCashTotal = goodMath(prev.cash.total + newCashIncome, 1);
	
			return {
				energy: newEnergyObj,
				cash: {
					total: newCashTotal,
					income: newCashIncome
				}
			};


			function recalcIncome(co, mc) {
				let ticketPrice;

				if (!co.ticketPrice.current)
					ticketPrice = co.ticketPrice.default;
				else
					ticketPrice = co.ticketPrice.current;

				return goodMath(co.count * ticketPrice - mc, 1);
			}
		};

		const generateNewAnimalsInTheShop = (gData, uData) => {
			const generateRandomAnimalInShop = (data) => {
				let arrOfUnlocked = data.filter((el) => el.unlocked);
				let x = Math.floor(Math.random() * arrOfUnlocked.length);
				let constructorFunc = arrOfUnlocked[x].type;

				let newObj = new constructorFunc().init();
				newObj.generateIdForShop();
				return newObj;
			};

			let newAnimalsArr = [];
			let maxAnimals = gData.shop.maxAnimals;
			console.log(maxAnimals);

			let animalsCount = Math.floor(Math.random() * (maxAnimals - 1 + 1) + 1);

			for (let i = 0; i < animalsCount; i++)
				newAnimalsArr.push(generateRandomAnimalInShop(uData.animals));


			return newAnimalsArr;
		};
	
	
		console.log('Задаю данные на следующий месяц');
	
		let newMonth = data.month + 1;
		let newAnimalsArr = makeDeadAnimals(setOwnedAnimalsArray(data.ownings.animals));
		let newConsObj = setConsumablesObj(data.consumables, newAnimalsArr);
		let newCustomersObj = setCustomersObj(newAnimalsArr, data.customers.ticketPrice.default);
		let newResObj = setResourcesObj(data.resources, newCustomersObj, data.manageCost);
		let newAnimalsInShop = generateNewAnimalsInTheShop(data, unlockables);

	
		return {
			month: newMonth,
			resources: newResObj,
			consumables: newConsObj,
			ownings: {
				animals: newAnimalsArr
			},
			customers: newCustomersObj,
			newAnimalsInShop: newAnimalsInShop
		};
	}
};

export const consumablePurchased = (consumable) => {
	return {
		type: CONSUMABLE_PURCHASED,
		payload: {
			...consumable
		}
	};
};

export const animalPurchased = (animalObj) => {
	return (dispatch, getState) => {
		if (localAnimalId === undefined)
			localAnimalId = 1;
		else
			localAnimalId++;

		//тут нельзя изменять старый объект animalObj — нужно создать новый
			/* animalObj.id = `${localAnimalId}--${animalObj.type.toLowerCase()}`;
			animalObj.ration.find(el => el.id === 'normal').active = true; */
		//	Так по идее я все равно мутирую объект (можно убедиться в этом смотря на свойство active в объектах
		//	массива ration, активного элемента модалки (если раньше все false, то потом одно из них станет true))
			//let newAnimal = {...animalObj};
		let state = getState();
		let idOfAnimalInShop = animalObj.id;
		let newAnimal = clone(animalObj);

		Object.setPrototypeOf(newAnimal, Object.getPrototypeOf(animalObj));

		newAnimal.generateIdForOwnings(localAnimalId);
		let cost = newAnimal.price.current;
		newAnimal.uponPurchased();
		let newAnimalsArrayInShop = state.game.shop.animals.filter((el) => el.id !== idOfAnimalInShop);


		dispatch({
			type: ANIMAL_PURCHASED,
			payload: {
				newAnimalsArrayInShop,
				newAnimal,
				cost: cost
			}
		});
	};
};

export const animalSold = (animalObj) => {
	let id = animalObj.id;
	let cost = animalObj.price.current;


	return {
		type: ANIMAL_SOLD,
		payload: {
			id,
			cost: cost
		}
	};
};

export const recalcConsumablesIncome = () => {
	return (dispatch, getState) => {
		let state = getState();
		let consumption = consRecalcIncome(state.game.ownings.animals);

		dispatch({
			type: CONS_RECALC_INCOME,
			payload: consumption
		});
	};


	function consRecalcIncome(arr) {
		let rationsArr = arr.map((el) => {
			let activeRation = el.ration.find(el => el.active === true);
			return activeRation;
		});

		return {
			meat: -1 * countIncomeOfType(rationsArr, 'meat'),
			plant: -1 * countIncomeOfType(rationsArr, 'plant'),
			exotic: -1 * countIncomeOfType(rationsArr, 'exotic'),
			medicine: -1 * countIncomeOfType(rationsArr, 'medicine')
		};


		function countIncomeOfType(arr, type) {
			let counter = 0;
			let arrOfTypeConsumption = arr.map((el) => {
				return el.consumes[type];
			});

			for (let i = 0; i < arrOfTypeConsumption.length; i++) {
				counter += arrOfTypeConsumption[i];
			}

			return counter;
		}
	}
};

export const renameAnimal = (animalObj, newName) => {
	return (dispatch, getState) => {
		let modifiedAnimal = clone(animalObj);

		Object.setPrototypeOf(modifiedAnimal, Object.getPrototypeOf(animalObj));
		modifiedAnimal.defineName(newName);

		let state = getState();
		let x = state.game.ownings.animals.findIndex((el, i) => {
			if (el.id.toString() === modifiedAnimal.id.toString())
				return true;
		});

		dispatch({
			type: ANIMAL_UPDATED,
			payload: {
				item: modifiedAnimal,
				index: x
			}
		});
	};
};

export const animalsRationChanged = (animalObj, rationId) => {
	return (dispatch, getState) => {
		let modifiedAnimal = clone(animalObj);

		Object.setPrototypeOf(modifiedAnimal, Object.getPrototypeOf(animalObj));
		modifiedAnimal.setActiveRation(rationId);

		let state = getState();
		let x = state.game.ownings.animals.findIndex((el, i) => {
			if (el.id.toString() === modifiedAnimal.id.toString())
				return true;
		});

	
		dispatch({
			type: ANIMAL_UPDATED,
			payload: {
				item: modifiedAnimal,
				index: x
			}
		});
		dispatch(recalcConsumablesIncome());
	}
};