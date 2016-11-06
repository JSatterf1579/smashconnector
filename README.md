# smashconnector

Use this to query, insert, validate and format data to and from a mongo smash game archive.

## Installation
<a name="installation"></a>

``` shell
npm install --save smashconnector
```
```javascript
var smashconnector = require('smashconnector');
smashconnector.listGames("mongodb://example.mongo.url:27017", {}, (games) => {
	console.log(games);
});
```

## Functions
There are 4 primary functions the smashconnector performs:
- [Formatting data for insertion into the archive](#formatting)
- [Validating input names before insertion](#validation)
- [Inserting data into the mongo archive](#insert)
- [Querying data from the mongo archive](#query)


Doc and examples for each of those functions can be found below, but the intent is that validation and formatting are used prior to insert in order to maintain a clean, consistent data set.

Here's an example:
```javascript
var player1name = "carl"

// Get a list of all players in our data set
smashconnector.listPlayers("mongodb://example.mongo.url:27017/example", {} (err, players) => {
	
	// Let's validate that player name is one of the one's in our list
	var playerMatch = smashconnector.match(player1name, players);
	
	if(!playerMatch.match) { // If the name wasn't found
		if(playerMatch.suggestions) { // If it gave us back suggestions
			player1name = suggestions.[0]; // Let's very presumptively just use the first suggestion as the name
		} else {
			throw new Error("I don't know this name!");
		}
	}

	// Now that we have the name, let's format the participant data
	var participantData = formatParticipantData(player1name, "captain_falcon", 4, 2, true);

	// .. more formatting to create game record
	// var games = a list of games in this match

	smashconnector.insertGames("mongodb://example.mongo.url:27017", games, (err, result) => {
		// We've inserted validated and formatted game data!
	});
});
```

## Formatting
<a name="formatting"></a>
To help maintain a consistent data set an easy, common data storage format would be nice.  
Here are the formats of the json used to store data, with a separate mongo collection for each.  
Most are just simple name entries for now, but game data is interesting and particular.

#### Players
```javascript
{ name: "drew" }
```
#### Stages
```javascript
{ name: "fountain_of_dreams" }
```
#### Characters
```javascript
{ name: "fox" }
```
#### Game Types
```javascript
{ name: "singles" }
```
#### Games
```javascript
	{
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
		"gameType": "singles",
		"tournamentGame": true
	}
```
As mentioned above, only game data is interesting. The *smashconnector* includes a few methods that raw string inputs and return the correctly formatted json used to represent game data.

```javascript
function formatParticipantData(name, character, starting_stocks, remaining_stocks, win) {
function formatStageData(name, chooser) {
function formatGameData(participantList, stage, gameType, tournamentGame) {
```
And here is an example composing all of those functions together to create a game json entry
```javascript
	var participant1 = smashconnector.formatParticipantData("drew", "fox", 4, 1, true);
	var participant2 = smashconnector.formatParticipantData("jeff", "marth", 4, 0, false);

	var stage = smashconnector.formatStageData("dreamland", "random");

	var game = smashconnector.formatGameData([participant1, participant2], stage, "singles", true);
```

## Validation
<a name="validation"></a>

The other way to help maintain a clean data set is validation that protects against mispelling and typos.

The *smashconnector* exposes methods that can be used to compare provided names against lists of existing name values.

The primary method `match` first looks for any matching name and then if one isn't found tries provide suggestions from the list that are close to a percieved typo.


#### `smashconnector.match(name, list) -> { match: true|false, suggestions: [strings] }`

- **name** (String) containing the name to be searched for
- **list** ([Strings]) the list of names to search through, usually grabbed from mongo
- returns an object that first, specifies if a match was found and if not then provides any possible suggestions from the list close to the name provided


The other methods provided are just the utility methods used by `match`, exposed in case they may be useful.
```javascript
function isNameInList(name, list) { -> boolean

function findSubstringNames(name, list) { -> [Strings]

function findSimilarNames(name, list) { -> [Strings]
```

## Insert
<a name="insert"></a>

Now that we know how to format and validate input data, we can insert it into the mongo archive.

There are functions to insert into each of the collections mentioned above. Each of these calls back with mongo error and result objects. One will be be populate and the other null depending on whether the operation was successfull or not.

```javascript
function insertGames(url, games, callback(err, result)) {

function insertPlayers(url, players, callback(err, result)) {

function insertPlayers(url, players, callback(err, result)) {

function insertStages(url, stages, callback(err, result)) {

function insertCharacters(url, characters, callback(err, result)) {

function insertGameTypes(url, gameTypes, callback(err, result)) {
```

## Query
<a name="query"></a>

Querying data from the archive is easy and is done using <a href="https://docs.mongodb.com/manual/tutorial/query-documents/">mongo query documents</a>. 

Just like with insert, there are functions to query from each of the collections mentioned above. Each of these calls back with a list of json documents. As with insert, the error callback object will be populate if there is an error during the operation.

```javascript
function listGames(url, query, callback(err, docs)) {

function listPlayers(url, query, callback(err, docs)) {

function listPlayers(url, query, callback(err, docs)) {

function listStages(url, query, callback(err, docs)) {

function listCharacters(url, query, callback(err, docs)) {

function listGameTypes(url, query, callback(err, docs)) {
```
