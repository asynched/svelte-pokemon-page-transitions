<script lang="ts">
  import { onNavigate } from '$app/navigation'
  import 'src/styles/globals.css'

  onNavigate((naviation) => {
    if (naviation.type === 'popstate') {
      document.documentElement.classList.add('back')
    }

    return new Promise<void>((resolve) => {
      const transition = document.startViewTransition(async () => {
        resolve()
        await naviation.complete
      })

      transition.finished.then(() =>
        document.documentElement.classList.remove('back')
      )
    })
  })
</script>

<slot />
