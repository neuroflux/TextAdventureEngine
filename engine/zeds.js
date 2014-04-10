var Zeds = [];

/* ZOMBIE DESCRIPTIONS */
var zDesc = function() {
    
    var descriptions = [
        'a rotting zombie with no jaw',
        'a fairly fresh zombie',
        'a zombie with one arm',
        'a crawling zombie',
        'a crawling zombie with no legs',
        'a blind zombie',
        'a zombie wearing a hard hat',
        'a zombie',
        'a rotting zombie with half a head',
        'a smelly zombie'
    ];
    
    var index = Math.floor(Math.random() * descriptions.length);
    
    return descriptions[index];

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
