import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToNextMonth } from './../../../redux/actions/gameActions';

import { StatContainer } from './StatContainer';

import { CashImgComponent } from './../../../assets/graphics/resources/Cash';
import { EnergyImgComponent } from './../../../assets/graphics/resources/Energy';
import { CustomerImgComponent } from './../../../assets/graphics/resources/Customer';
import { MoodImgComponent } from './../../../assets/graphics/resources/Mood';
import { MeatImgComponent } from './../../../assets/graphics/consumables/Meat';
import { PlantImgComponent } from './../../../assets/graphics/consumables/Plant';
import { ExoticImgComponent } from './../../../assets/graphics/consumables/Exotic';
import { MedicineImgComponent } from './../../../assets/graphics/consumables/Medicine';



export const InfoLayout = () => {
	const currentGameStats = useSelector(state => state.game);
	const currentUnlockableData = useSelector(state => state.unlockable);

	const currentMonth = useSelector(state => state.game.month);

	const currentCash = useSelector(state => state.game.resources.cash.total);
	const currentCashIncome = useSelector(state => state.game.resources.cash.income);
	const energyRequired = useSelector(state => state.game.resources.energy.req);
	const energyProduced = useSelector(state => state.game.resources.energy.prod);
	const customersCount = useSelector(state => state.game.customers.count);
	const customersMood = useSelector(state => state.game.customers.mood);

	const currentMeat = useSelector(state => state.game.consumables.meat.total);
	const currentMeatIncome = useSelector(state => state.game.consumables.meat.income);
	const currentPlant = useSelector(state => state.game.consumables.plant.total);
	const currentPlantIncome = useSelector(state => state.game.consumables.plant.income);
	const currentExotic = useSelector(state => state.game.consumables.exotic.total);
	const currentExoticIncome = useSelector(state => state.game.consumables.exotic.income);
	const currentMedicine = useSelector(state => state.game.consumables.medicine.total);
	const currentMedicineIncome = useSelector(state => state.game.consumables.medicine.income);

	const dispatch = useDispatch();


	return (
		<div className="info-layout">
			<div className="left-part">
				<StatContainer
					statType="cash"
					data={{
						current: currentCash,
						change: currentCashIncome
					}}
					img={
						<CashImgComponent style={{width: '40px', height: '40px'}}/>
					}
				/>

				<div className="divider-line"></div>

				<StatContainer
					statType="meat"
					data={{
						current: currentMeat,
						change: currentMeatIncome
					}}
					img={
						<MeatImgComponent style={ {width: '34px', height: '34px'} }/>
					}
				/>
				<StatContainer
					statType="plant"
					data={{
						current: currentPlant,
						change: currentPlantIncome
					}}
					img={
						<PlantImgComponent style={ {width: '34px', height: '34px'} }/>
					}
				/>
				<StatContainer
					statType="exotic"
					data={{
						current: currentExotic,
						change: currentExoticIncome
					}}
					img={
						<ExoticImgComponent style={ {width: '46px', height: '46px'} }/>
					}
				/>
				<StatContainer
					statType="medicine"
					data={{
						current: currentMedicine,
						change: currentMedicineIncome
					}}
					img={
						<MedicineImgComponent style={ {width: '34px', height: '34px'} }/>
					}
				/>

				<div className="divider-line"></div>

				<StatContainer
					statType="energy"
					data={{
						req: energyRequired,
						prod: energyProduced
					}}
					img={
						<EnergyImgComponent style={ {width: '26px', height: '26px'} }/>
					}
				/>

				<StatContainer
					statType="customers"
					data={{
						current: customersCount
					}}
					img={
						<CustomerImgComponent style={ {width: '26px', height: '26px'} }/>
					}
				/>

				<StatContainer
					statType="mood"
					data={{
						current: customersMood
					}}
					img={
						<MoodImgComponent style={ {width: '26px', height: '26px'} }/>
					}
				/>
			</div>

			<div className="right-part">
				<div className="month-container">
					<div className="info">Month: { currentMonth }</div>
					<button className="btn" onClick={() => {dispatch(goToNextMonth(currentGameStats, currentUnlockableData))}}>Next</button>
				</div>
			</div>
		</div>
	);
};