var smashconnector = require('.');

var mongourl = "mongodb://example.com:27017/example";

// Put commands in here


function populateGameTypes() {
	var gameTypes = [
		{ name: 'singles' },
		{ name: 'doubles' },
		{ name: 'crew' }
	];

	smashconnector.insertGameTypes(mongourl, gameTypes, (err, docs) => {
		console.log(docs);
	});
}

function populateStages() {
	var stages = [ 
		{ name: 'brinstar' },
		{ name: 'corneria' },
		{ name: 'fountain_of_dreams' },
		{ name: 'great_bay' },
		{ name: 'green_greens' },
		{ name: 'ice_mountain' },
		{ name: 'jungle_japes' },
		{ name: 'kongo_jungle' },
		{ name: 'mushroom_kingdom' },
		{ name: 'mute_city' },
		{ name: 'onett' },
		{ name: 'princess_peachs_castle' },
		{ name: 'pokemon_stadium' },
		{ name: 'raindow_cruise' },
		{ name: 'temple' },
		{ name: 'venom' },
		{ name: 'yoshis_island' },
		{ name: 'yoshis_story' },
		{ name: 'battlefield' },
		{ name: 'big_blue' },
		{ name: 'brinstar_depths' },
		{ name: 'dream_land_64' },
		{ name: 'final_destination' },
		{ name: 'flat_zone' },
		{ name: 'fourside' },
		{ name: 'kongo_jungle_64' },
		{ name: 'mushroom_kingdom_2' },
		{ name: 'poke_floats' },
		{ name: 'yoshis_island_64' }
	];

	smashconnector.insertStages(mongourl, stages, (err, docs) => {
		console.log(docs);
	});
}

function populateCharacters() {
	var characters = [ 
		{ name: 'fox' },
		{ name: 'sheik' },
		{ name: 'falco' },
		{ name: 'marth' },
		{ name: 'jigglypuff' },
		{ name: 'peach' },
		{ name: 'captain_falcon' },
		{ name: 'ice_climbers' },
		{ name: 'samus' },
		{ name: 'pikachu' },
		{ name: 'dr_mario' },
		{ name: 'ganondorf' },
		{ name: 'luigi' },
		{ name: 'young_link' },
		{ name: 'mario' },
		{ name: 'yoshi' },
		{ name: 'link' },
		{ name: 'donkey_kong' },
		{ name: 'roy' },
		{ name: 'mr_game_and_watch' },
		{ name: 'mewtwo' },
		{ name: 'ness' },
		{ name: 'zelda' },
		{ name: 'pichu' },
		{ name: 'bowser' },
		{ name: 'kirby' }
	 ];

 	smashconnector.insertCharacters(mongourl, characters, (err, docs) => {
		console.log(docs);
	});
}

function populatePlayers() {
	var players = [
		{ name: 'drew' },
		{ name: 'jeff' },
		{ name: 'daniel_right_hand' },
		{ name: 'daniel_left_hand' },
		{ name: 'daniel_both_hands' },
		{ name: 'alex_mann' },
		{ name: 'alex_xu' },
		{ name: 'paul' },
		{ name: 'richard' },
		{ name: 'chris_meek' },
		{ name: 'chris_glover' },
		{ name: 'phil' },
		{ name: 'ethan' },
		{ name: 'abg' },
		{ name: 'nabil' },
		{ name: 'tatsumi' },
		{ name: 'kc' },
		{ name: 'jack' },
		{ name: 'garrett' },
		{ name: 'joe' }
	];

 	smashconnector.insertPlayers(mongourl, players, (err, docs) => {
		console.log(docs);
	});
 }
