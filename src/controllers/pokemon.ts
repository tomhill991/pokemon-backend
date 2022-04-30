
import { Pokemon } from '../models'
import { fetchPokemon } from '../services/pokemon'
import * as express from 'express'

const getPokemon = async (req: express.Request, res: express.Response) => {
    const { name } = req.params
    const pokemonFromDb = await Pokemon.findOne({ name })
    if(pokemonFromDb) {
        return res.status(200).json(pokemonFromDb);
    } else {
        try {
            const { description, sprite } = await fetchPokemon(name)
            const pokemon = new Pokemon({
                name,
                description,
                sprite
            })
            await pokemon.save()
            return res.status(200).json(pokemon);
        } catch(error: any) {
            process.env.NODE_ENV !== 'test' && console.error(error)
            return res.status(500).json({
                error: true,
                message: error.message
            })
        }
    }
}

export {
    getPokemon
}
