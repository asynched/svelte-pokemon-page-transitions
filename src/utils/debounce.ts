export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T {
  let timeout: number

  return function (this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  } as T
}
