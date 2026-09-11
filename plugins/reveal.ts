// plugins/reveal.ts
// v-reveal — scroll-reveal directive.
// Usage: v-reveal or v-reveal="{ delay: 120 }" (stagger in ms).
// Elements get `.reveal` on mount (client only) and `.reveal-visible`
// once they enter the viewport. No-JS visitors simply see the content.
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null
  const pending = new Set<HTMLElement>()
  let scrollBound = false
  let ticking = false

  const reveal = (el: HTMLElement) => {
    el.classList.add('reveal-visible')
    el.style.removeProperty('--reveal-delay')
    pending.delete(el)
    observer?.unobserve(el)
  }

  // Safety net for instant scroll jumps (anchors, End key, programmatic):
  // reveal everything that is on screen or already passed above it.
  const sweep = () => {
    for (const el of [...pending]) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight || rect.bottom < 0) reveal(el)
    }
  }

  const onScroll = () => {
    if (ticking || !pending.size) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      sweep()
    })
  }

  const bindScroll = () => {
    if (scrollBound) return
    scrollBound = true
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  const getObserver = () => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
              reveal(entry.target as HTMLElement)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
    }
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      // Respect users who prefer reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const delay = binding.value?.delay
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

      el.classList.add('reveal')
      pending.add(el)
      getObserver().observe(el)
      bindScroll()

      // Reveal immediately if already in view (e.g. anchor navigation)
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el)
    },
    unmounted(el: HTMLElement) {
      pending.delete(el)
      observer?.unobserve(el)
    }
  })
})
