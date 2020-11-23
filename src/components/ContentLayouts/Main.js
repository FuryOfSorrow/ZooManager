import React from 'react';

import { InfoLayout } from './InfoLayout/Layout';
import { MarketLayout } from './MarketLayout/Layout';
import { ModesLayout } from './ModesLayout/Layout';
import { OwnershipLayout } from './OwnershipLayout/Layout';



export const ContentLayouts = () => {
	return (
		<div className="content-layouts">
			<InfoLayout />
			<MarketLayout />
			<ModesLayout />
			<OwnershipLayout />
		</div>
	);
};