/**
	This is you!
	You can set starting items by inserting the item ID into the correct array
	i.e.
		Inventory: [],
			becomes
		Inventory: [0],
			to add item id #0 to player
**/

var You = {
	Loc: 0, //player location
	HP: 50, //player health
	STR: 1, //player strength
	SPD: 1, //player speed
	ACC: 0, //player accuracy
	EXP: 0, //player experience counter
	LVL: 1, //player level
	
	Primary: null, //weapon
	
	Clothing: {
		Top: 0, //top clothing
		Bottom: 1 //bottom clothing
	},
	
	Kills: 0, //kill count
	Eaten: 0, //food eaten
	SavedSurvivors: 0, //how many have you saved?
	
	Hunger: 0, //current hunger
	
	Inventory: [], //player inventory
	FoodInventory: [], //player food inventory
	food: [], //unused as of yet
	barricades: [] //player barricade inventory
};