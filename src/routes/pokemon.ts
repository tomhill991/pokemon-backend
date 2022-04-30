import { Router } from 'express';
import {
    getPokemon
} from '../controllers/pokemon'

const pokemonRouter = Router();

pokemonRouter.get('/:name', getPokemon);

export { pokemonRouter };
