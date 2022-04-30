
import { Pokemon } from '../models'
import * as express from 'express'

const getPokemon = async (req: express.Request, res: express.Response) => {
    const { name } = req.params
    const pokemon = await Pokemon.findOne({ name })
    return res.status(200).json(pokemon);
}

export {
    getPokemon
}
