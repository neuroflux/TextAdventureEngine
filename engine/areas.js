/**
	This is where you set up the areas!
	Everything should be pretty self-explanitory.
	
	i.e.
		If you exit south, the next room should have an exit back north!
**/

var Areas = [];

var TestArea = [
	{
		id:0, //unique id
		name:"welcome room", //name
		description:"welcome to the engine, everything is customisable in the /engine folder", //description
		smell: "this room smells generic", //smell of this area
		objects:[0], //objects held in this area
		items:[0], //items in this area
		clothes: [2], //clothing in this area
		food:[], //food in this area
		barricades:[], //barricades in this area
		n:-1, //exit north (area id)
		s:1, //exit south (area id)
		e:-1, //exit east (area id)
		w:-1, //exit west (area id)
		u:-1, //exit up (area id)
		d:-1, //exit down (area id)
		z:0 //can zombies enter this area (barricading)
	},{
		id:1,
		name:"cupboard",
		description:"welcome to the engine cupboard",
		smell: "this room smells generic",
		objects:[1],
		items:[1],
		clothes: [3],
		food:[],
		barricades:[0],
		n:0,
		s:-1,
		e:-1,
		w:-1,
		u:-1,
		d:-1,
		z:0
	}
];
