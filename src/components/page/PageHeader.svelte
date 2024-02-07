<script lang="ts">
  export let type: 'regular' | 'details' = 'regular'
</script>

<header
  class="px-4 md:px-0 bg-white mb-8 py-4"
  style="view-transition-name: page-header"
>
  <div class="w-full max-w-screen-sm mx-auto flex items-center justify-between">
    <div class="flex items-center gap-2">
      {#if type === 'details'}
        <button on:click={() => history.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      {/if}
      <a href="/" style="view-transition-name: header-title">
        <h1 class="text-2xl font-bold tracking-tighter">Page transitions</h1>
      </a>
    </div>
    <a
      href="https://github.com/asynched/pokemon-page-transitions"
      target="_blank"
      style="view-transition-name: header-github-link"
    >
      <img
        class="w-8 h-8"
        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        alt="GitHub Logo"
      />
    </a>
  </div>
</header>
