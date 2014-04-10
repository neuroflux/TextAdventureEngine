/**
	This file holds the objects, these are items that the player cannot pick up
	but can open/read and look at.
**/

var Objects = [
	{
		id: 0, //unique id
		name: "sign", //name
		description: "an old word sign splattered with blood", //short description
		read: "welcome to the engine!", //if you read the object, what does it say?
		open:-1, //can you open it (-1 = no, 0 = closed, 1 = open)
		locked: false, //is the object locked?
		items:[] //does it hold items?
	},{
		id: 1,
		name: "box",
		description: "a plain wooden box",
		read: "",
		open:0, //can be opened
		locked: false,
		items:[1] //holds item #1
	}
];