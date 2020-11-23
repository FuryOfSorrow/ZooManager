import React from 'react';



export const StatContainer = (props) => {
	let stats = null;
	let type = props.statType;
	let img = props.img;

	let currentVal;
	let incrementVal;

	let reqEnergy;
	let prodEnergy;

	let decoClass = '';


	if (type === 'energy') {
		reqEnergy = props.data.req;
		prodEnergy = props.data.prod;

		if (prodEnergy < reqEnergy)
			decoClass = 'bad';
		else if (prodEnergy > reqEnergy)
			decoClass = 'good';

		stats = (
			<div className="stat-value">
				<span>{ reqEnergy }</span>
				<span> </span>
				<span>(
					<span className="small-txt">produced:</span>
					<span className={ decoClass }>{ prodEnergy }</span>
				)</span>
			</div>
		);
	} else if (type === 'customers') {
		currentVal = props.data.current;

		stats = (
			<div className="stat-value">
				<span>{ currentVal }</span>
			</div>
		);
	} else if (type === 'mood') {
		currentVal = props.data.current;

		stats = (
			<div className="stat-value">
				<span>{ currentVal }</span>
			</div>
		);
	} else {
		currentVal = props.data.current;
		incrementVal = props.data.change;

		if (incrementVal < 0)
			decoClass = 'bad';
		else if (incrementVal > 0)
			decoClass = 'good';

		stats = (
			<div className="stat-value">
				<span>{ currentVal }</span>
				<span> </span>
				<span>(
					<span className={ decoClass }>{ incrementVal }</span>
				)</span>
			</div>
		);
	}

	return (
		<div className="stat-container">
			<div className="stat-img">{ img }</div>
			{ stats }
		</div>
	);
};