import './shared/toggler'

const header = document.querySelector('[data-site-header]')
if (header) {
  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 12)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!reducedMotion) {
  document.documentElement.classList.add('motion-enhanced')

  const revealTargets = [
    ...document.querySelectorAll('section[id] .section-eyebrow'),
    ...document.querySelectorAll('section[id] .section-title'),
    ...document.querySelectorAll('section[id] .section-subtitle'),
    ...document.querySelectorAll('section[id] .section-shell'),
    ...document.querySelectorAll('section[id] .card-elevated'),
    ...document.querySelectorAll('section[id] details'),
    ...document.querySelectorAll('[data-hero-intro]'),
  ]

  const uniqueTargets = [...new Set(revealTargets)]
  uniqueTargets.forEach((el) => {
    el.classList.add('reveal-target')
  })

  document.querySelectorAll('section[id] .card-elevated, section[id] details').forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`)
  })

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  )

  uniqueTargets.forEach((el) => observer.observe(el))
} else {
  document.querySelectorAll('[data-hero-intro]').forEach((el) => el.classList.add('is-revealed'))
}
