import { combineReducers } from 'redux';

import { appReducer } from './appReducer';
import { gameReducer } from './gameReducer';
import { unlockablesReducer } from './unlockablesReducer';



export const rootReducer = combineReducers({
	app: appReducer,
	game: gameReducer,
	unlockable: unlockablesReducer
});