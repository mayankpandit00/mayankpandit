import './styles/main.css'

import initLoader from './components/loader.js'
import initBackground from './components/background.js'
import { initScroller } from './components/scroller.js'
import initNavbar from './components/navbar.js'
import initHome from './components/home.js'

initLoader()
initBackground()
initScroller()
initNavbar()
initHome()

function lazyInit(selector, importer) {
  const element = document.querySelector(selector)
  if (!element) return

  const observer = new IntersectionObserver(async ([entry], obs) => {
    if (entry.isIntersecting) {
      const mod = await importer()
      mod.default?.()
      obs.disconnect()
    }
  }, {
    rootMargin: '300px'
  })

  observer.observe(element)
}

lazyInit('#about', () => import('./components/about.js'))
lazyInit('#skills', () => import('./components/skills.js'))
lazyInit('#resume', () => import('./components/resume.js'))
lazyInit('#projects', () => import('./components/projects.js'))
lazyInit('#contact', () => import('./components/contact.js'))
