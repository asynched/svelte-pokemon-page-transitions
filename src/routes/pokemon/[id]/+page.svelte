<script lang="ts">
  import { colorMap } from 'src/constants/colors'
  import type { PageData } from './$types'
  import PageHeader from 'src/components/page/PageHeader.svelte'
  import type { PokemonAbility } from 'src/services/pokeapi'

  export let data: PageData

  const { pokemon } = data

  function filterEn(entry: ArrayItem<PokemonAbility['effect_entries']>[]) {
    return entry.filter((item) => item.language.name === 'en')
  }
</script>

<PageHeader type="details" />

<div class="pb-8 px-4 md:px-0 w-full max-w-screen-sm mx-auto">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
    <img
      src={pokemon.sprites.front_default}
      alt={pokemon.name}
      class="p-4 bg-white w-full rounded-lg"
      style="view-transition-name: pokemon-sprite"
    />
    <img
      src={pokemon.sprites.front_shiny}
      alt={pokemon.name}
      class="p-4 bg-white w-full rounded-lg"
    />
    <img
      src={pokemon.sprites.back_default}
      alt={pokemon.name}
      class="p-4 bg-white w-full rounded-lg"
    />
    <img
      src={pokemon.sprites.back_shiny}
      alt={pokemon.name}
      class="p-4 bg-white w-full rounded-lg"
    />
  </div>
  <h1 class="mb-2 text-4xl font-bold mt-4">
    {pokemon.name}
  </h1>
  <ul class="mb-4 flex gap-1">
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
  <ul class="grid gap-4">
    {#each pokemon.abilities as ability}
      {#each filterEn(ability.effect_entries) as entry}
        <li class="py-2 px-4 bg-white rounded-lg">
          {entry.effect}
        </li>
      {/each}
    {/each}
  </ul>
</div>
