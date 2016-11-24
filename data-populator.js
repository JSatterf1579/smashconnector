var smashconnector = require('.');

var mongourl = "mongodb://example.com:27017/example";

// Put commands in here

function populateGameTypes() {
	var gameTypes = [
		{ name: 'singles', displayName: "Singles" },
		{ name: 'doubles', displayName: "Doubles" },
		{ name: 'crew', displayName: "Crew" }
	];

	smashconnector.insertGameTypes(mongourl, gameTypes, (err, docs) => {
		console.log(docs);
	});
}

function populateStages() {
	var stages = [ 
		{ name: 'brinstar', displayName: 'Brinstar' },
		{ name: 'corneria', displayName: 'Corneria' },
		{ name: 'fountain_of_dreams', displayName: 'Fountain of Dreams' },
		{ name: 'great_bay', displayName: 'Great Bay' },
		{ name: 'green_greens', displayName: 'Green Greens' },
		{ name: 'ice_mountain', displayName: 'Ice Mountain' },
		{ name: 'jungle_japes', displayName: 'Jungle Japes' },
		{ name: 'kongo_jungle', displayName: 'Kongo Jungle' },
		{ name: 'mushroom_kingdom', displayName: 'Mushroom Kingdom' },
		{ name: 'mute_city', displayName: 'Mute City' },
		{ name: 'onett', displayName: 'Onett' },
		{ name: 'princess_peachs_castle', displayName: "Princess Peach's Castle" },
		{ name: 'pokemon_stadium', displayName: "Pokemon Stadium" },
		{ name: 'raindow_cruise', displayName: "Rainbow Cruise" },
		{ name: 'temple', displayName: "Temple" },
		{ name: 'venom', displayName: "Venom" },
		{ name: 'yoshis_island', displayName: "Yoshi's Island" },
		{ name: 'yoshis_story', displayName: "Yoshi's Story" },
		{ name: 'battlefield', displayName: "Battlefield" },
		{ name: 'big_blue', displayName: "Big Blue" },
		{ name: 'brinstar_depths', displayName: "Brinstar Depths" },
		{ name: 'dream_land_64', displayName: "Dream Land 64" },
		{ name: 'final_destination', displayName: "Final Destination" },
		{ name: 'flat_zone', displayName: "Flat Zone" },
		{ name: 'fourside', displayName: "Fourside" },
		{ name: 'kongo_jungle_64', displayName: "Kongo Jungle 64" },
		{ name: 'mushroom_kingdom_2', displayName: "Mushroom Kingdom II" },
		{ name: 'poke_floats', displayName: "Poke Floats" },
		{ name: 'yoshis_island_64', displayName: "Yoshi's Island 64" }
	];

	smashconnector.insertStages(mongourl, stages, (err, docs) => {
		console.log(docs);
	});
}

function populateCharacters() {
	var characters = [ 
		{ name: 'fox', displayName: "Fox" },
		{ name: 'sheik', displayName: "Sheik" },
		{ name: 'falco', displayName: "Falco" },
		{ name: 'marth', displayName: "Marth" },
		{ name: 'jigglypuff', displayName: "Jigglypuff" },
		{ name: 'peach', displayName: "Peach" },
		{ name: 'captain_falcon', displayName: "Captain Falcon" },
		{ name: 'ice_climbers', displayName: "Ice Climbers" },
		{ name: 'samus', displayName: "Samus" },
		{ name: 'pikachu', displayName: "Pikachu" },
		{ name: 'dr_mario', displayName: "Dr. Mario" },
		{ name: 'ganondorf', displayName: "Ganondorf" },
		{ name: 'luigi', displayName: "Luigi" },
		{ name: 'young_link', displayName: "Young Link" },
		{ name: 'mario', displayName: "Mario" },
		{ name: 'yoshi', displayName: "Yoshi" },
		{ name: 'link', displayName: "Link" },
		{ name: 'donkey_kong', displayName: "Donkey Kong" },
		{ name: 'roy' , displayName: "Roy"},
		{ name: 'mr_game_and_watch', displayName: "Mr. Game & Watch" },
		{ name: 'mewtwo', displayName: "Mewtwo" },
		{ name: 'ness', displayName: "Ness" },
		{ name: 'zelda', displayName: "Zelda" },
		{ name: 'pichu', displayName: "Pichu" },
		{ name: 'bowser', displayName: "Bowser" },
		{ name: 'kirby', displayName: "Kirby" }
	 ];

 	smashconnector.insertCharacters(mongourl, characters, (err, docs) => {
		console.log(docs);
	});
}

function populatePlayers() {
	var players = [
		{ name: 'drew', displayName: "Drew" },
		{ name: 'jeff', displayName: "Jeff" },
		{ name: 'daniel_right_hand', displayName: "Daniel (Righty)" },
		{ name: 'daniel_left_hand', displayName: "Daniel (Lefty)" },
		{ name: 'daniel_both_hands', displayName: "Daniel (Twosies)" },
		{ name: 'alex_mann', displayName: "Alex Mann" },
		{ name: 'alex_xu', displayName: "Alex Xu" },
		{ name: 'paul', displayName: "Paul" },
		{ name: 'richard', displayName: "Richard" },
		{ name: 'chris_meek', displayName: "Chris Meek" },
		{ name: 'chris_glover', displayName: "Chris Glover" },
		{ name: 'phil', displayName: "Phil" },
		{ name: 'ethan', displayName: "Ethan" },
		{ name: 'abg', displayName: "ABG" },
		{ name: 'nabil', displayName: "Nabil" },
		{ name: 'tatsumi', displayName: "Tatsumi" },
		{ name: 'kc', displayName: "KC" },
		{ name: 'jack', displayName: "Jack" },
		{ name: 'garrett', displayName: "Garrett" },
		{ name: 'joe', displayName: "Joe" }
	];

 	smashconnector.insertPlayers(mongourl, players, (err, docs) => {
		console.log(docs);
	});
 }
