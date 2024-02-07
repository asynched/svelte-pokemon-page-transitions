export type GetListOptions = {
  limit?: number
  offset?: number
}

export type GetListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

const cache = new Map<string, any>()

async function cachedFetch<T>(
  input: URL | RequestInfo,
  init?: RequestInit | undefined
): Promise<T> {
  const key = input.toString()

  if (cache.has(key)) {
    return cache.get(key)
  }

  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error('Failed to fetch')
  }

  const data = await response.json()

  cache.set(key, data)

  return data
}

export async function getList({
  limit = 24,
  offset = 0,
}: GetListOptions = {}): Promise<Pokemon[]> {
  const url = new URL('https://pokeapi.co/api/v2/pokemon')

  url.searchParams.set('limit', limit.toString())
  url.searchParams.set('offset', offset.toString())

  const response: GetListResponse = await cachedFetch(url)

  return await Promise.all(
    response.results.map((result) => getPokemon(parseId(result.url)))
  )
}

export type PokemonSprites = {
  front_default: string
  back_default: string
  back_shiny: string
  front_shiny: string
}

export type PokemonShortAbility = {
  ability: {
    name: string
    url: string
  }
}

export type PokemonType = {
  type: {
    name: string
  }
}

export type Pokemon = {
  id: number
  name: string
  sprites: PokemonSprites
  types: PokemonType[]
  abilities: PokemonShortAbility[]
}

export function parseId(url: string): string {
  console.log(url)

  const parts = url.split('/')

  return parts[parts.length - 2]
}

export async function getPokemon(id: string): Promise<Pokemon> {
  const url = new URL(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return await cachedFetch(url)
}

export type PokemonAbility = {
  id: number
  name: string
  effect_entries: {
    effect: string
    language: {
      name: string
    }
  }[]
}

export async function getAbilities(id: string): Promise<PokemonAbility> {
  const url = new URL(`https://pokeapi.co/api/v2/ability/${id}`)

  return await cachedFetch(url)
}
