import React, { useState, useEffect } from 'react';

import { ArrowLeft } from './../../../assets/graphics/ui/ArrowLeft';
import { ArrowRight } from './../../../assets/graphics/ui/ArrowRight';

import { MeatImgComponent } from './../../../assets/graphics/consumables/Meat';
import { PlantImgComponent } from './../../../assets/graphics/consumables/Plant';
import { ExoticImgComponent } from './../../../assets/graphics/consumables/Exotic';
import { MedicineImgComponent } from './../../../assets/graphics/consumables/Medicine';

import { HeartImgComponent } from './../../../assets/graphics/animals/traits/Heart';
import { MoodImgComponent } from './../../../assets/graphics/animals/traits/Mood';



export const RationsBlock = ({ elem }) => {
	const [selectedRation, setSelectedRation] = useState(2);

	let leftSwitcher;
	let rightSwitcher;

	let bonuses;


	useEffect(() => {
		leftSwitcher = document.querySelector('.switcher.left');
		rightSwitcher = document.querySelector('.switcher.right');
	}, [selectedRation]);

	const capitalizeString = (str) => {
		return str[0].toUpperCase() + str.slice(1);
	};
	
	const leftArrowClick = () => {
		rightSwitcher.classList.remove('disabled');

		if (selectedRation === 1)
			leftSwitcher.classList.add('disabled');

		if (selectedRation > 0)
			setSelectedRation(selectedRation - 1);
	};

	const rightArrowClick = () => {
		leftSwitcher.classList.remove('disabled');

		if (selectedRation === elem.ration.length - 2)
			rightSwitcher.classList.add('disabled');

		if (selectedRation < elem.ration.length - 1)
			setSelectedRation(selectedRation + 1);
	};

	const setBonusesBlock = () => {
		let moodToDisplayInImg;
		let moodClass, hpClass, moodStr, hpStr;

		let hp = elem.ration[selectedRation].hp;
		let mood = elem.ration[selectedRation].mood;

		if (hp < 0) {
			hpClass = 'negative';
			hpStr = hp;
		}
		else if (hp > 0) {
			hpClass = 'positive';
			hpStr = '+' + hp;
		}

		if (mood < 0) {
			moodToDisplayInImg = -100;
			moodClass = 'negative';
			moodStr = mood;
		}
		else if (mood > 0) {
			moodToDisplayInImg = 100;
			moodClass = 'positive';
			moodStr = '+' + mood;
		}


		if (hp === 0 && mood === 0)
			bonuses = (<><div className="txt">( No effects )</div></>);
		else if (hp !== 0 && mood !== 0)
			bonuses = (
				<>
					<span className="txt">(</span>
					<span className={`txt txt-stat ${hpClass}`}>{ hpStr }</span>
					<div className="img">
						<HeartImgComponent />
					</div>
					<span className="txt">&</span>
					<span className={`txt txt-stat ${moodClass}`}>{ moodStr }</span>
					<div className="img">
						<MoodImgComponent mood={ moodToDisplayInImg } />
					</div>
					
					<span className="txt last">)</span>
				</>
			);
		else {
			let displayedVal, displayedImg;

			if (hp === 0) {
				displayedVal = (<span className={`txt txt-stat ${moodClass}`}>{ moodStr }</span>);
				displayedImg = (<MoodImgComponent mood={ moodToDisplayInImg } />);
			} else {
				displayedVal = (<span className={`txt txt-stat ${hpClass}`}>{ hpStr }</span>);
				displayedImg = (<HeartImgComponent />);
			}

			bonuses = (
				<>
					<span className="txt">(</span>
					{ displayedVal }
					<div className="img">
						{ displayedImg }
					</div>
					<span className="txt">)</span>
				</>
			);
		}
	};

	setBonusesBlock();

	let title;

	if (selectedRation === 0)
		title = 'Starvation';
	else
		title = capitalizeString(elem.ration[selectedRation].id) + ' ration';


	return (
		<div className="rations-block">
			<div className="switcher left" onClick={ leftArrowClick }>
				<ArrowLeft />
			</div>
			<div className="central">
				<div className="title-container">
					<div className="txt">{ title }</div>
					{ bonuses }
				</div>
				<div className="ration-elements">
					<div className="elem">
						<div className="img">
							<MeatImgComponent />
						</div>
						<div className="quantity">{ elem.ration[selectedRation].consumes.meat }</div>
					</div>
					<div className="elem">
						<div className="img">
							<PlantImgComponent />
						</div>
						<div className="quantity">{ elem.ration[selectedRation].consumes.plant }</div>
					</div>
					<div className="elem">
						<div className="img">
							<ExoticImgComponent />
						</div>
						<div className="quantity">{ elem.ration[selectedRation].consumes.exotic }</div>
					</div>
					<div className="elem">
						<div className="img">
							<MedicineImgComponent />
						</div>
						<div className="quantity">{ elem.ration[selectedRation].consumes.medicine }</div>
					</div>
				</div>
			</div>
			<div className="switcher right" onClick={ rightArrowClick }>
				<ArrowRight />
			</div>
		</div>
	);
};