var MongoClient = require('mongodb').MongoClient;
var levenshtein = require('fast-levenshtein');

//Mongo connection section

const playerCollection = "players";
const stageCollection = "stages";
const gameTypeCollection = "gameTypes";
const gameCollection = "games";

function insertGames(url, games, callback) {
	mongoInsert(url, gameCollection, games, callback);
}

function listGames(url, query, callback) {
	mongoList(url, gameCollection, query, callback);
}

function insertStages(url, stages, callback) {
	mongoInsert(url, stageCollection, stages, callback);
}

function listStages(url, query, callback) {
	mongoList(url, stageCollection, query, callback);
}

function insertGameTypes(url, gameTypes, callback) {
	mongoInsert(url, gameTypeCollection, gameTypes, callback);
}

function listGameTypes(url, query, callback) {
	mongoList(url, gameTypeCollection, query, callback);
}

function insertPlayers(url, players, callback) {
	mongoInsert(url, playerCollection, players, callback);
}

function listPlayers(url, query, callback) {
	mongoList(url, playerCollection, query, callback);
}

function mongoList(url, collectionName, query, callback) {
	MongoClient.connect(url, (err, db) => {
		var collection = db.collection(collectionName);
		collection.find(query).toArray((err, docs) => {
			db.close();
			callback(docs);
		});
	});
}

function mongoInsert(url, collectionName, docs, callback) {
	MongoClient.connect(url, (err, db) => {
		var collection = db.collection(collectionName);
		collection.insert(docs, (err, result) => {
			db.close();
			callback(result);
		});
	});
}

//Data validation section

function match(name, list) {
	//Null check
	if(!(name && list)) {
		return {
			"match": false,
			"suggestions": []
		};
	}

	var result = {};
	if(isNameInList(name, list)) { //Given name is an exact match
		result.match = true,
		result.suggestions = [];
	} else { //Match for name not found, return suggestions
		result.match = false;
		result.suggestions = findSubstringNames(name, list);
		result.suggestions = result.suggestions.concat(findSimilarNames(name, list));
	}
	return result;
}

function isNameInList(name, list) {
	//Null check
	if(!(name && list)) { return false; }

	for (var i in list) {
  		if(name.toLowerCase() === list[i].name.toLowerCase()) {
  			return true;
  		}
	}
	return false;
}

function findSubstringNames(name, list) {
	//Null check
	if(!(name && list)) { return []; }

	var result = [];
	for (var i in list) {
  		if (~list[i].name.toLowerCase().indexOf(name.toLowerCase())) {
  			result.push(list[i].name);
  		}
	}
	return result;
}

function findSimilarNames(name, list) {
	//Null check
	if(!(name && list)) { return []; }

	var result = [];
	for (var i in list) {
  		if((levenshtein.get(name.toLowerCase(), list[i].name.toLowerCase())/name.length) < 0.5) {
  			result.push(list[i].name);
  		}
	}
	return result;
}

//Data formatting section

function formatParticipantData(name, character, starting_stocks, remaining_stocks, win)
{
	if(isInputEmpty([name, character, starting_stocks, remaining_stocks, win])) {
		return new Error("empty input provided");
	}

	return {
		"name": name,
		"character": character,
		"starting_stocks": starting_stocks,
		"remaining_stocks": remaining_stocks,
		"win": win
	}
}

function formatStageData(name, chooser)
{
	if(isInputEmpty([name, chooser])) {
		return new Error("empty input provided");
	}

	return {
		"name": name,
		"chooser": chooser
	}
}

function formatGameData(participantList, stage, gameType)
{
	if(isInputEmpty([participantList, stage, gameType])) {
		return new Error("empty input provided");
	}

	if(participantList.constructor !== Array) {
		return new Error("list of participants expected but no array provided")
	}

	return {
		"participants": participantList,
		"stage": stage,
		"gameType": gameType
	}
}

function isInputEmpty(inputList) {
	for(var i in inputList) {
		if(!(inputList[i] && inputList[i] !== "")) {
			return true;
		}
	}
	return false;
}

module.exports = {
	insertGames: insertGames,
	listGames: listGames,
	insertStages: insertStages,
	listStages: listStages,
	insertGameTypes: insertGameTypes,
	listGameTypes: listGameTypes,
	listPlayers: listPlayers,
	insertPlayers: insertPlayers,
	match: match,
	isNameInList: isNameInList,
	findSubstringNames: findSubstringNames,
	findSimilarNames: findSimilarNames,
	formatParticipantData: formatParticipantData,
	formatStageData: formatStageData,
	formatGameData: formatGameData
}