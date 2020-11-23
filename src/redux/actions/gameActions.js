import { GAME_INIT, NEXT_MONTH, CONSUMABLE_PURCHASED, ANIMAL_PURCHASED, CONS_RECALC_INCOME } from './../types';
import { clone } from './../../serv/deepClone';



let localAnimalId;

export const gameInit = () => {
	return {
		type: GAME_INIT
	};
};

export const goToNextMonth = (curGameStats) => {
	let gameStatsObj = clone(curGameStats);
	let newData = setNewMonthData(gameStatsObj);

	return {
		type: NEXT_MONTH,
		payload: {
			...newData
		}
	};
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

	let newAnimal = clone(animalObj);
	newAnimal.id = `${localAnimalId}--${newAnimal.type.toLowerCase()}`;
	newAnimal.ration.find(el => el.id === 'normal').active = true;

	return {
		type: ANIMAL_PURCHASED,
		payload: {
			...newAnimal
		}
	};
};

export const recountConsumablesIncome = () => {
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


function setNewMonthData(data) {
	const setResourcesObj = (prev) => {
		let newCashObj = prev.cash;
		newCashObj.total = newCashObj.total + newCashObj.income;

		return {
			energy: prev.energy,
			cash: newCashObj
		};
	};

	const setConsumablesObj = (prev) => {
		let newMeatObj = prev.meat;
		let newPlantObj = prev.plant;
		let newExoticObj = prev.exotic;
		let newMedicineObj = prev.medicine;

		newMeatObj.total = newMeatObj.total + newMeatObj.income;
		newPlantObj.total = newPlantObj.total + newPlantObj.income;
		newExoticObj.total = newExoticObj.total + newExoticObj.income;
		newMedicineObj.total = newMedicineObj.total + newMedicineObj.income;

		return {
			meat: newMeatObj,
			plant: newPlantObj,
			exotic: newExoticObj,
			medicine: newMedicineObj,
		};
	};


	console.log('Задаю данные на следующий месяц');

	let newMonth = data.month + 1;
	let newResObj = setResourcesObj(data.resources);
	let newConsObj = setConsumablesObj(data.consumables);

	return {
		month: newMonth,
		resources: newResObj,
		consumables: newConsObj
	};
}