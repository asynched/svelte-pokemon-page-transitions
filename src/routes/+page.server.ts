import type { PageServerLoad } from './$types'
import * as pokeapi from 'src/services/pokeapi'

export const load: PageServerLoad = async ({ url }) => {
  const page = parseInt(url.searchParams.get('page') || '') || 1

  const list = await pokeapi.getList({
    offset: (page - 1) * 24,
  })

  return {
    list,
  }
}
