import { SWITCH_MODE, SHOW_MODAL, HIDE_MODAL } from './../types';



export const switchModeTo = (modeType) => {
	return {
		type: SWITCH_MODE,
		payload: modeType
	};
};

export const hideModal = () => {
	return {
		type: HIDE_MODAL
	};
};

export const showModal = (type, content) => {
	return {
		type: SHOW_MODAL,
		payload: {
			show: true,
			type,
			content
		}
	};
};