var chai = require('chai');
var smashconnector = require('./smashconnector');

describe('data validation', () => {

	describe('name validation', () => {
		it('returns true if a name is found', () => {
			var list = [
				{ "name": "jim" },
				{ "name": "bob" }
			]

			var isValid = smashconnector.isNameInList("jim", list);
			chai.expect(isValid).to.equal(true, 'method did not return true for name in list');
		});

		it('is not case sensitive', () => {
			var list = [
				{ "name": "jim" },
				{ "name": "bob" }
			]

			var isValid = smashconnector.isNameInList("BOB", list);
			chai.expect(isValid).to.equal(true, 'method did not return true for ALL CAPS name in list');
		});

		it('returns false if a name is not found', () => {
			var list = [
				{ "name": "jim" },
				{ "name": "bob" }
			]

			var isValid = smashconnector.isNameInList("tim", list);
			chai.expect(isValid).to.equal(false, 'method did not return false for name not in list');
		});

		it('is robust to null input', () => {
			var isValid = smashconnector.isNameInList("tim", null);
			chai.expect(isValid).to.equal(false, 'method did not return false for null list');

			var list = [
				{ "name": "jim" },
				{ "name": "bob" }
			]
			var isValid = smashconnector.isNameInList(null, list);
			chai.expect(isValid).to.equal(false, 'method did not return false for null name');
		})
	});

	describe('name substring matching', () => {
		it('returns superset name if one is found', () => {
			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" }
			]

			var result = smashconnector.findSubstringNames("jim", list);
			chai.expect(result).to.deep.equal(['jim-bob'], 'method did not return superset name for substring');
		});

		it('returns multiple superset names if multiple are found', () => {
			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" },
				{ "name": "jimmy" }
			]

			var result = smashconnector.findSubstringNames("jim", list);
			chai.expect(result).to.deep.equal(['jim-bob', 'jimmy'], 'method did not return multiple superset names for multiple substrings');
		});

		it('is not case sensitive', () => {
			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" }
			]

			var result = smashconnector.findSubstringNames("JIM", list);
			chai.expect(result).to.deep.equal(['jim-bob'], 'method did not return superset name for substring case insenstively');
		});

		it('returns false if a name is not found', () => {
			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" }
			]

			var result = smashconnector.findSubstringNames("pat", list);
			chai.expect(result).to.deep.equal([], 'method did not return empty list for no substrings found');
		});

		it('is robust to null input', () => {
			var result = smashconnector.findSubstringNames("jim", null);
			chai.expect(result).to.deep.equal([], 'method did not return empty set for null list input');

			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" }
			]
			var result = smashconnector.findSubstringNames(null, list);
			chai.expect(result).to.deep.equal([], 'method did not return empty set for null name input');
		});
	});

	describe('similar name finder', () => {
		it('returns similar name if one is found', () => {
			var list = [
				{ "name": "jim" },
				{ "name": "bob" }
			]

			var result = smashconnector.findSimilarNames("jom", list);
			chai.expect(result).to.deep.equal(['jim'], 'method did not return similar name even though one was provided');
		});

		it('returns multiple similar names if multiple are found', () => {
			var list = [
				{ "name": "tany" },
				{ "name": "tiny" },
				{ "name": "jimmy" }
			]

			var result = smashconnector.findSimilarNames("tony", list);
			chai.expect(result).to.deep.equal(['tany', 'tiny'], 'method did not return multiple similar names even though they were provided');
		});

		it('is not case sensitive', () => {
			var list = [
				{ "name": "jom" },
				{ "name": "bob" }
			]

			var result = smashconnector.findSimilarNames("JIM", list);
			chai.expect(result).to.deep.equal(['jom'], 'method did not return similar name even though one was provided IN ALL CAPS');
		});

		it('returns false if a name is not found', () => {
			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" }
			]

			var result = smashconnector.findSimilarNames("dilbert", list);
			chai.expect(result).to.deep.equal([], 'method did not return empty list for no similar names provided');
		});

		it('is robust to null input', () => {
			var result = smashconnector.findSimilarNames("jim", null);
			chai.expect(result).to.deep.equal([], 'method did not return empty set for null list input');

			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" }
			]
			var result = smashconnector.findSimilarNames(null, list);
			chai.expect(result).to.deep.equal([], 'method did not return empty set for null name input');
		});
	});

	describe('name validation and suggestion', () => {
		it('returns no match when given null input', () => {
			var nullResult = {
				"match": false,
				"suggestions": []
			};

			var result = smashconnector.match("jim", null);
			chai.expect(result).to.deep.equal(nullResult, 'method did not return false match for null list input');

			var list = [
				{ "name": "jim-bob" },
				{ "name": "bob" }
			]
			var result = smashconnector.match(null, list);
			chai.expect(result).to.deep.equal(nullResult, 'method did not return false match for null name input');
		})
	});
});

