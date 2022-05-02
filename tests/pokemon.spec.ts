require('dotenv').config();
process.env.NODE_ENV = 'test';
import {
  Pokemon
} from '../src/models'
const chai = require('chai')
import { expect } from 'chai'
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

import mongoose from 'mongoose'
import app from '../src'


describe('Pokemon', () => {
  before(async () => {
    async function clearDB() {
      await Pokemon.deleteMany().exec()
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.DB_PATH!, function (err) {
            if (err) {
              throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
  });

  after(async () => {
    async function clearDB() {
      await Pokemon.deleteMany().exec()
    }
    clearDB()
  })

  it('should save with name, description, sprite', async () => {
    const pokemon = new Pokemon({
      name: 'charizard',
      description: 'Shakespearean stuff',
      sprite: 'https://i.imgur.com/dM7Thhn.png'
    });
    await pokemon.save();
    expect(pokemon.name).to.equal('charizard')
    expect(pokemon.description).to.equal('Shakespearean stuff')
    expect(pokemon.sprite).to.equal('https://i.imgur.com/dM7Thhn.png')
  });

  describe('GET /api/pokemons/charizard', () => {
    it('should return charizard from database when name param is charizard', async () => {
      const res = await chai.request(app).get('/api/pokemons/charizard')
      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal('charizard')
      expect(res.body.description).to.equal('Shakespearean stuff')
      expect(res.body.sprite).to.equal('https://i.imgur.com/dM7Thhn.png')
    })
  })

  describe('GET /api/pokemons/test', async () => {
    it("should return a 500 error", async () => {
      const res = await chai.request(app).get('/api/pokemons/test')
      expect(res.status).to.equal(500)
    })

    it("should return Pokemon name test was not found. Have you even watched pokemon?", async () => {
      const res = await chai.request(app).get('/api/pokemons/test')
      expect(res.body.message).to.equal('Pokemon name test was not found. Have you even watched pokemon?')
    })
  })

  describe('GET /api/pokemons/pikachu', async () => {
    it("should create a new instance called pikachu (if there are enough credits)", async () => {
      const res = await chai.request(app).get('/api/pokemons/pikachu')
      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal('pikachu')
      expect(res.body.description).to.not.equal('Shakespearean stuff')
    })
  })
});
