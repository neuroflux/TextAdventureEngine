var Zeds = [];

/* ZOMBIE DESCRIPTIONS */
var zDesc = function() {
	var wDesc = Math.floor(Math.random() * 10);
	switch(wDesc) {
		case 0:
			return "a rotting zombie with no jaw";
			break;
		case 1:
			return "a fairly fresh zombie";
			break;
		case 2:
			return "a zombie with one arm";
			break;
		case 3:
			return "a crawling zombie";
			break;
		case 4:
			return "a crawling zombie with no legs";
			break;
		case 5:
			return "a blind zombie";
			break;
		case 6:
			return "a zombie wearing a hard hat";
			break;
		case 7:
			return "a zombie";
			break;
		case 8:
			return "a rotting zombie with half a head";
			break;
		case 9:
			return "a smelly zombie";
			break;
		default:
			break;
	}
}

/* ZOMBIE NAMES */
var zName = function() {
	var wName = Math.floor(Math.random() * 10);
	switch(wName) {
		case 0:
			return "policeman zombie";
			break;
		case 1:
			return "nurse zombie";
			break;
		case 2:
			return "doctor zombie";
			break;
		case 3:
			return "civilian zombie";
			break;
		case 4:
			return "army zombie";
			break;
		case 5:
			return "child zombie";
			break;
		case 6:
			return "bus driver zombie";
			break;
		case 7:
			return "vicar zombie";
			break;
		case 8:
			return "naked zombie";
			break;
		case 9:
			return "nun zombie";
			break;
		default:
			break;
	}
}