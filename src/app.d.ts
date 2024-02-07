// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  type ViewTransition = {
    finished: Promise<void>
    ready: Promise<void>
    updateCallbackDone: Promise<void>
  }

  interface Document {
    startViewTransition(callback: () => unknown): ViewTransition
  }

  type ArrayItem<T extends Array<any>> = T extends Array<infer U> ? U : never
}

export {}
