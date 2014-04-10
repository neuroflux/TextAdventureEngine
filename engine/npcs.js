/**
	This file holds random descriptions and names for the zombies!
**/

var Zeds = []; //holds the zeds

var zDesc = function() {
	var zdescriptions = [
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
	var index = Math.floor(Math.random() * zdescriptions.length);
	return zdescriptions[index];
}

var zName = function() {
	var znames = [
		"policeman zombie",
		"nurse zombie",
		"doctor zombie",
		"civilian zombie",
		"civilian zombie",
		"civilian zombie",
		"civilian zombie",
		"civilian zombie",
		"army zombie",
		"child zombie",
		"bus driver zombie",
		"vicar zombie",
		"naked zombie",
		"nun zombie"
	];
	var index = Math.floor(Math.random() * znames.length);
	return znames[index];
}