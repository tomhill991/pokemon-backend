import { Schema, model } from 'mongoose';

export interface IPokemon {
    name: string,
    description: string,
    sprite: string
}

const pokemonSchema = new Schema<IPokemon>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  sprite: {type: String, required: true}
}, { timestamps: true });

const Pokemon = model<IPokemon>('Pokemon', pokemonSchema);

export default Pokemon
