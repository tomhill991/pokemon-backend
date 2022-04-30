require('dotenv').config();
import axios from 'axios'

export const fetchPokemon = async (name: string) : Promise<{
    sprite: string,
    description: string
}> => {
    try {
        const pokemon: {
            description: string
            sprite: string
        }= {
            sprite: await getSprite(name),
            description: await getDescription(name)
        }
        return pokemon
    } catch(error: any) {
       throw new Error(error.message)
    }
}

const getDescription = async (name: string) => {
    try {
        const { flavor_text_entries } = await getPokemon('pokemon-species', name)
        const { flavor_text } = flavor_text_entries.find((flavourTextEntry: {
                flavor_text: string,
                language: {
                    name: string
                }
            }) => flavourTextEntry.language.name === 'en')
        const { contents } = await getShakespeareanDescription(flavor_text)

        return contents.translated
    } catch(error: any) {
        process.env.NODE_ENV !== 'test' && console.error(error, 'error')
        throw new Error(error.message)
    }
}

const getSprite = async (name: string) => {
    const { sprites } = await getPokemon('pokemon', name)
    return sprites.back_default
}

const getPokemon = async (uri: string, name: string) => {
    try {
        const { data } = await axios.get(process.env.POKEMON_API + '/' + uri + '/' + name)

        return data
    } catch(error: any) {
        process.env.NODE_ENV !== 'test' && console.error(error)
        if(error.response.data === 'Not Found') {
            throw new Error(`Pokemon name ${name} was not found. Have you even watched pokemon?`)
        } else {
            throw new Error(error.message)
        }
    }
}

const getShakespeareanDescription = async (description: string) => {
    try {
        const { data } = await axios.post(process.env.SHAKESPEARE_API!, {
            text: sanitiseDescription(description)
        })
        return data
    } catch(error: any) {
        process.env.NODE_ENV !== 'test' && console.error(error.data, 'error')
        throw new Error(error.message)
    }
}

const sanitiseDescription = (description: string) => {
    return description.split('\n').join().replace('\n', '').replace('\f', ' ')
}
