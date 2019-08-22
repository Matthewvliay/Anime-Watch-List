

import { getAnimeArr, saveAnime, getWatchedAnime } from './anime'

const renderWatchList = () => {
    const watchedEl = document.querySelector('.watched')
    // const { watched } = getAnimeArr()

    // const notWatched = getAnimeArr().filter((anime) => !anime.watched)
    // console.log(notWatched)

    watchedEl.innerHTML = ''
    if (getWatchedAnime().length > 0) {
        getWatchedAnime().forEach((anime) => {
            watchedEl.appendChild(generateWatchList(anime))
        })
    }
}
const generateWatchList = (anime) => {
    const animeEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const animeTitle = document.createElement('span')

    //checkbox

    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', `${anime.mal_id}`)
    checkbox.checked = anime.watched
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {
        anime.watched = !anime.watched
        renderWatchList()
        saveAnime()
    })

    //setup the anime title
    animeTitle.textContent = anime.title
    containerEl.appendChild(animeTitle)

    //Container
    animeEl.appendChild(containerEl)

    return animeEl
}



export { generateWatchList, renderWatchList }