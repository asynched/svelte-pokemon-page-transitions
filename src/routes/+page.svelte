<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { debounce } from 'src/utils/debounce'
  import * as pokeapi from 'src/services/pokeapi'
  import { colorMap } from 'src/constants/colors'
  import { replaceState } from '$app/navigation'
  import PageHeader from 'src/components/page/PageHeader.svelte'

  export let data: PageData

  let searchTerm = ''
  let pageIndex = parseInt($page.url.searchParams.get('page') || '') || 1
  let filteredPokemons = data.list

  const doFilter = debounce((term: string) => {
    if (term === '') {
      filteredPokemons = data.list
      return
    }

    filteredPokemons = data.list.filter((pokemon) =>
      pokemon.name.includes(term.toLowerCase())
    )
  }, 300)

  $: doFilter(searchTerm)

  async function handleFindPokemons() {
    const pokemons = await pokeapi.getList({ offset: pageIndex * 24 })

    data.list = data.list.concat(pokemons)
    filteredPokemons = data.list
    pageIndex += 1

    $page.url.searchParams.set('page', pageIndex.toString())

    replaceState($page.url, $page.state)
  }

  function beforeNavigate(event: Event) {
    const target = event.currentTarget as HTMLAnchorElement
    const img = target.querySelector('img')!

    // @ts-ignore
    img.style = `view-transition-name: pokemon-sprite`
  }
</script>

<PageHeader />

<div class="w-full flex flex-col max-w-screen-sm mx-auto px-4 md:px-0">
  <search
    class="mb-8 flex items-center bg-white rounded-lg py-2 px-4 transition ease-in-out focus-within:ring-2 focus-within:ring-blue-600"
  >
    <input
      type="text"
      class="flex-1 outline-none"
      placeholder="Search for a Pokemon"
      bind:value={searchTerm}
    />
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 outline-none"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </button>
  </search>

  <ul class="mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">
    {#each filteredPokemons as pokemon}
      <li>
        <a
          href={`pokemon/${pokemon.id}`}
          class="flex flex-col items-center justify-center p-4 rounded-lg bg-white transition ease-in-out hover:shadow-xl"
          on:click={beforeNavigate}
        >
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2 class="text-xl font-bold tracking-tighter mb-4">
            {pokemon.name}
          </h2>
          <ul class="flex gap-1">
            {#each pokemon.types as type}
              <li
                class={`py-1 px-2  rounded-full text-xs ${
                  colorMap[type.type.name] || 'bg-gray-300'
                }`}
              >
                {type.type.name}
              </li>
            {/each}
          </ul>
        </a>
      </li>
    {/each}
  </ul>
  {#if !searchTerm}
    <button
      class="mx-auto mb-8 py-2 px-4 bg-blue-600 text-white rounded-full"
      on:click={handleFindPokemons}
    >
      Load more
    </button>
  {/if}
</div>
