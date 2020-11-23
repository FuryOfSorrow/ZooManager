import React from 'react';
import './styles/main.css';

import { ContentLayouts } from './components/ContentLayouts/Main';
import { ModalLayouts } from './components/ModalLayouts/Main';



function App() {
	return (
		<div className="application">
			<ContentLayouts />
			<ModalLayouts />
		</div>
	);
}

export default App;
