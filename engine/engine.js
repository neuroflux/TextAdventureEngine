//ENGINE
var Engine = {
	NPCTimer: null, //this controls the zombie movement timer
	NPCCount: 1, //currently hardcoded to 1
	NPCInt: 30000, //30 second timer for NPC actions
	
	Command: function(c) { //run command
		if (c.length > 0) {
		
			/** format the command into two bits, first word then second "item" name **/
			var command = c.split(" ");
			if (command.length > 2) {
				command[1] = command[1] + " " + command[2];
			}
			$('#cmd').val('');
			Engine.Print("<hr>");
			
			/** run the firstword as the command **/
			switch(command[0]) {
				
				/** dance! **/
				case "dance": 
					var d = Math.floor(Math.random() * 3);
					switch(d) {
						case 0:
							Engine.Print("You do a little jig");
							break;
						case 1:
							Engine.Print("You tap dance a little");
							break;
						case 2:
							Engine.Print("You spin around and pose");
							break;
						default:
							break;
					}
					break;
					
				/** check inventory **/
				case "i": case "inventory":	
					if (You.Inventory.length > 0) {
						var ll = "You're carrying:<br />";
						for (var lly = 0; lly < You.Inventory.length; lly++) {
							ll += "&nbsp;&nbsp;&nbsp;" + Items[You.Inventory[lly]].name;
						}
						Engine.Print(ll);
					} else {
						Engine.Print("You aren't carrying anything...");
					}
					break;
					
				/** movement cases north, south, east and west **/
				case "n": case "north":
					if (Areas[You.Loc].n > -1) {
						You.Loc = Areas[You.Loc].n;
						Engine.Command("clear");
					} else {
						Engine.Print("You can't go that way");
					}
					break;
				case "s": case "south":
					if (Areas[You.Loc].s > -1) {
						You.Loc = Areas[You.Loc].s;
						Engine.Command("clear");
					} else {
						Engine.Print("You can't go that way");
					}
					break;
				case "e": case "east":
					if (Areas[You.Loc].e > -1) {
						You.Loc = Areas[You.Loc].e;
						Engine.Command("clear");
					} else {
						Engine.Print("You can't go that way");
					}
					break;
				case "w": case "west":
					if (Areas[You.Loc].w > -1) {
						You.Loc = Areas[You.Loc].w;
						Engine.Command("clear");
					} else {
						Engine.Print("You can't go that way");
					}
					break;
					
				/** smell **/
				case "smell":
					Engine.Print(Areas[You.Loc].smell);
					break;
				
				/** equip weapon **/
				case "equip":
					if (command.length > 1) {
						for (var lly = 0; lly < You.Inventory.length; lly++) {
							if (Items[You.Inventory[lly]].name == command[1]) {
								You.Primary = Items[You.Inventory[lly]].id;
								Engine.Print("You equip yourself with the " + Items[You.Inventory[lly]].name);
								if (Items[You.Inventory[lly]].damage < 1) {
									Engine.Print("...it's not going to do much damage...");
								}
							}
						}
					} else {
						Engine.Print("Equip nothing...?");
					}
					break;
				
				/** unequip weapon **/
				case "unequip":
					Engine.Print("You lower your " + Items[You.Primary].name);
					You.Primary = null;
					break;
				
				/** attack (target is selected automatically **/
				case "a": case "attack":
					for (var z = 0; z < Zeds.length; z++) {
						if (Zeds[z].loc == You.Loc) {
							/** attack with primary weapon if equipped **/
							if (You.Primary !== null) {
								Engine.Print("You attack with your " + Items[You.Primary].name);
								Zeds[z].HP -= Items[You.Primary].damage;
								if (Math.floor(Math.random() * 100) > 50) {
									You.HP -= Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour);
									Engine.Print("You got hit for " + (Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour)));
									Engine.CheckHealth();
								}
								if (Zeds[z].HP <= 0) {
									var zNamed = Zeds[z].name;
									Zeds.splice(z,1);
									You.Kills++;
									
									var whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
									if (whichArea < 2) {
										whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
										if (whichArea < 2) {
											whichArea = 1;
										}
									}
									Zeds.push({
										id: z,
										name: zName(),
										alias: "wz" + z,
										description: zDesc(),
										HP: Math.floor(Math.random() * 10) + 5,
										damage: Math.floor(Math.random() * 3) + 2,
										loc: whichArea
									});
									if (whichArea == You.Loc) {
										Engine.Command("clear");
										Engine.Print("Zombie spawned!");
									}
									Engine.Print("You killed the " + zNamed + "!");
								}
							} else {
								/** attack with bare hands if you've got no weapon equipped **/
								Engine.Print("You attack with your bare hands");
								Zeds[z].HP -= 1;
								if (Math.floor(Math.random() * 100) > 35) {
									You.HP -= Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour);
									Engine.Print("You got hit for " + (Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour)));
									Engine.CheckHealth();
								}
								if (Zeds[z].HP <= 0) {
									var zNamed = Zeds[z].name;
									Zeds.splice(z,1);
									You.Kills++;
									
									var whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
									if (whichArea < 2) {
										whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
										if (whichArea < 2) {
											whichArea = 1;
										}
									}
									Zeds.push({
										id: z,
										name: zName(),
										alias: "wz" + z,
										description: zDesc(),
										HP: Math.floor(Math.random() * 10) + 5,
										damage: Math.floor(Math.random() * 3) + 2,
										loc: whichArea
									});
									if (whichArea == You.Loc) {
										Engine.Command("clear");
										Engine.Print("Zombie spawned!");
									}
									Engine.Print("You killed the " + zNamed + "!");
								}
							}
							return false;
						}
					}
					$('#display').animate({
						scrollTop: 99999999
					}, 350);
					break;
					
				/** pick up item **/
				case "t": case "take":
					if (command.length > 1) {
						//traverse areas and get items
						for (var lli = 0; lli < Areas[You.Loc].items.length; lli++) {
							if (Items[Areas[You.Loc].items[lli]].name == command[1]) {
								Engine.Print("You take the " + Items[Areas[You.Loc].items[lli]].name);
								You.Inventory.push(Items[Areas[You.Loc].items[lli]].id);
								Areas[You.Loc].items.splice(lli,1); //picked up
							}
						}
						//traverse objects and get items
						for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
							if (Objects[Areas[You.Loc].objects[lo]].open == 1) {
								//if the object is open
								for (var li = 0; li < Objects[Areas[You.Loc].objects[lo]].items.length; li++) {
									if (Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name == command[1]) {
										Engine.Print("You take the " + Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name);
										You.Inventory.push(Items[Objects[Areas[You.Loc].objects[lo]].items[li]].id);
										Objects[Areas[You.Loc].objects[lo]].items.splice(li,1); //picked up
									}
								}
							}
						}
						//traverse areas and get clothes
						//clothes are automatically worn
						for (var llc = 0; llc < Areas[You.Loc].clothes.length; llc++) {
							if (Clothes[Areas[You.Loc].clothes[llc]].name == command[1]) {
								if (Clothes[Areas[You.Loc].clothes[llc]].where == "top") { //top
									Areas[You.Loc].clothes.push(You.Clothing.Top);
									You.Clothing.Top = Areas[You.Loc].clothes[llc];
									Engine.Print("You put on the " + Clothes[Areas[You.Loc].clothes[llc]].name);
									Areas[You.Loc].clothes.splice(llc,1);
								} else { //bottom
									Areas[You.Loc].clothes.push(You.Clothing.Bottom);
									You.Clothing.Bottom = Areas[You.Loc].clothes[llc];
									Engine.Print("You put on the " + Clothes[Areas[You.Loc].clothes[llc]].name);
									Areas[You.Loc].clothes.splice(llc,1);
								}
							}
						}
					} else {
						Engine.Print("Take what...?");
					}
					break;
					
				/** drop item **/
				case "d": case "drop":
					if (command.length > 1) {
						for (var lly = 0; lly < You.Inventory.length; lly++) {
							if (Items[You.Inventory[lly]].name == command[1]) {
								if (You.Inventory[lly] !== You.Primary) {
									Engine.Print("You drop the " + Items[You.Inventory[lly]].name);
									Areas[You.Loc].items.push(You.Inventory[lly]);
									You.Inventory.splice(lly,1); //dropped
								} else {
									Engine.Print("That's still equipped");
								}
							}
						}
					} else {
						Engine.Print("Take what...?");
					}
					break;
					
				/** read an item **/
				case "r": case "read":
					if (command.length > 1) {
						for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
							if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
								if (Objects[Areas[You.Loc].objects[lo]].read.length > 0) {
									Engine.Print("It reads '" + Objects[Areas[You.Loc].objects[lo]].read + "'");
								} else {
									Engine.Print("You can't read that!");
								}
							}
						}
					} else {
						Engine.Print("Read what...?");
					}
					break;
			
				/** open object **/
				case "o": case "open":
					if (command.length > 1) {
						for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
							if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
								if (Objects[Areas[You.Loc].objects[lo]].open > -1) {
									Objects[Areas[You.Loc].objects[lo]].open = 1;
									Engine.Print("Opened " + Objects[Areas[You.Loc].objects[lo]].name);
								} else {
									Engine.Print("You can't open that!");
								}
							}
						}
					} else {
						Engine.Print("Open what...?");
					}
					break;
					
				/** close object **/
				case "c": case "close":
					if (command.length > 1) {
						for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
							if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
								if (Objects[Areas[You.Loc].objects[lo]].open > -1) {
									Objects[Areas[You.Loc].objects[lo]].open = 0;
									Engine.Print("Closed " + Objects[Areas[You.Loc].objects[lo]].name);
								} else {
									Engine.Print("You can't close that!");
								}
							}
						}
					} else {
						Engine.Print("Close what...?");
					}
					break;
					
				/** look at something **/
				case "l": case "look":
					if (command.length > 1) { //if the user specified something to look at...
						/** nothing is specified, look at room **/
						for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
							if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
								Engine.Print(Objects[Areas[You.Loc].objects[lo]].description);
								if (Objects[Areas[You.Loc].objects[lo]].open == 1) {
									//is target object open
									for (var li = 0; li < Objects[Areas[You.Loc].objects[lo]].items.length; li++) {
										Engine.Print(Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name);
									}
								} else if (Objects[Areas[You.Loc].objects[lo]].open == 0) {
									//is target object closed
									Engine.Print(Objects[Areas[You.Loc].objects[lo]].name + " is closed");
								} else {
									//no open/close option
									if (Objects[Areas[You.Loc].objects[lo]].items.length > 0) {
										Engine.Print("Inside the " + Objects[Areas[You.Loc].objects[lo]].name + ":");
										for (var li = 0; li < Objects[Areas[You.Loc].objects[lo]].items.length; li++) {
											Engine.Print("" + Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name);
										}									
									}
								}
							}
						}
						for (var lli = 0; lli < Areas[You.Loc].items.length; lli++) {
							if (Items[Areas[You.Loc].items[lli]].name == command[1]) {
								Engine.Print(Items[Areas[You.Loc].items[lli]].description);
							}
						}
						for (var llc = 0; llc < Areas[You.Loc].clothes.length; llc++) {
							if (Clothes[Areas[You.Loc].clothes[llc]].name == command[1]) {
								Engine.Print(Clothes[Areas[You.Loc].clothes[llc]].description);
							}
						}
						
						//one-off commands
						//this describes all zombies in the area
						if (command[1] == "out") {
							for (var lzz = 0; lzz < Zeds.length; lzz++) {
								if (Zeds[lzz].loc == You.Loc) {
									Engine.Print(Zeds[lzz].name + ": " + Zeds[lzz].description);
								}
							}
						}
						
						/** look at yourself to see your status **/
						if (command[1] == "me") {
							if (You.HP >= 25 && You.HP > 15) {
								Engine.Print("you're looking healthy");
							} else if (You.HP < 15 && You.HP >= 10) {
								Engine.Print("you're looking ok");
							} else if (You.HP < 10 && You.HP > 7) {
								Engine.Print("you're looking worn");
							} else if (You.HP <= 7 && You.HP > 5) {
								Engine.Print("you're looking rough");
							} else if (You.HP == 5) {
								Engine.Print("you need help now!");
							} else if (You.HP < 5 && You.HP > 3) {
								Engine.Print("you need medical attention");
							} else if (You.HP < 3) {
								Engine.Print("you look like death");
							}
							
							Engine.Print("You're wearing");
							Engine.Print(Clothes[You.Clothing.Top].name + ", " + Clothes[You.Clothing.Bottom].name);
							
							if (You.Primary !== null) {
								Engine.Print("You are holding a " + Items[You.Primary].name);
							} else {
								Engine.Print("You are unarmed");
							}
						}
					} else { //nothing to look at, show room
						$('#display').html('');
						var l = "<title>" + Areas[You.Loc].name + "</title><desc>" + Areas[You.Loc].description + "</desc>";
						if (Areas[You.Loc].objects.length > 0) {
							l += "<objects>";
							l += "<br /><b>Objects also in this area:</b><br />";
							for (var o = 0; o < Areas[You.Loc].objects.length; o++) {
								l += Objects[Areas[You.Loc].objects[o]].name + "<br />";
							}
							l += "</objects>";
						}
						if (Areas[You.Loc].items.length > 0) {
							l += "<items><b>Items:</b><br />";
							for (var io = 0; io < Areas[You.Loc].items.length; io++) {
								l += Items[Areas[You.Loc].items[io]].name + "<br />";
							}
						}
						l += "</items>";
						if (Areas[You.Loc].clothes.length > 0) {
							l += "<clothes><b>Clothes:</b><br />";
							for (var ic = 0; ic < Areas[You.Loc].clothes.length; ic++) {
								l += Clothes[Areas[You.Loc].clothes[ic]].name + "<br />";
							}
							l += "</clothes>";
						}
						
						for (var z = 0; z < Zeds.length; z++) {
							if (Zeds[z].loc == You.Loc) {
								l += "<zeds>" + Zeds[z].name + "</zeds>";
							}
						}
						
						l += "<exits>Exits:<br />";
						if (Areas[You.Loc].n > -1) {
							l += "(N)orth to " + Areas[Areas[You.Loc].n].name + ", ";
						}
						if (Areas[You.Loc].s > -1) {
							l += "(S)outh to " + Areas[Areas[You.Loc].s].name + ", ";
						}
						if (Areas[You.Loc].e > -1) {
							l += "(E)ast to " + Areas[Areas[You.Loc].e].name + ", ";
						}
						if (Areas[You.Loc].w > -1) {
							l += "(W)est to " + Areas[Areas[You.Loc].w].name + ", ";
						}
						l += "</exits>";
						
						Engine.Print(l);
					}
					break;
					
				/** clear console **/
				case "clear":
					$('#display').html('');
					Engine.Command("l");
					break;
				
				/** default response **/
				default:
					Engine.Print("I don't understand...");
					break;
			}
			
			Engine.Score(); //score on every command
			
			$('#display').animate({
				scrollTop: 99999999
			}, 350);
		}
	},
	
	/** score function based on kills and inventory items **/
	Score: function() {
		var score = 0;
		for (var s = 0; s < You.Inventory.length; s++) {
			score += Items[You.Inventory[s]].score;
		}
		score += (You.Kills * 10);
		$('#score').html("Score: " + score);
	},
	
	/** move each of the zombies **/
	MoveZeds: function() {
		for (var z = 0; z < Zeds.length; z++) {
			var c = Math.floor(Math.random() * 100);
			if (c < 15 && Zeds[z].loc > 0) { //wander down a room id 15%
				if (Zeds[z].loc == You.Loc) {
					Engine.Print(Zeds[z].name + " wanders off...");
				}
				Zeds[z].loc--;
				if (Zeds[z].loc == You.Loc) {
					Engine.Print(Zeds[z].name + " wandered in...");
				}
			} else if (c >= 15 && c <= 30 && Zeds[z].loc < Areas.length) {//wander up a room id 15%
				if (Zeds[z].loc == You.Loc) {
					Engine.Print(Zeds[z].name + " wanders off...");
				}
				Zeds[z].loc++;
				if (Zeds[z].loc == You.Loc) {
					Engine.Print(Zeds[z].name + " wandered in...");
				}
			} else if (c >= 30 && c <= 75 && Zeds[z].loc < Areas.length) { //attack user 45%
				if (Zeds[z].loc == You.Loc) { //you and zombie are in the same place
					You.HP -= Zeds[z].damage;
					Engine.Print(Zeds[z].name + " hits you for " + Zeds[z].damage);
					Engine.CheckHealth();
				}
			}
			$('#display').animate({
				scrollTop: 99999999
			}, 350);
		}
	},
	
	/** check user health and play automated zombie-like actions when dead **/
	CheckHealth: function() {
		if (You.HP <= 0) {
			Areas = [];
			$('#display').html("");
			Engine.Print("You are dead.");
			clearInterval(Engine.NPCTimer);
			Engine.NPCTimer = null;
			setTimeout(function() {
				Engine.Print("Your body gets up off the ground");
				setInterval(function() {
					var d = Math.floor(Math.random() * 100);
					if (d >= 0 && d < 50) {
						Engine.Print("You stumble around");
					} else if (d >= 50&& d < 75) {
						Engine.Print("You moan");
					} else if (d >= 75 && d < 90) {
						Engine.Print("You eat");
					} else {
						Engine.Print("You scream");
					}
					$('#display').animate({
						scrollTop: 99999999
					}, 350);
				}, 2000);
				$('#display').animate({
					scrollTop: 99999999
				}, 350);
			}, 2000);
			$('#display').animate({
				scrollTop: 99999999
			}, 350);
		}
	},
	
	/** print text on display **/
	Print: function(text) {
		$('#display').append("<li>" + text + "</li>");
	},
	
	/** initialise the zombies **/
	StartNPCs: function() {
		for (var nz = 0; nz < Engine.NPCCount; nz++) {
			var whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
			if (whichArea < 2) {
				whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
				if (whichArea < 2) {
					whichArea = 1;
				}
			}
			Zeds.push({
				id: nz,
				name: zName(),
				alias: "wz" + nz,
				description: zDesc(),
				HP: Math.floor(Math.random() * 10) + 5,
				damage: Math.floor(Math.random() * 3) + 2,
				loc: whichArea
			});
		}
		/** start the npc movement timer **/
		Engine.NPCTimer = setInterval(function() {
			Engine.MoveZeds();
		}, Engine.NPCInt);
	},
	
	/** start the game **/
	Init: function() {
		Engine.StartNPCs();
		Engine.Command("l");
		$('#cmd').focus();
	}
};

//EVENTS
$('.theme').on('click', function() { //theme click
	var t = $(this).attr('name');
	$('#theme').attr('href',t+'.css');
});
$('.clickCommand').on('click', function() { //clicked on command in the table on the page
	var tCommand = $(this).attr("name");
	$('#cmd').val(tCommand);
	if (tCommand.indexOf("something") < 0) {
		Engine.Command(tCommand);
	}
});
$('#cmd').on('keyup', function(k) { //pressed enter
	if (k.keyCode === 13) {
		Engine.Command($(this).val());
	}
});
$('#display').on('click', function() { //focus on command line on click of display
	$('#cmd').focus();
});

/** LETS GO! **/
window.onload = Engine.Init;