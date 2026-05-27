/** Tailwind-only reveal — no duration here; add `duration-*` on the element. */
const base =
  'transition-[opacity,transform] ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:scale-100'

export function revealY(revealed: boolean, offsetClass: string) {
  return `${base} ${revealed ? 'opacity-100 translate-y-0' : `opacity-0 ${offsetClass}`}`
}

export function revealX(revealed: boolean, offsetClass: string) {
  return `${base} ${revealed ? 'opacity-100 translate-x-0' : `opacity-0 ${offsetClass}`}`
}
