/**
	This file holds the bulk item data!
	Currently weight/accuracy is unsed
**/

var Items = [
	{
		id: 0, //unique id
		name: "item one", //name
		alias: "one", //other names (comma delimited)
		description: "item number one", //short description
		weight: 1, //item weight (unused)
		damage: {
			min: 0, //minimum damage this item can cause
			max: 0 //maximum damage this item can cause
		},
		accuracy: 0, //accuracy bonuses (unused)
		score: 0 //up the score!
	},{
		id: 1,
		name: "item two",
		alias: "two",
		description: "item number two",
		weight: 1,
		damage: {
			min: 0,
			max: 0
		},
		accuracy: 0,
		score: 0
	}
];