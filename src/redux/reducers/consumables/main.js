export const MeatConsumableCategory = {
	id: 'meat-consumable',
	type: 'Meat',
	items: [
		{
			id: 'cons-meat-pack-1',
			resource: 'meat',
			title: '1 kilo of meat',
			tooltip: 'A kilo of fresh meat. Very tasty!',
			quantity: 1,
			price: 8,
			available: true
		},
		{
			id: 'cons-meat-pack-2',
			resource: 'meat',
			title: '3 kilos of meat',
			tooltip: 'It\'s like a kilo of meat, but only there are 3 of them. Do not pass \'em by!',
			quantity: 3,
			price: 23,
			available: true
		},
		{
			id: 'cons-meat-pack-3',
			resource: 'meat',
			title: '10 kilos of meat',
			tooltip: 'Looks like someone\'s gonna have a nice feast this weekend! Mmm... \'kay, you know, that was a pretty dumb comment of mine.',
			quantity: 10,
			price: 76,
			available: true
		},
		{
			id: 'cons-meat-pack-4',
			resource: 'meat',
			title: '50 kilos of meat!',
			tooltip: 'I don\'t know why you need so much meat, but you better watch that it doesn’t rot.',
			quantity: 50,
			price: 350,
			available: false
		},
		{
			id: 'cons-meat-pack-5',
			resource: 'meat',
			title: '250 kilos of meat!!!',
			tooltip: 'You know, if I didn\'t know you, buddy, I would have thought that you had a whole zoo there.',
			quantity: 250,
			price: 1600,
			available: false
		}
	],
	img: '/graphics/consumables/meat.png'
};

export const PlantsConsumableCategory = {
	id: 'plants-consumable',
	type: 'Plants',
	items: [
		{
			id: 'cons-plant-pack-1',
			resource: 'plant',
			title: '1 kilo of plants',
			tooltip: 'A kilo of fresh plants. Nice choice!',
			quantity: 1,
			price: 3,
			available: true
		},
		{
			id: 'cons-plant-pack-2',
			resource: 'plant',
			title: '3 kilos of plants',
			tooltip: 'Are you going to cook salads for a whole week through, huh?',
			quantity: 3,
			price: 9,
			available: true
		},
		{
			id: 'cons-plant-pack-3',
			resource: 'plant',
			title: '10 kilos of plants',
			tooltip: '_PLANTS_DESCRIPTION_3_',
			quantity: 10,
			price: 28,
			available: true
		},
		{
			id: 'cons-plant-pack-4',
			resource: 'plant',
			title: '50 kilos of plants!',
			tooltip: 'You know, if you had your own vegetable garden, you wouldn\'t have to spend so much money.',
			quantity: 50,
			price: 128,
			available: false
		},
		{
			id: 'cons-plant-pack-5',
			resource: 'plant',
			title: '250 kilos of plants!!!',
			tooltip: 'Damn you, when did you become a vegetarian?',
			quantity: 250,
			price: 620,
			available: false
		}
	],
	img: '/graphics/consumables/plants.png'
};

export const ExoticsConsumableCategory = {
	id: 'exotics-consumable',
	type: 'Exotics',
	items: [
		{
			id: 'cons-exotic-pack-1',
			resource: 'exotic',
			title: '1 pack of exotics',
			tooltip: 'A pack of various rare fruits, exotic beetles, rolling stones or whatever...',
			quantity: 1,
			price: 15,
			available: true
		},
		{
			id: 'cons-exotic-pack-2',
			resource: 'exotic',
			title: '3 packs of exotics',
			tooltip: '_EXOTICS_DESCRIPTION_2_',
			quantity: 3,
			price: 43,
			available: true
		},
		{
			id: 'cons-exotic-pack-3',
			resource: 'exotic',
			title: '10 packs of exotics',
			tooltip: '_EXOTICS_DESCRIPTION_3_',
			quantity: 10,
			price: 140,
			available: false
		},
		{
			id: 'cons-exotic-pack-4',
			resource: 'exotic',
			title: '50 packs of exotics!',
			tooltip: '_EXOTICS_DESCRIPTION_4_',
			quantity: 50,
			price: 680,
			available: false
		}
	],
	img: '/graphics/consumables/exotic.png'
};

export const MedicineConsumableCategory = {
	id: 'medicine-consumable',
	type: 'Medicine',
	items: [
		{
			id: 'cons-medicine-pack-1',
			resource: 'medicine',
			title: '1 pack of medicine',
			tooltip: '_MEDICINE_DESCRIPTION_1_',
			quantity: 1,
			price: 25,
			available: true
		},
		{
			id: 'cons-medicine-pack-2',
			resource: 'medicine',
			title: '3 packs of medicine',
			tooltip: '_MEDICINE_DESCRIPTION_2_',
			quantity: 3,
			price: 70,
			available: false
		},
		{
			id: 'cons-medicine-pack-3',
			resource: 'medicine',
			title: '10 packs of medicine',
			tooltip: '_MEDICINE_DESCRIPTION_3_',
			quantity: 10,
			price: 230,
			available: false
		}
	],
	img: '/graphics/consumables/medicine.png'
};