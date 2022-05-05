# Pokemon Shakespeare Backend
## Table of Contents
- [Background](#background)
- [Installation](#installation)
- [APIs](#apis)
- [Testing](#testing)
- [Technologies used](#technologies-used)
- [Routes/Endpoints](#routesendpoints)
## Background
What if the description of each Pokemon were to be written in Shakespearean style? Well this is the backend for this!
## Installation
### MongoDB
MongoDB is the database that was useed for this project, so you will need to connect to this to get
the project running

You have two choices. You can choose to use Atlas, which is the cloud MongoDB service. Instructions on how to do this can be found [here](https://www.mongodb.com/docs/atlas/getting-started/)

Alternatively, you can install and use MongoDB on your device [(see instructions here)](https://www.mongodb.com/docs/guides/server/install/)

To connect to these, you will need to connect to create a .env file and point the `DB_PATH`
constant, to the path of your MongoDB
### To run server
* Run `npm install`
* Create `.env` and define constants (see .env.example)
* Run `npm run dev` to start server

## APIs
## PokeAPI
To fetch (catch?) all the suggested pokemon, the app makes use of the [PokeAPI](https://pokeapi.co/docs/v2#pokemon-section)

*** Note *** the free PokeAPI version only allows 5 pokemon to be created per hour. Sometimes a pokemon may not
appear, even though it is on the suggested list, because the PokeAPI has stopped a pokemon being
returned. To overcome this, please wait for an hour or pay for the premium version!
## Shakespeare API
In order to translate descriptions of the pokemon into shakespearean English, the app makes use of
the Shakespeare API from [Fun Translation](https://api.funtranslations.com/). You should add the
Shakespeare API to your .env (this link to be precise
https://api.funtranslations.com/translate/shakespeare.json) under SHAKESPEARE_API
## Testing
Tests can be found in `/tests/pokemon.spec.ts`, and makes use of integration tests. The testing suite uses Mocha and Chai
### Mocha and Chai
[Mocha](https://mochajs.org/) is a popular javascript testing library and [Chai](https://www.chaijs.com/) is an assertion
library
### To run tests
* Run `npm run test`
## Technologies used
* node v17.9.0
* npm v8.5.5
* mongo v4.2.8
* mongoose 6.3.1
## Routes/Endpoints
<p>Route:        `/api/pokemons/:name`</p>
<p>Method:       `get`</p>
<p>Parameters:   `name`</p>
<p>Description:  `Get pokemon name, description and sprite`</p>
