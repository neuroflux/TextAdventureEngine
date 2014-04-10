/**
	This file holds ALL of the main engine functions.
	The "OPTIONS" section at the top of this file gives you access to chance some variables
	such as number of enemies and number of survivors etc
**/

var Engine = {
	
	/** OPTIONS **/
	NPCCount: 1,  //how many zombies?
	SurvivorCount: 1, //how many survivors?
	NPCTime: 30000, //how long per zombie move (30secs)?
	HungerTime: 60000, //how long per hunger (60secs)?


	/** INTEGERAL GAME CODE **/
	NPCTimer: null,
	NPCCountDown: 30,
	LOCKED: false,
	FirstRun: true,
	HungerTimer: null,
	GameStarted: false,
	SelectedMap: "",
	AnimationsEnabled: true,
	ScrollTo: function(px) {		
		$('#display').animate({
			scrollTop: px + "px"
		}, 100);
	},
	Command: function(c) {
		if (Engine.LOCKED == true) {
			Engine.Print("you have to wait for the action to complete");
			Engine.ScrollTo(9999999);
		} else {
			if (Engine.GameStarted == true) {
				if (c.length > 0) {
					var command = c.split(" ");
					for (var c = 0; c < command.length; c++) {
						if (command[c] == "at" || command[c] == "in" || command[c] == "on") {
							command.splice(c,1);
						}
					}
					if (command.length > 2) {
						command[1] = command[1] + " " + command[2];
					}
					$('#cmd').val('');
					var thisCommand = command[0];
					thisCommand = thisCommand.toLowerCase();
					switch(thisCommand) {
						case "suicide": case "kill myself":
							Engine.Print("you sit on the floor, waiting for the zombies");
							setTimeout(function() {
								You.HP = 0;
								Engine.Print("you are attacked and killed by zombies");
								Engine.CheckHealth();
							}, 5000);
							break;
						case "shout":
							var greetings = [
								"HELLO!?",
								"ANYONE THERE?!",
								"OI!",
								"HELP!",
								"COME ON BITCHES!",
								"COME GET SOME!"
							];
							var hello = Math.floor(Math.random() * 100);
							if (hello > 75) {
								Zeds.push({
									id: Zeds.length + 1,
									name: zName(),
									alias: "wz" + Zeds.length + 1,
									description: zDesc(),
									HP: Math.floor(Math.random() * 10) + 5,
									damage: Math.floor(Math.random() * 3) + 2,
									loc: You.Loc
								});
								Engine.Print("you shout '" + greetings[Math.floor(Math.random() * greetings.length)] + "'");
								Engine.Print("<span class='red'>you alerted " + Zeds[Zeds.length - 1].name + "!</span>");
							} else {
								Engine.Print("you shout '" + greetings[Math.floor(Math.random() * greetings.length)] + "'");
							}
							break;
						case "taunt":
							var taunts = [
								"You stick your fingers up",
								"You poke your tongue out",
								"You moon"
							];
							Engine.Print(taunts[Math.floor(Math.random() * taunts.length)]);
							break;
							break;
						case "dance":
							var dances = [
								"You do a little jig",
								"You tap dance a little",
								"You spin around and pose"
							];
							Engine.Print(dances[Math.floor(Math.random() * dances.length)]);
							break;
						case "i": case "inventory":
							var ll = "";
							if (You.FoodInventory.length > 0 || You.Inventory.length > 0 || You.barricades.length > 0) {
								ll = "You're carrying:<br />";
							} else {
								ll = ("You aren't carrying anything...");
							}
							if (You.FoodInventory.length > 0) {
								for (var llf = 0; llf < You.FoodInventory.length; llf++) {
									ll += "&nbsp;&nbsp;&nbsp;" + Food[You.FoodInventory[llf]].name;
								}
							}
							if (You.Inventory.length > 0) {
								for (var lly = 0; lly < You.Inventory.length; lly++) {
									ll += "&nbsp;&nbsp;&nbsp;" + Items[You.Inventory[lly]].name;
								}
							}
							for (var llb = 0; llb < You.barricades.length; llb++) {
								ll += "&nbsp;&nbsp;&nbsp;" + Barricades[You.barricades[llb]].name;
							}
							Engine.Print(ll);
							break;
						case "n": case "north":
							if (Areas[You.Loc].n > -1) {
								You.Loc = Areas[You.Loc].n;
								Engine.Command("l");
							} else {
								Engine.Print("You can't go that way");
							}
							break;
						case "s": case "south":
							if (Areas[You.Loc].s > -1) {
								You.Loc = Areas[You.Loc].s;
								Engine.Command("l");
							} else {
								Engine.Print("You can't go that way");
							}
							break;
						case "e": case "east":
							if (Areas[You.Loc].e > -1) {
								You.Loc = Areas[You.Loc].e;
								Engine.Command("l");
							} else {
								Engine.Print("You can't go that way");
							}
							break;
						case "w": case "west":
							if (Areas[You.Loc].w > -1) {
								You.Loc = Areas[You.Loc].w;
								Engine.Command("l");
							} else {
								Engine.Print("You can't go that way");
							}
							break;
						case "u": case "up":
							if (Areas[You.Loc].u > -1) {
								You.Loc = Areas[You.Loc].u;
								Engine.Command("l");
							} else {
								Engine.Print("You can't go that way");
							}
							break;
						case "d": case "d":
							if (Areas[You.Loc].d > -1) {
								You.Loc = Areas[You.Loc].d;
								Engine.Command("l");
							} else {
								Engine.Print("You can't go that way");
							}
							break;
						case "m": case "map":
							if (Engine.SelectedMap.length > 1) {
								window.open("maps/" + Engine.SelectedMap + ".html");
							}
							break;
						case "smell":
							Engine.Print(Areas[You.Loc].smell);
							break;
						case "e": case "eat":
							var eaten = false;
							for (var llf = 0; llf < You.FoodInventory.length; llf++) {
								if (Food[You.FoodInventory[llf]].name == command[1]) {
									if (You.Hunger > 0) {
										var fName = Food[You.FoodInventory[llf]].name;
										You.Hunger -= Food[You.FoodInventory[llf]].hunger;
										$('#hunger').html('Hunger: ' + You.Hunger + '%')
										You.Eaten++;
										Engine.Score();
										Areas[You.Loc].food.splice(llf,1); //food respawn
										var a = Math.floor(Math.random() * Areas.length);
										var f = Math.floor(Math.random() * Food.length);
										Areas[a].food.push(f);
										Engine.Print("eaten " + fName);
										eaten = true;
										$('#hungerLevel').animate({
											height: You.Hunger,
											marginTop: 100 - You.Hunger
										}, 350);
									} else {
										Engine.Print("you're already full");
										eaten = true;
									}
								}
							}
							if (eaten === false) {
								Engine.Print("You can't eat that!");
							}
							break;
						case "barricade":
							var barricaded = false;
							if (command.length > 1) {
								if (Areas[You.Loc].z < 1) {
									for (var llb = 0; llb < You.barricades.length; llb++) {
										if (Barricades[You.barricades[llb]].name == command[1]) {
											Engine.LOCKED = true;
											Engine.BarricadeAnim();
											Engine.Print("you start barricading this area with " + Barricades[You.barricades[llb]].name);
											Engine.Print("This area will be safe once clear of Zombies!");
											Areas[You.Loc].z = Barricades[You.barricades[llb]].hp;
											You.barricades.splice(llb,1); //dropped
											barricaded = true;
											setTimeout(function() {
												Engine.Print("finished barricading");
												Engine.LOCKED = false;
												clearInterval(Engine.BarricadingTimer);
												$('.barricadeAnim').animate({
													opacity: 0
												}, 350, function() {
													$(this).remove();
												});
												t = null;
												Engine.ScrollTo(9999999);
											}, 2000 - (You.STR * 500));
										}
									}
								} else {
									Engine.Print("this area is already barricaded");
									barricaded = true;
								}
							} else {
								Engine.Print("Barricade with what...?");
							}
							if (barricaded == false) {
								Engine.Print("You can't barricade this area with that!");
							}
							break;
						case "equip":
							var equipped = false;
							if (command.length > 1) {
								for (var lly = 0; lly < You.Inventory.length; lly++) {
									if (Items[You.Inventory[lly]].name == command[1]) {
										You.Primary = Items[You.Inventory[lly]].id;
										Engine.Print("You equip yourself with the " + Items[You.Inventory[lly]].name);
										if (Items[You.Inventory[lly]].damage.max < 1) {
											Engine.Print("...it's not going to do much damage...");
										}
										equipped = true;
									}
								}
							} else {
								Engine.Print("Equip nothing...?");
							}
							if (equipped === false) {
								Engine.Print("You can't equip that!");
							}
							break;
						case "unequip":
							if (You.Primary !== null) {
								Engine.Print("You lower your " + Items[You.Primary].name);
								You.Primary = null;
							} else {
								Engine.Print("You can't unequip your hands!");
							}
							break;
						case "a": case "attack": case "punch": case "kick":
							var foundZed = false;
							for (var z = 0; z < Zeds.length; z++) {
								Engine.LOCKED = true;
								if (Zeds[z].loc == You.Loc) {
									if (You.Primary !== null) {
										var beingHit = Math.floor(Math.random() * Items[You.Primary].damage.max) + Items[You.Primary].damage.min;
										Engine.Print("<span class='green'>You attack with your " + Items[You.Primary].name + " for <b>" + beingHit + "</b> damage</span>");
										var didYouHit = Math.floor(Math.random() * 100);
										if (didYouHit <= (Items[You.Primary].accuracy + (You.ACC * 2))) {
											var headShot = Math.floor(Math.random() * 100) + (You.ACC * 2);
											if (headShot > 97) {
												var zNamed = Zeds[z].name;
												Zeds.splice(z,1);
												You.Kills++;
												$('#kil').html(You.Kills);
												You.EXP += 5;
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
												Engine.AttackAnim();
												Engine.Print("You killed " + zNamed + " with a headshot!");
												Engine.BloodSplatter(150, true, 500);
											} else {
												Zeds[z].HP -= beingHit;
												if (Math.floor(Math.random() * 100) > 50) {
													You.HP -= Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour);
													Engine.Print("<span class='red'>You got hit for " + (Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour)) + "</span>");
													Engine.CheckHealth();
													Engine.BloodSplatter(75, true, 50);
												}
												if (Zeds[z].HP <= 0) {
													var zNamed = Zeds[z].name;
													Zeds.splice(z,1);
													You.Kills++;
													$('#kil').html(You.Kills);
													You.EXP += 5;
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
													Engine.AttackAnim();
													Engine.Print("You killed the " + zNamed + "!");
													Engine.BloodSplatter(150, true, 500);
												} else {
													Engine.AttackAnim();
												}
											}
										} else {
											Engine.Print("You miss!");
										}
										Engine.ScrollTo(9999999);
									} else {
										var beingHit = Math.floor(Math.random() * 2);
										Engine.Print("<span class='green'>You attack with your bare hands for <b>"+beingHit+"</b> damage</span>");
										Zeds[z].HP -= beingHit;
										if (Math.floor(Math.random() * 100) > 35) {
											You.HP -= Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour);
											Engine.Print("<span class='red'>You got hit for " + (Zeds[z].damage - (Clothes[You.Clothing.Top].armour) - (Clothes[You.Clothing.Bottom].armour)) + "</span>");
											Engine.CheckHealth();
											Engine.BloodSplatter(75, true, 50);
										}
										if (Zeds[z].HP <= 0) {
											var zNamed = Zeds[z].name;
											Zeds.splice(z,1);
											You.Kills++; 
											$('#kil').html(You.Kills);
											You.EXP += 5;
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
											Engine.AttackAnim();
											Engine.Print("You killed the " + zNamed + "!");
											Engine.BloodSplatter(150, true, 500);
										} else {
											Engine.AttackAnim();
										}
									}
									foundZed = true;
									Engine.Print("finishing attack");
									setTimeout(function() {
										Engine.LOCKED = false;
										//$('#actioning').hide();
										Engine.Print("you finish attacking");
										Engine.CheckEXP();
										Engine.ScrollTo(9999999);
									}, Math.floor(2000 - (500 * You.SPD)));
									return false;
								}
								Engine.ScrollTo(9999999);
							}
							if (foundZed === false) {
								var r = Math.floor(Math.random() * 3);
								switch(r) {
									case 0:
										Engine.Print("You attack nothing in particular");
										break;
									case 1:
										Engine.Print("You wildly swing at nothing");
										break;
									case 2:
										Engine.Print("You lunge to attack but realise nothing is there");
										break;
									default:
										break;
								}
								Engine.LOCKED = false;
								Engine.ScrollTo(9999999);
							}
							break;
						case "t": case "take":
							if (command.length > 1) {
								if ((You.Inventory.length + You.FoodInventory.length) >= (You.STR * 3)) {
									Engine.Print("You are carrying too much - (" + (You.STR * 3) + ") item limit!");
								} else {
									var foundItem = false; //traverse areas and get items
									var aliases = "";
									for (var lli = 0; lli < Areas[You.Loc].items.length; lli++) {
										if (Items[Areas[You.Loc].items[lli]].name == command[1]) {
											Engine.Print("You take the " + Items[Areas[You.Loc].items[lli]].name);
											You.Inventory.push(Items[Areas[You.Loc].items[lli]].id);
											Areas[You.Loc].items.splice(lli,1); //picked up
											foundItem = true;
										}
										if (foundItem == false) {
											aliases = Items[Areas[You.Loc].items[lli]].alias.split(",");
											for (var lli2 = 0; lli2 < aliases.length; lli2++) {
												if (command[1] == aliases[lli2]) {
													foundItem = true;
													Engine.Print("You take the " + Items[Areas[You.Loc].items[lli2]].name);
													You.Inventory.push(Items[Areas[You.Loc].items[lli2]].id);
													Areas[You.Loc].items.splice(lli2,1); //picked up
												}
											}
										}
									} //traverse areas and get food
									for (var lli = 0; lli < Areas[You.Loc].food.length; lli++) {
										if (Food[Areas[You.Loc].food[lli]].name == command[1]) {
											Engine.Print("You take the " + Food[Areas[You.Loc].food[lli]].name);
											You.FoodInventory.push(Food[Areas[You.Loc].food[lli]].id);
											Areas[You.Loc].food.splice(lli,1); //picked up
											foundItem = true;
										}
										if (foundItem == false) {
											aliases = Food[Areas[You.Loc].food[lli]].alias.split(",");
											for (var lli2 = 0; lli2 < aliases.length; lli2++) {
												if (command[1] == aliases[lli2]) {
													foundItem = true;
													Engine.Print("You take the " + Food[Areas[You.Loc].food[lli2]].name);
													You.Inventory.push(Food[Areas[You.Loc].food[lli2]].id);
													Areas[You.Loc].food.splice(lli,1); //picked up
												}
											}
										}
									} //traverse areas and get barricades
									for (var llb = 0; llb < Areas[You.Loc].barricades.length; llb++) {
										if (Barricades[Areas[You.Loc].barricades[llb]].name == command[1]) {
											Engine.Print("You take the " + Barricades[Areas[You.Loc].barricades[llb]].name);
											You.barricades.push(Barricades[Areas[You.Loc].barricades[llb]].id);
											Areas[You.Loc].barricades.splice(llb,1); //picked up
											foundItem = true;
										}
										if (foundItem == false) {
											aliases = Barricades[Areas[You.Loc].barricades[llb]].alias.split(",");
											for (var lli2 = 0; lli2 < aliases.length; lli2++) {
												if (command[1] == aliases[lli2]) {
													foundItem = true;
													Engine.Print("You take the " + Barricades[Areas[You.Loc].barricades[lli2]].name);
													You.Inventory.push(Barricades[Areas[You.Loc].barricades[lli2]].id);
													Areas[You.Loc].barricades.splice(lli2,1); //picked up
												}
											}
										}
									} //traverse objects and get items
									for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
										if (Objects[Areas[You.Loc].objects[lo]].open == 1) {
											//open
											for (var li = 0; li < Objects[Areas[You.Loc].objects[lo]].items.length; li++) {
												if (Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name == command[1]) {
													Engine.Print("You take the " + Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name);
													You.Inventory.push(Items[Objects[Areas[You.Loc].objects[lo]].items[li]].id);
													Objects[Areas[You.Loc].objects[lo]].items.splice(li,1); //picked up
													foundItem = true;
												}
											}
										}
									}
									if (foundItem === false) {
										Engine.Print("You can't take that!");
									}
								}
							} else {
								Engine.Print("Take what...?");
								foundItem = false;
							}
							break;
						case "wear":
							var wornItem = false;
							for (var llc = 0; llc < Areas[You.Loc].clothes.length; llc++) { //traverse areas and get clothes
								if (Clothes[Areas[You.Loc].clothes[llc]].name == command[1]) {
									if (Clothes[Areas[You.Loc].clothes[llc]].where == "top") { //top
										Areas[You.Loc].clothes.push(You.Clothing.Top);
										You.Clothing.Top = Areas[You.Loc].clothes[llc];
										Engine.Print("You put on the " + Clothes[Areas[You.Loc].clothes[llc]].name);
										Areas[You.Loc].clothes.splice(llc,1);
										wornItem = true;
									} else { //bottom
										Areas[You.Loc].clothes.push(You.Clothing.Bottom);
										You.Clothing.Bottom = Areas[You.Loc].clothes[llc];
										Engine.Print("You put on the " + Clothes[Areas[You.Loc].clothes[llc]].name);
										Areas[You.Loc].clothes.splice(llc,1);
										wornItem = true;
									}
								}
							}
							if (wornItem === false) {
								Engine.Print("You can't wear that!");
							}
							break;
						case "talk":
							var sCount = 0;
							var wS;
							for (var s = 0; s < Survivors.length; s++) {
								if (Survivors[s].loc == You.Loc) {
									sCount++;
									wS = s;
								}
							}
							if (sCount == 1) { //one
								Engine.Print(Survivors[wS].name + " says '" + ChitChat[Math.floor(Math.random() * ChitChat.length)] + "'");
							} else if (sCount == 0) { //none
								Engine.Print("there is no one to talk to");
							} else { //many
								Engine.Print(ChitChat[Math.floor(Math.random() * ChitChat.length)]);
							}
							break;
						case "g": case "give":
							var given = false;
							if (command.length > 1) {
								for (var lly = 0; lly < You.Inventory.length; lly++) { //items
									if (Items[You.Inventory[lly]].name == command[1]) {
										if (You.Inventory[lly] !== You.Primary) {
											for (var s = 0; s < Survivors.length; s++) {
												if (Survivors[s].needs == You.Inventory[lly] && Survivors[s].loc == You.Loc) {
													var sName = Survivors[s].name;
													Engine.Print("You give your " + Items[You.Inventory[lly]].name + " to " + sName);
													You.SavedSurvivors++;
													Survivors.splice(s,1); //remove survivor
													You.Inventory.splice(lly,1); //given away
													Engine.Score();
													Engine.Print("<span class='green'>" + sName + " gets to safety!</span>");
													given = true;
												}
											}
										} else {
											Engine.Print("That's still equipped");
											given = true;
										}
									}
								}
							} else {
								Engine.Print("You can't give nothing away");
								given = true;
							}
							if (given == false) {
								Engine.Print("No one needs that");
							}
							break;
						case "d": case "drop":
							var dropped = false;
							if (command.length > 1) {
								for (var lly = 0; lly < You.Inventory.length; lly++) { //items
									if (Items[You.Inventory[lly]].name == command[1]) {
										if (You.Inventory[lly] !== You.Primary) {
											Engine.Print("You drop the " + Items[You.Inventory[lly]].name);
											Areas[You.Loc].items.push(You.Inventory[lly]);
											You.Inventory.splice(lly,1); //dropped
											dropped = true;
										} else {
											Engine.Print("That's still equipped");
											dropped = true;
										}
									}
								}
								for (var lly = 0; lly < You.FoodInventory.length; lly++) { //food
									if (Food[You.FoodInventory[lly]].name == command[1]) {
										if (You.FoodInventory[lly] !== You.Primary) {
											Engine.Print("You drop the " + Food[You.FoodInventory[lly]].name);
											Areas[You.Loc].food.push(You.FoodInventory[lly]);
											You.FoodInventory.splice(lly,1); //dropped
											dropped = true;
										} else {
											Engine.Print("That's still equipped");
											dropped = true;
										}
									}
								}
								for (var lly = 0; lly < You.barricades.length; lly++) { //barricades
									if (Barricades[You.barricades[lly]].name == command[1]) {
										if (You.barricades[lly] !== You.Primary) {
											Engine.Print("You drop the " + Barricades[You.barricades[lly]].name);
											Areas[You.Loc].barricades.push(You.barricades[lly]);
											You.barricades.splice(lly,1); //dropped
											dropped = true;
										} else {
											Engine.Print("That's still equipped");
											dropped = true;
										}
									}
								}
							} else {
								Engine.Print("Drop what...?");
								dropped = true;
							}
							if (dropped === false) {
								Engine.Print("You can't drop that!");
							}
							break;
						case "r": case "read":
							var read = false;
							if (command.length > 1) {
								for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
									if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
										if (Objects[Areas[You.Loc].objects[lo]].read.length > 1) {
											Engine.Print("It reads '" + Objects[Areas[You.Loc].objects[lo]].read + "'");
											read = true;
										} else {
											Engine.Print("You can't read that!");
											read = true;
										}
									}
								}
							} else {
								Engine.Print("Read what...?");
								read = true;
							}
							if (read === false) {
								Engine.Print("You can't read that!");
							}
							break;
						case "f": case "force":
							var forced = false;
							if (command.length > 1) {
								var calced = Math.floor(Math.floor(20000 - (You.STR * 1000)));
								for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
									if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
										if (Objects[Areas[You.Loc].objects[lo]].open > -1) {
											if (Objects[Areas[You.Loc].objects[lo]].locked == true) {
												Engine.ForceAnim();
												Engine.Print("forcing lock - (" + (calced / 100) + " secs)");
												Engine.Print("<span class='force'></span>");
												Engine.LOCKED = true;
												forced = true;
												var lName = Objects[Areas[You.Loc].objects[lo]].name;
												var lIndex = lo;
												var t = setInterval(function() {
													var fo = [
														"you hit the lock",
														"you kick the lock",
														"you pry the lock",
														"you try to pick the lock"
													];
													$('.force').html(fo[Math.floor(Math.random() * fo.length)]);
													Engine.ScrollTo(9999999);
												}, 2000);
												setTimeout(function() {
													Objects[Areas[You.Loc].objects[lIndex]].locked = false;
													Engine.LOCKED = false;
													Engine.Print("the lock on the " + lName + " pops open");
													clearInterval(t);
													clearInterval(Engine.ForcingTimer);
													$('.forceAnim').animate({
														opacity: 0
													}, 350, function() {
														$(this).remove();
													});
													t = null;
													Engine.ScrollTo(9999999);
												}, calced);
											} else {
												Engine.Print("that's already open");
												forced = true;
											}
										}
									}
								}
							} else {
								Engine.Print("force what lock...?");
								forced = true;
							}
							if (forced === false) {
								Engine.Print("you can't force that!");
							}
							break;
						case "o": case "open":
							var opened = false;
							if (command.length > 1) {
								for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
									if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
										if (Objects[Areas[You.Loc].objects[lo]].open > -1) {
											if (Objects[Areas[You.Loc].objects[lo]].locked == true) {
												Engine.Print("the " + Objects[Areas[You.Loc].objects[lo]].name + " is locked");
											} else {
												Objects[Areas[You.Loc].objects[lo]].open = 1;
												Engine.Print("Opened " + Objects[Areas[You.Loc].objects[lo]].name);
												opened = true;
											}
										} else {
											Engine.Print("You can't open that!");
										}
									}
								}
							} else {
								Engine.Print("Open what...?");
								opened = true;
							}
							if (opened === false) {
								Engine.Print("You can't open that!");
							}
							break;
						case "c": case "close":
							var closed = false;
							if (command.length > 1) {
								for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
									if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
										if (Objects[Areas[You.Loc].objects[lo]].open > -1) {
											Objects[Areas[You.Loc].objects[lo]].open = 0;
											Engine.Print("Closed " + Objects[Areas[You.Loc].objects[lo]].name);
											closed = true;
										} else {
											Engine.Print("You can't close that!");
											closed = true;
										}
									}
								}
							} else {
								Engine.Print("Close what...?");
								closed = true;
							}
							if (closed === false) {
								Engine.Print("You can't close that!");
							}
							break;
						case "l": case "look":
							var foundItem = false;
							if (command.length > 1) {
								for (var lo = 0; lo < Areas[You.Loc].objects.length; lo++) {
									if (Objects[Areas[You.Loc].objects[lo]].name == command[1]) {
										Engine.Print(Objects[Areas[You.Loc].objects[lo]].description);
										if (Objects[Areas[You.Loc].objects[lo]].open == 1) { //open
											for (var li = 0; li < Objects[Areas[You.Loc].objects[lo]].items.length; li++) {
												foundItem = true;
												Engine.Print(Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name);
											}
										} else if (Objects[Areas[You.Loc].objects[lo]].open == 0) { //closed
											foundItem = true;
											Engine.Print(Objects[Areas[You.Loc].objects[lo]].name + " is closed");
										} else { //no open/close option
											if (Objects[Areas[You.Loc].objects[lo]].items.length > 0) {
												Engine.Print("Inside the " + Objects[Areas[You.Loc].objects[lo]].name + ":");
												for (var li = 0; li < Objects[Areas[You.Loc].objects[lo]].items.length; li++) {
													foundItem = true;
													Engine.Print("" + Items[Objects[Areas[You.Loc].objects[lo]].items[li]].name);
												}									
											}
										}
										return false;
									}
								}
								for (var lli = 0; lli < Areas[You.Loc].items.length; lli++) {
									if (Items[Areas[You.Loc].items[lli]].name == command[1]) {
										foundItem = true;
										Engine.Print(Items[Areas[You.Loc].items[lli]].description);
									}
									var aliases = Items[Areas[You.Loc].items[lli]].alias.split(",");
									for (var lli2 = 0; lli2 < aliases.length; lli2++) {
										if (command[1] == aliases[lli2]) {
											foundItem = true;
											Engine.Print(Items[Areas[You.Loc].items[lli2]].description);
										}
									}
								}
								for (var llb = 0; llb < Areas[You.Loc].barricades.length; llb++) {
									if (Barricades[Areas[You.Loc].barricades[llb]].name == command[1]) {
										foundItem = true;
										Engine.Print(Barricades[Areas[You.Loc].barricades[llb]].description);
									}
									var aliases = Barricades[Areas[You.Loc].barricades[llb]].alias.split(",");
									for (var lli3 = 0; lli3 < aliases.length; lli3++) {
										if (command[1] == aliases[lli3]) {
											foundItem = true;
											Engine.Print(Barricades[Areas[You.Loc].barricades[lli3]].description);
										}
									}
								}
								for (var llc = 0; llc < Areas[You.Loc].clothes.length; llc++) {
									if (Clothes[Areas[You.Loc].clothes[llc]].name == command[1]) {
										foundItem = true;
										Engine.Print(Clothes[Areas[You.Loc].clothes[llc]].description);
									}
									var aliases = Clothes[Areas[You.Loc].clothes[llc]].alias.split(",");
									for (var lli4 = 0; lli4 < aliases.length; lli4++) {
										if (command[1] == aliases[lli4]) {
											foundItem = true;
											Engine.Print(Clothes[Areas[You.Loc].clothes[lli4]].description);
										}
									}
								}
								for (var llf = 0; llf < Areas[You.Loc].food.length; llf++) {
									if (Food[Areas[You.Loc].food[llf]].name == command[1]) {
										foundItem = true;
										Engine.Print(Food[Areas[You.Loc].food[llf]].description);
									}
									var aliases = Food[Areas[You.Loc].food[llf]].alias.split(",");
									for (var lli5 = 0; lli5 < aliases.length; lli5++) {
										if (command[1] == aliases[lli5]) {
											foundItem = true;
											Engine.Print(Food[Areas[You.Loc].food[lli5]].description);
										}
									}
								}
								if (command[1] == "zombie" || command[1] == "z" || command[1] == "zeds") {
									for (var lzz = 0; lzz < Zeds.length; lzz++) {
										if (Zeds[lzz].loc == You.Loc) {
											foundItem = true;
											Engine.Print(Zeds[lzz].name + ": " + Zeds[lzz].description);
										}
									}
									if (foundItem == false) {
										Engine.Print("No zombies here");
										return false;
									}
								}
								if (command[1] == "me") {
									foundItem = true;
									if (You.HP >= 25 && You.HP > 15) {
										Engine.Print("you're looking healthy (" + You.HP + "hp)");
									} else if (You.HP < 15 && You.HP >= 10) {
										Engine.Print("you're looking ok (" + You.HP + "hp)");
									} else if (You.HP < 10 && You.HP > 7) {
										Engine.Print("you're looking worn (" + You.HP + "hp)");
									} else if (You.HP <= 7 && You.HP > 5) {
										Engine.Print("you're looking rough (" + You.HP + "hp)");
									} else if (You.HP == 5) {
										Engine.Print("you need help now! (" + You.HP + "hp)");
									} else if (You.HP < 5 && You.HP > 3) {
										Engine.Print("you need medical attention (" + You.HP + "hp)");
									} else if (You.HP < 3) {
										Engine.Print("you look like death (" + You.HP + "hp)");
									}
									Engine.Print("You're wearing <br />" + Clothes[You.Clothing.Top].name + " (" + Clothes[You.Clothing.Top].armour + " armour) <br /> " + Clothes[You.Clothing.Bottom].name + "(" + Clothes[You.Clothing.Bottom].armour + " Armour)");
									if (You.Primary !== null) {
										if (Items[You.Primary].damage.max >= 5) {
											Engine.Print("you look badass with your " + Items[You.Primary].name + " (" + Items[You.Primary].damage.max + ")");
										} else if (Items[You.Primary].damage.max == 0) {
											Engine.Print("You look a bit stupid holding your " + Items[You.Primary].name + " (" + Items[You.Primary].damage.max + ")");
										} else {
											Engine.Print("You are holding your " + Items[You.Primary].name + " (" + Items[You.Primary].damage.max + " Damage)");
										}
									} else {
										Engine.Print("You are unarmed (" + 1 + " Damage)");
									}
									Engine.Print("You can carry " + (You.STR * 3) + " items");
									Engine.Print("You've killed " + You.Kills + " zombies");
									Engine.Print("You've eaten " + You.Eaten + " items of food");
								}
								if (foundItem == false) {
									Engine.Print("You're trying to look at something that isn't there!");
								}
							} else {
								var bar = "";
								if (Areas[You.Loc].z > 0) {
									var classes = "";
									if (Areas[You.Loc].z < 10) {
										classes = "red"
									}
									bar = ': <span class=\"' + classes + '\" id=\"barricadePoints\">' + (Areas[You.Loc].z) + '</span> pts barricaded';
								}
								var l = "<div class='mainTitle'>" + Areas[You.Loc].name + " " + bar + "</div><desc>" + Areas[You.Loc].description + "</desc>";
								var itemList = {
									items: [],
									objects: [],
									barricades: [],
									clothes: [],
									food: []
								};
								if (Areas[You.Loc].objects.length > 0) {
									l += "<objects>";
									l += "<br /><b>Objects also in this area:</b><br />";
									for (var o = 0; o < Areas[You.Loc].objects.length; o++) {
										l += "<span>" + Objects[Areas[You.Loc].objects[o]].name + "</span><br />";
										itemList.objects.push(Areas[You.Loc].objects[o]);
									}
									l += "</objects>";
								}
								if (Areas[You.Loc].items.length > 0) {
									l += "<items><b>Items:</b><br />";
									for (var io = 0; io < Areas[You.Loc].items.length; io++) {
										l += "<span>" + Items[Areas[You.Loc].items[io]].name + "</span><br />";
										itemList.items.push(Areas[You.Loc].items[io]);
									}
								}
								l += "</items>";
								if (Areas[You.Loc].barricades.length > 0) {
									l += "<mats><b>Materials:</b><br />";
									for (var ib = 0; ib < Areas[You.Loc].barricades.length; ib++) {
										l += "<span>" + Barricades[Areas[You.Loc].barricades[ib]].name + "</span>[barricade]<br />";
										itemList.barricades.push(Areas[You.Loc].barricades[ib]);
									}
								}
								l += "</mats>";
								if (Areas[You.Loc].clothes.length > 0) {
									l += "<clothes><b>Clothes:</b><br />";
									for (var ic = 0; ic < Areas[You.Loc].clothes.length; ic++) {
										l += "<span>" + Clothes[Areas[You.Loc].clothes[ic]].name + "</span><br />";
										itemList.clothes.push(Areas[You.Loc].clothes[ic]);
									}
									l += "</clothes>";
								}
								if (Areas[You.Loc].food.length > 0) {
									l += "<food><b>Food:</b><br />";
									for (var iff = 0; iff < Areas[You.Loc].food.length; iff++) {
										l += "<span>" + Food[Areas[You.Loc].food[iff]].name + "</span><br />";
										itemList.food.push(Areas[You.Loc].food[iff]);
									}
									l += "</food>";
								}
								
								var sCount = 0;
								for (var s = 0; s < Survivors.length; s++) {
									if (Survivors[s].loc == You.Loc) {
										sCount++;
									}
								}
								if (sCount > 0) {
									l += "<survivor><b>Survivors:</b><br />";
									for (var s = 0; s < Survivors.length; s++) {
										if (Survivors[s].loc == You.Loc) {
											l += "<span>" + Survivors[s].name + " is looking for '" + Items[Survivors[s].needs].name + "'</span><br />";
										}
									}
									l += "</survivor>";
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
								if (Areas[You.Loc].u > -1) {
									l += "(U)p to " + Areas[Areas[You.Loc].u].name + ", ";
								}
								if (Areas[You.Loc].d > -1) {
									l += "(D)own to " + Areas[Areas[You.Loc].d].name + ", ";
								}
								l += "</exits>";
								Engine.Print(l); //re-initialise the clicking of interactables
								$('items span, objects span, food span, clothes span, mats span, survivors span').off('click');
								$('items span, objects span, food span, clothes span, mats span, survivors span').on('click', function() {
									var h = $(this).text();
									$('#cmd').val($('#cmd').val() + " " + h);
									return false;
								});
							}
							break;
						case "clear":
							$('#display').html('');
							break;
						default:
							Engine.Print("I don't understand...");
							break;
					}
					Engine.Score(); //score on every command
					Engine.ScrollTo(9999999);
				} else { /*unknown commands*/ }
			} else {
				switch(c) {
					case "1": case 1:
						Engine.GameStarted = true;
						Engine.LOCKED = false;
						var mapName = "TestArea";
						var strName = "TestArea - An Example";
						Areas = eval(mapName);
						Engine.Command("clear");
						Engine.Print("<center>Initialising '" + strName + "'...</center>");
						Engine.SelectedMap = mapName;
						setTimeout(function() {
							Engine.Print("<center>Starting game...</center>");
							setTimeout(function() {
								Engine.Command("clear");
								Engine.StartHunger();
								Engine.StartNPCs();
								Engine.Command("l");
							}, 1000);
						}, 1500);
						break;
					default:
						Engine.Print("Not a valid option, pick a number...");
						break;
				}
			}
		}
		$('#cmd').val('');
	},
	ForcingTimer: null,
	ForceAnim: function(weapon) {
		if (Engine.AnimationsEnabled == true) {
			$('#display').prepend("<img class='forceAnim' src='img/force.png' alt='' />");
			$('.forceAnim').css({scale: 0.0}).transition({scale:"1.3"},300, 'ease');
			$('.forceAnim').transition({scale:"1.0"},500, 'ease').transition({scale:"1.3"},500, 'ease');
			Engine.ForcingTimer = setInterval(function() {
				$('.forceAnim').transition({scale:"1.0"},500, 'ease').transition({scale:"1.3"},500, 'ease');
			}, 1000);
		}
	},
	BarricadingTimer: null,
	BarricadeAnim: function() {
		if (Engine.AnimationsEnabled == true) {
			$('#display').prepend("<img class='barricadeAnim' src='img/barricade.png' alt='' />");
			$('.barricadeAnim').css({scale: 0.0}).transition({scale:"1.3"},300, 'ease');
			$('.barricadeAnim').transition({scale:"1.0"},500, 'ease').transition({scale:"1.3"},500, 'ease');
			Engine.ForcingTimer = setInterval(function() {
				$('.barricadeAnim').transition({scale:"1.0"},500, 'ease').transition({scale:"1.3"},500, 'ease');
			}, 1000);
		}
	},
	AttackAnim: function(weapon) {
		if (Engine.AnimationsEnabled == true) {
			if (!weapon || weapon == "punch") {
				$('#display').prepend("<img class='attackAnim' src='img/punch.png' alt='' />");
				$('.attackAnim').css({scale: 0.0}).transition({scale:"1.3"},300, 'ease').animate({
					opacity: 0
				}, 150, function() {
					$(this).remove();
				});
			}
		}
	},
	Splatting: false,
	BloodDropTimer: null,
	BloodSplatter: function(num, remo, spd) {
		if (Engine.AnimationsEnabled == true) {
			if (Engine.Splatting == false) {
				Engine.Splatting = true;
				wW = $('#display').width() - 30;
				WH = $('#display').height() - 50;
				for(i=0; i<=num; i++){
					dp = "<li class='d" + i + " drops'></li>"
					dX =  Math.floor((Math.random()*wW)+1) + "px";
					dY =  Math.floor((Math.random()*WH)+1) + "px";
					if (remo == true) {
						dS = 0.0;
					} else {
						dS = eval("0." + (Math.floor(Math.random() * 7)));
					}
					dB = (Math.floor((Math.random()*2)+1) * 0.5)+ "px";
					dO = (Math.floor((Math.random()*2)+1) * 0.5);
					dW = "25px";
					dH = Math.floor((Math.random()*20)+18) + "px";
					goingDown = ".d" + Math.floor((Math.random()*100)+50);
					$("#display").prepend(dp);
					$(".d" + i).css("opacity",dO).css("width",dW).css("height",dH).css({x: dX, y:dY, scale: dS});
				}
				function moveDrops(num, remo){
					for(i=0; i<=num; i++){
						goingDown = ".d" + Math.floor((Math.random()*50)+1);
						if (remo == true) {
							$(goingDown).addClass("move").transition({scale: eval("0."+(Math.floor(Math.random() * 7))), y:"+=" + Math.floor((Math.random()*40)+1) + "px"},Math.floor((Math.random()*spd)+800), "ease").animate({
								opacity: 0
							}, 550, function() {
								$(this).remove();
								clearInterval(Engine.BloodDropTimer);
								Engine.Splatting = false;
							});
						} else {
							$(goingDown).addClass("move").transition({y:"+=0px"},Math.floor((Math.random()*spd)+500), "ease");
						}
					};
				}
				moveDrops(num, remo); //start blood
				Engine.BloodDropTimer = setInterval(function(){
					moveDrops(num, remo); //continue blood
				},500);
			}
		}
	},
	Score: function() {
		var score = 0;
		for (var s = 0; s < You.Inventory.length; s++) {
			score += Items[You.Inventory[s]].score;
		}
		score += (You.Kills * 10) + (You.Eaten * 5) + (You.SavedSurvivors * 100);
		$('#score').html("Score: " + score);
	},
	MoveZeds: function() {
		var attackedBarricade = false;
		for (var z = 0; z < Zeds.length; z++) {
			var difference = (You.Loc > Zeds[z].loc)? You.Loc-Zeds[z].loc : Zeds[z].loc-You.Loc;
			if (Zeds[z].loc < You.Loc) {
				if (difference < 3) {
					if (Areas[Zeds[z].loc + 1].z < 1) {
						Zeds[z].loc++;
						if (Zeds[z].loc === You.loc) {
							Engine.Print("<span class='red'>" + Zeds[z].name + " wandered in...</span>");
						}
					}
				}
				if (difference == 1) {
					if (Areas[You.Loc].z > 0) {
						Areas[You.Loc].z -= Zeds[z].damage;
						attackedBarricade = true;
						$('#barricadePoints').html(Areas[You.Loc].z);
					}
				}
			} else if (Zeds[z].loc > You.Loc) {
				if (difference < 3) {
					if (Areas[Zeds[z].loc - 1].z < 1) {
						Zeds[z].loc--;
						if (Zeds[z].loc === You.Loc) {
							Engine.Print("<span class='red'>" + Zeds[z].name + " wandered in...</span>");
						}
					}
				}
				if (difference == 1) {
					if (Areas[You.Loc].z > 0) {
						Areas[You.Loc].z -= Zeds[z].damage;
						attackedBarricade = true;
						$('#barricadePoints').html(Areas[You.Loc].z);
					}
				}
			} else { //check for survivors here!
				var allAttacked = false;
				for (var s = 0; s < Survivors.length; s++) {
					if (Survivors[s].loc == You.Loc) {
						Survivors[s].hp -= Zeds[z].damage;
						Engine.Print("<span class='red'>" + Zeds[z].name + " hits " + Survivors[s].name + " for " + Zeds[z].damage + "</span>");
						if (Survivors[s].hp <= 0) {
							Engine.Print("<span class='red'>" + Zeds[z].name + " killed " + Survivors[s].name + "!</span>");
							Survivors.splice(s,1);
						}
						allAttacked = true;
					}
				}
				if (allAttacked == false) {
					You.HP -= Zeds[z].damage;
					Engine.Print("<span class='red'>" + Zeds[z].name + " hits you for " + Zeds[z].damage + "</span>");
					var rage = Math.floor(Math.random() * 100);
					var bloodLevel = 75;
					if (rage > 90) {
						You.HP -= Zeds[z].damage;
						Engine.Print("<span class='red'>" + Zeds[z].name + " is raging and hits you for " + Zeds[z].damage + " again</span>");
						bloodLevel = 150;
					}
					Engine.CheckHealth();
					Engine.BloodSplatter(bloodLevel, true, 500);
				}
			} 
		}
		if (attackedBarricade == true) {
			if (Areas[You.Loc].z < 1) {
				Engine.Print("Warning: Barricades are down!");
				if (Engine.AnimationsEnabled == true) {
					$('#display').jrumble();
					$this = $('#display');
					clearTimeout(Engine.SmashTimer);
					$this.trigger('startRumble');
					Engine.SmashTimer = setTimeout(function(){$this.trigger('stopRumble');}, 1000);
				}
			} else {
				Engine.Print("you hear zombies smashing the barricade!");
				if (Engine.AnimationsEnabled == true) {
					$('#display').jrumble();
					$this = $('#display');
					clearTimeout(Engine.SmashTimer);
					$this.trigger('startRumble');
					Engine.SmashTimer = setTimeout(function(){$this.trigger('stopRumble');}, 750);
				}
			}
		}
		Engine.ScrollTo(9999999);
	},
	SmashTimer: null,
	DEAD: false,
	DeathMessages: function() {
		if (Engine.DEAD == false) {
			Engine.DEAD = true;
			Engine.BloodSplatter(500, false, 3000);
			setInterval(function() {
				var d = Math.floor(Math.random() * 100);
				if (d >= 0 && d < 10) {
					Engine.Print("You stumble around");
				} else if (d >= 10 && d < 20) {
					Engine.Print("You moan");
				} else if (d >= 20 && d < 30) {
					Engine.Print("You shuffle north");
				} else if (d >= 30 && d < 40) {
					Engine.Print("You shuffle south");
				} else if (d >= 40 && d < 50) {
					Engine.Print("You shuffle east");
				} else if (d >= 50 && d < 60) {
					Engine.Print("You shuffle west");
				} else if (d >= 60 && d < 70) {
					Engine.Print("you groan");
				} else if (d >= 70 && d <= 80) {
					Engine.Print("You bump into another zombie");
				} else if (d >= 80 && d <= 90) {
					Engine.Print("You bump into a wall");
				} else if (d >= 90 && d <= 100) {
					Engine.Print("You eat a rat");
				}
				Engine.ScrollTo(9999999);
			}, 2000);
		}
		Engine.ScrollTo(9999999);
	},
	CheckEXP: function() {
		var h = Math.floor((parseFloat(You.EXP)/parseFloat(100))*100);
		$('#experience').animate({
			height: h,
			marginTop: (100 - h)
		}, 350, function() {
			if (You.EXP >= 100) {
				var whichStat = Math.floor(Math.random() * 3);
				var gained = ""
				switch(whichStat) {
					case 0:
						You.STR++;
						$('#str').html(You.STR);
						gained = "strength";
						break;
					case 1:
						You.SPD++;
						$('#spd').html(You.SPD);
						gained = "speed";
						break;
					case 2:
						You.ACC++;
						$('#acc').html(You.ACC);
						gained = "accuracy";
						break;
					default:
						break;
				}
				You.LVL++;
				$('#lvl').html(You.LVL);
				Engine.Print("level up! gained " + gained);
				$('#experience').animate({
					height: 0,
					marginTop: 100
				}, 350);
			}
		});
	},
	CheckHealth: function() {
		if (You.HP >= 40) {
			$('#hpLevel').css('background-color','lightgreen');
		} else if (You.HP >= 20 && You.HP < 40) {
			$('#hpLevel').css('background-color','orange');
		} else if (You.HP < 20 && You.HP > 0) {
			$('#hpLevel').css('background-color','red');
		} else if (You.HP <= 0) {
			Areas = [];
			$('#display').html("");
			Engine.Score();
			var compositeDead = "<center><span class='red largeScore'>You are dead</span><br />";
			compositeDead += "<center><span class='largeScore'>You killed " + You.Kills + " zombies</span><br />";
			compositeDead += "<center><span class='largeScore'>You eat " + You.Eaten + " items of food</span><br />";
			compositeDead += "<center><span class='largeScore'>You died at " + You.Hunger + "% hungry</span><br />";
			compositeDead += "<center><span class='largeScore'>You died with a strength of  " + You.STR + "</span><br />";
			compositeDead += "<center><span class='largeScore'>You died with a speed of  " + You.SPD + "</span><br />";
			compositeDead += "<center><span class='largeScore'>You died with a accuracy of  " + You.ACC + "</span><br />";
			compositeDead += "<center><span class='largeScore'>Level: " + You.LVL + "</span><br /><br />";
			compositeDead += "<center><span class='largeScore'>That makes your score a total of: " + $('#score').html() + "</span></center>";
			Engine.Print(compositeDead);
			Engine.DEAD = true;
			clearInterval(Engine.NPCTimer);
			Engine.NPCTimer = null;
			clearInterval(Engine.HungerTimer);
			Engine.HungerTimer = null;
			Engine.DeathMessages();
			Engine.ScrollTo(9999999);
			$('#health').html('HP: 0');
			return false;
		}
		$('#health').html('HP: ' + You.HP);
		$('#hpLevel').animate({
			height: You.HP,
			marginTop: 100 - You.HP
		}, 350);
	},
	DeleteSave: function() {
		var sure = confirm("Sure you want to delete your save?");
		if (sure === true) {
			window.localStorage.setItem("tae-saved", null);
			window.localStorage.setItem("tae-areas", null);
			window.localStorage.setItem("tae-you", null);
			window.localStorage.setItem("tae-objects", null);
			window.localStorage.setItem("tae-barricades", null);
			window.localStorage.setItem("tae-items", null);
			window.localStorage.setItem("tae-zeds", null);
			window.localStorage.setItem("tae-survivors", null);
			window.localStorage.setItem("tae-clothes", null);
			window.localStorage.setItem("tae-theme", null);
			window.localStorage.removeItem("tae-saved");
			window.localStorage.removeItem("tae-areas");
			window.localStorage.removeItem("tae-you");
			window.localStorage.removeItem("tae-objects");
			window.localStorage.removeItem("tae-items");
			window.localStorage.removeItem("tae-zeds");
			window.localStorage.removeItem("tae-clothes");
			window.localStorage.removeItem("tae-theme");
			Engine.Print("<center>*** DELETED SAVE GAME ***</center>");
		}
		Engine.ScrollTo(9999999);
	},
	Save: function() {
		window.localStorage.setItem("tae-saved", true);
		window.localStorage.setItem("tae-map", JSON.stringify(Engine.SelectedMap));
		window.localStorage.setItem("tae-areas", JSON.stringify(Areas));
		window.localStorage.setItem("tae-you", JSON.stringify(You));
		window.localStorage.setItem("tae-objects", JSON.stringify(Objects));
		window.localStorage.setItem("tae-barricades", JSON.stringify(Barricades));
		window.localStorage.setItem("tae-items", JSON.stringify(Items));
		window.localStorage.setItem("tae-zeds", JSON.stringify(Zeds));
		window.localStorage.setItem("tae-survivors", JSON.stringify(Survivors));
		window.localStorage.setItem("tae-clothes", JSON.stringify(Clothes));
		window.localStorage.setItem("tae-theme", $('#theme').attr('href'));
		Engine.Print("<center>*** SAVED GAME ***</center>");
		Engine.ScrollTo(9999999);
	},
	Load: function() {
		if (window.localStorage.getItem("tae-saved") == "true") {
			$('#display').html('');
			Engine.SelectedMap = JSON.parse(window.localStorage.getItem("tae-map"));
			Areas = JSON.parse(window.localStorage.getItem("tae-areas"));
			You = JSON.parse(window.localStorage.getItem("tae-you"));
			Objects = JSON.parse(window.localStorage.getItem("tae-objects"));
			Barricades = JSON.parse(window.localStorage.getItem("tae-barricades"));
			Items = JSON.parse(window.localStorage.getItem("tae-items"));
			Zeds = JSON.parse(window.localStorage.getItem("tae-zeds"));
			Survivors = JSON.parse(window.localStorage.getItem("tae-survivors"));
			Clothes = JSON.parse(window.localStorage.getItem("tae-clothes"));
			$('#theme').attr('href',window.localStorage.getItem("tae-theme"));
			Engine.StartHunger();
			Engine.StartNPCs();
			Engine.Command("l");
			$('#health').html("HP: " + You.HP);
			$('#acc').html(You.ACC);
			$('#lvl').html(You.LVL);
			$('#kil').html(You.Kills);
			Engine.CheckEXP();
			$('#str').html(You.STR);
			$('#spd').html(You.SPD);
			Engine.GameStarted = true;
			Engine.Print("<center>*** LOADED GAME ***</center>");
		} else {
			Engine.Print("No save game present");
		}
		Engine.ScrollTo(9999999);
	},
	AnimationStyle: "slideIn",
	Print: function(text) {
		$('#display').append("<li class='" + Engine.AnimationStyle + "'>" + text + "</li>");
	},
	StartHunger: function() {
		Engine.HungerTimer = setInterval(function() {
			if (You.Hunger < 100) {
				You.Hunger += 10;
				$('#hunger').html("Hunger: " + You.Hunger + "%");
			} else {
				You.HP -= 1;
				$('#health').html('HP: ' + You.HP);
				Engine.CheckHealth();
			}
			if (You.Hunger < 30 && You.HP <= 24) {
				You.HP++;
				Engine.CheckHealth();
			}
			$('#hungerLevel').animate({
				height: You.Hunger,
				marginTop: 100 - You.Hunger
			}, 350);
		}, Engine.HungerTime);
		Engine.CheckHealth(); //init Health display
	},
	StartNPCs: function() {
		for (var nz = 0; nz < Engine.NPCCount; nz++) {
			var whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
			if (whichArea < 2) {
				whichArea = Math.floor(Math.random() * Areas.length - 1) + 1;
				if (whichArea < 2) {
					whichArea = 1;
				}
			}
			if (Areas[whichArea].z < 1) {
				Zeds.push({
					id: nz,
					name: zName(),
					alias: "wz" + nz,
					description: zDesc(),
					HP: Math.floor(Math.random() * 10) + 5, //health from 5 to 14
					damage: Math.floor(Math.random() * 3) + 2, //damage from 2 - 4
					loc: whichArea
				});
			}
		}
		for (var s = 0; s < Engine.SurvivorCount; s++) {
			var wSurv = Math.floor(Math.random() * SurvivorPool.length);
			var wLoc = Math.floor(Math.random() * Areas.length);
			var wHp = Math.floor(Math.random() * 10) + 10;
			var wItem = Math.floor(Math.random() * Items.length);
			Survivors.push({
				id: s,
				name: SurvivorPool[wSurv].name,
				loc: wLoc,
				hp: wHp,
				needs: wItem
			});
			SurvivorPool.splice(wSurv, 1);
		}
		setInterval(function() {
			if (Engine.NPCCountDown <= 0) {
				Engine.NPCCountDown = 30;
			}
			Engine.NPCCountDown--;
			$('#moveTimer').html(Engine.NPCCountDown);
		}, 1000);
		Engine.NPCTimer = setInterval(function() {
			Engine.MoveZeds();
		}, Engine.NPCTime);
	},
	Init: function() {
		$('#cmd').focus();
	}
};
$('.map').on('click', function() {
	Engine.LOCKED = false;
	Engine.GameStarted = true;
	//$('#actioning').hide();
	var mapName = $(this).attr('name');
	var strName = $(this).text();
	Areas = eval(mapName);
	Engine.Command("clear");
	Engine.Print("<center>Initialising '" + strName + "'...</center>");
	Engine.SelectedMap = mapName;
	setTimeout(function() {
		Engine.Print("<center>Starting game...</center>");
		setTimeout(function() {
			Engine.Command("clear");
			Engine.StartHunger();
			Engine.StartNPCs();
			Engine.Command("l");
		}, 1000);
	}, 1500);
	return false;
});

