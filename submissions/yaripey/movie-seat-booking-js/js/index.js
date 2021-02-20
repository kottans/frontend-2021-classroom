import pageSwitcher from './pages/pageSwitcher.js'
import pageInit from './pages/pageInit.js'

const headerLink = document.querySelector('.logo')
headerLink.addEventListener('click', (e) => {
  e.preventDefault()
  pageSwitcher('')
})

const administrationLink = document.querySelector('.settings-buttons-link')
administrationLink.addEventListener('click', (e) => {
  e.preventDefault()
  pageSwitcher('?page=administration')
})

window.onpopstate = (e) => {pageInit()}

pageInit()