describe('data formatting', () => {
	describe('participant formatting', () => {
		it('formats participant data correctly', () => {
			var expectedParticipantData = {
				"name": "drew",
				"character": "fox",
				"starting_stocks": 4,
				"remaining_stocks": 4,
				"win": true
			};
			var generatedParticipantData = smashconnector.formatParticipantData("drew", "fox", 4, 4, true);

			chai.expect(generatedParticipantData).to.deep.equal(expectedParticipantData, 'stage data was not formatted as expected');
		});

		it('returns an error given an empty input', () => {
			var generatedParticipantData = smashconnector.formatParticipantData(null, "fox", 4, 4, true);
			chai.expect(generatedParticipantData).to.be.an('error', 'did not return an error given a null input');

			var generatedParticipantData = smashconnector.formatParticipantData("", "fox", 4, 4, true);
			chai.expect(generatedParticipantData).to.be.an('error', 'did not return an error given an empty string as input');
		});
	});

	describe('stage formatting', () => {
		it('formats stage data correctly', () => {
			var stage = "final_destination";
			var chooser = "random";

			var generatedStageData = smashconnector.formatStageData(stage, chooser);
			var expectedStageData = {
				"name": stage,
				"chooser": chooser
			}

			chai.expect(generatedStageData).to.deep.equal(expectedStageData, 'stage data was not formatted as expected');
		});

		it('returns an error given an empty input', () => {
			var generatedStageData = smashconnector.formatStageData(null, "random");
			chai.expect(generatedStageData).to.be.an('error', 'did not return an error given a null input');

			var generatedStageData = smashconnector.formatStageData("", "random");
			chai.expect(generatedStageData).to.be.an('error', 'did not return an error given an empty string as input');
		});
	});

	describe('game formatting', () => {
		it('formats game data correctly', () => {
			//pulled these out into helper functions since they're a little big and boilerplate
			var generatedGameData = generateGameData();
			var expectedGameData = getGameExpectedData();
			chai.expect(generatedGameData).to.deep.equal(expectedGameData, 'game data was not formatted as expected');
		});

		it('returns an error given an empty input', () => {
			var tmp = generateGameData();
			var generatedGameData = smashconnector.formatGameData([tmp.participants[0], tmp.participants[1]], tmp.stage, null);
			chai.expect(generatedGameData).to.be.an('error', 'did not return an error given a null input');

			var generatedGameData = smashconnector.formatGameData([tmp.participants[0], tmp.participants[1]], tmp.stage, "");
			chai.expect(generatedGameData).to.be.an('error', 'did not return an error given an empty string as input');
		});

		it('returns an error given only one participant', () => {
			var tmp = generateGameData();
			var generatedGameData = smashconnector.formatGameData(tmp.participants[0], tmp.stage, tmp.gameType);
			chai.expect(generatedGameData).to.be.an('error', 'did not return an error given only a single participant');
		});
	});
});

function generateGameData() {
	var participant1 = {
		"name": "drew",
		"character": "fox",
		"starting_stocks": 4,
		"remaining_stocks": 1,
		"win": true
	}
	var participant2 = {
		"name": "jeff",
		"character": "marth",
		"starting_stocks": 4,
		"remaining_stocks": 0,
		"win": false	
	}
	var stage = {
		"name": "dreamland",
		"chooser": "random"
	}
	var game = smashconnector.formatGameData([participant1, participant2], stage, "singles");

	return game;
}

function getGameExpectedData() {
	return {
		"participants": [
			{
				"name": "drew",
				"character": "fox",
				"starting_stocks": 4,
				"remaining_stocks": 1,
				"win": true
			},
			{
				"name": "jeff",
				"character": "marth",
				"starting_stocks": 4,
				"remaining_stocks": 0,
				"win": false					
			}
		],
		"stage": {
			"name": "dreamland",
			"chooser": "random"
		},
		"gameType": "singles"
	}
}