$('.delete').on('click', function() {
	Engine.DeleteSave();
});
$('.save').on('click', function() {
	if (Engine.GameStarted == true) {
		Engine.Save();
	} else {
		Engine.Print("you need to start the game first!");
	}
});
$('.load').on('click', function() {
	Engine.Load();
});
$('.anim').on('click', function() {
	var a = $(this).attr('name');
	$('.anim').css('background-color','');
	$(this).css('background-color','lightgreen');
	Engine.AnimationStyle = a;
	if (a == "null") {
		Engine.AnimationsEnabled = false;
		Engine.Print("Disabled animations!");
	} else {
		Engine.AnimationsEnabled = true;
		Engine.Print("Enabled animations (experimental)!");
	}
});
$('.animtest').on('click', function() {
	var a = $(this).attr('name');
	if (a == "BloodSplatter1") {
		a = "BloodSplatter(150, true, 500)";
		eval("Engine." + a);
	} else if (a == "BloodSplatter2") {
		a = "BloodSplatter(400, false, 500)";
		eval("Engine." + a);
	} else if (a == "ForceAnim") {
		a += "()";
		setTimeout(function() {
			$('.forceAnim').animate({
				opacity: 0
			}, 350, function() {
				$(this).remove();
				clearInterval(Engine.ForcingTimer);
			});
		}, 1000);
		eval("Engine." + a);
	} else if (a == "BarricadeAnim") {
		a += "()";
		setTimeout(function() {
			$('.barricadeAnim').animate({
				opacity: 0
			}, 350, function() {
				$(this).remove();
				clearInterval(Engine.BarricadingTimer);
			});
		}, 1000);
		eval("Engine." + a);
	} else if (a == "Smashing") {	
		clearTimeout(Engine.SmashTimer);
		if (Engine.AnimationsEnabled == true) {
			$('#display').jrumble();
			$this = $('#display');
			$this.trigger('startRumble');
			Engine.SmashTimer = setTimeout(function(){$this.trigger('stopRumble');}, 750);
		}
	} else {
		a += "()";
		eval("Engine." + a);
	}
	return false;
});
$('.theme').on('click', function() {
	if (Engine.GameStarted == true) {
		var t = $(this).attr('name');
		$('.theme').css('background-color','');
		$(this).css('background-color','lightgreen');		
		$('#theme').attr('href','themes/' + t + '.css');
	} else {
		Engine.Print("you need to start the game first!");
	}
	return false;
});
$('.clickCommand').on('click', function() {
	var tCommand = $(this).attr("name");
	$('#cmd').val(tCommand);
	if (tCommand.indexOf("something") < 0) {
		$('#cmd').val(tCommand);
	}
});
$('.instantClickCommand').on('click', function() {
	var tCommand = $(this).attr("name");
	Engine.Command(tCommand);
});
$('#runCommand').on('click', function() {
	Engine.Command($('#cmd').val());
});
$('#cmd').on('keypress', function(k) {
	if (k.keyCode === 13) {
		Engine.Command($(this).val());
	}
});
$('#display').on('click', function() {
	$('#cmd').focus();
});

$('#clearConsole').on('click', function() {
	Engine.Command("clear");
	return false;
});
window.onload = Engine.Init;