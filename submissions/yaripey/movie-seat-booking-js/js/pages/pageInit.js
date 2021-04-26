import mainPage from './main.js'
import administration from './administration.js'
import filmPage from './film.js'

export default function pageInit() {
  const rootElem = document.querySelector('#root')
  
  const search = window.location.search
  const urlParams = new URLSearchParams(search)
  const page = urlParams.get('page')
  switch(page) {
    case 'administration': 
      administration(rootElem)
      break;

    case 'film':
      const filmID = urlParams.get('filmID')
      filmPage(rootElem, filmID)
      break;

    default:
      mainPage(rootElem);
      break;
  }
}
