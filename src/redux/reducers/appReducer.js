import { SWITCH_MODE, SHOW_MODAL, HIDE_MODAL } from './../types';



const initialState = {
	mode: 'animals',
	modal: {
		show: false,
		type: 'purchase-animal-category',
		content: {}
	}
};


export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SWITCH_MODE:
			return {...state, mode: action.payload};

		case SHOW_MODAL:
			return {...state, modal: action.payload};

		case HIDE_MODAL:
			let x = state.modal;
			return {...state, modal: {...x, show: false}};

		default:
			return state;
	}
};