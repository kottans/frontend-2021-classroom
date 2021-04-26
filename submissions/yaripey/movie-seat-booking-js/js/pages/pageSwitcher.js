import pageInit from './pageInit.js'

const url = 'https://yaripey.github.io/cinema-html-css/'

export default function pageSwitcher(destination) {
  window.history.pushState(null, null, url + destination)
  pageInit();
}
