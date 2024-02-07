import type { PageServerLoad } from './$types'
import * as pokeapi from 'src/services/pokeapi'

export const load: PageServerLoad = async ({ params }) => {
  const pokemon = await pokeapi.getPokemon(params.id).then(async (pokemon) => ({
    ...pokemon,
    abilities: await Promise.all(
      pokemon.abilities.map(({ ability }) =>
        pokeapi.getAbilities(pokeapi.parseId(ability.url))
      )
    ),
  }))

  return {
    pokemon,
  }
}
