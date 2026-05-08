const MOBILE_NAV_ID = 'navbarContent'
const MOBILE_NAV_HIDDEN = '-translate-y-full'
const MOBILE_MQ = '(max-width: 1279px)'

function mobileNavPanel() {
  return document.getElementById(MOBILE_NAV_ID)
}

function isMobileNavOpen(panel) {
  return Boolean(panel && !panel.classList.contains(MOBILE_NAV_HIDDEN))
}

function syncMobileNav() {
  const panel = mobileNavPanel()
  if (!panel) return

  const open = isMobileNavOpen(panel)
  const isMobile = window.matchMedia(MOBILE_MQ).matches

  document.body.classList.toggle('overflow-hidden', open && isMobile)

  document.querySelectorAll('[data-mobile-nav-toggle]').forEach((btn) => {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false')
  })
}

function closeMobileNav() {
  const panel = mobileNavPanel()
  if (!panel || !isMobileNavOpen(panel)) return
  panel.classList.add(MOBILE_NAV_HIDDEN)
  syncMobileNav()
}

for (const btn of document.querySelectorAll('[data-toggle-target]')) {
  const target = document.querySelector(btn.dataset.toggleTarget)
  const classList = btn.dataset.toggleClass
  if (!target || !classList) continue

  const isNav = btn.dataset.toggleTarget === `#${MOBILE_NAV_ID}`
  if (isNav) {
    btn.setAttribute('data-mobile-nav-toggle', '')
    btn.setAttribute('aria-controls', MOBILE_NAV_ID)
  }

  btn.addEventListener('click', () => {
    for (const token of classList.split(' ').filter(Boolean)) {
      target.classList.toggle(token)
    }
    if (isNav) syncMobileNav()
  })
}

const navPanel = mobileNavPanel()
if (navPanel) {
  navPanel.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!window.matchMedia(MOBILE_MQ).matches) return
      closeMobileNav()
    })
  })
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return
  closeMobileNav()
})

window.addEventListener(
  'resize',
  () => {
    if (window.matchMedia('(min-width: 1280px)').matches) {
      document.body.classList.remove('overflow-hidden')
    } else {
      syncMobileNav()
    }
  },
  { passive: true },
)
