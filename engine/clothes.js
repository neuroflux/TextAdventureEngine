/**
	This is the clothing file. Pretty self-explanitory.
	i.e.
		armour: 0
			is the clothing defence (taken off of attacks)
**/

var Clothes = [
	{
		id: 0, //unique id
		name: "red tshirt", //name
		alias: "redshirt", //other names (comma delimited)
		description: "a cheap red shirt",  //short description
		where: "top", //where you wear it (top/bottom)
		armour: 0 //does it give you armour (number)?
	},{
		id: 1,
		name: "blue jeans",
		alias: "bluejeans",
		description: "a cheap pair of blue jeans",
		where: "bottom",
		armour: 0
	},{
		id: 2,
		name: "leather jacket",
		alias: "ljacket",
		description: "a cheap leather jacket",
		where: "top",
		armour: 1
	},{
		id: 3,
		name: "leather trousers",
		alias: "ltrousers",
		description: "a cheap pair of leather trousers",
		where: "bottom",
		armour: 1
	}
];
