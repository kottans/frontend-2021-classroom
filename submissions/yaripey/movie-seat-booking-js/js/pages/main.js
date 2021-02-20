import { getAllFilms } from '../common/queries.js'
import pageSwitcher from './pageSwitcher.js'
import { 
  createWaiterMarkUp, 
  fetchErrorMarkUp,
  shortenDescription
} from '../common/helpers.js'

const descriptionLength = 200

const mainPage = (rootElem) => {
  rootElem.innerHTML = createWaiterMarkUp()
  
  getAllFilms()
    .then(res => res.json())
    .then(res => {
      const films = res.data.allFilms

      rootElem.innerHTML = ''

      const filmPosters = films.map(film => makeFilmPoster(
        film.name,
        film.description, 
        film.posterLink, 
        film.id))
      filmPosters.forEach(filmPoster => rootElem.append(filmPoster))
    })
    .catch(err => {
      rootElem.innerHTML = fetchErrorMarkUp()
    })

}

const makeFilmPoster = (name, description, posterLink, id) => {
  const filmPoster = document.createElement('a')
  filmPoster.classList.add('poster', 'floating-card')
  filmPoster.innerHTML = `
    <h3>${name}</h3>
    <div class="image-container" style="background-image: url('${posterLink}')">
    </div>
    <div class="description-short">
      ${shortenDescription(description, descriptionLength)}
    </div>
  `

  filmPoster.addEventListener('click', (e) => {
    pageSwitcher(`?page=film&filmID=${id}`)
  })
  
  return filmPoster
}

export default mainPage
