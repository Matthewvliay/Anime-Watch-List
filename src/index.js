import "core-js/stable";
import "regenerator-runtime/runtime";
import { loadGenres } from './categories'
import { fetchAnime } from './requestAPI'
import { renderWatchList } from './views'
import { saveAnime, getAnimeArr, getWatchedAnime } from './anime'
loadGenres()
renderWatchList()
const anime = getAnimeArr()
let watchedAnime = getWatchedAnime()




function findMatch(wordMatch, anime) {
    return anime.filter(anime => {
        //filter by name of anime
        const regex = new RegExp(wordMatch, 'gi')
        return anime.title.match(regex)
    })
}

//anime info for the title
function renderInfo(title) {

}

function displayMatches(val) {
    fetchAnime(val) // search ..
    //if the searchbar is empty

    if (val === '') {
        return
    } else {
        console.log("YOOOOO")
        const matchedAnime = findMatch(val, anime)
        const html = matchedAnime.slice(0, 10).map(anime => {
            const regex = new RegExp(val, 'gi')
            const data = anime.title.replace(regex, `<span>${val}</span>`)

            return `
            <div>
                <ul>
                    <button class="info" id=${anime.title}> Click here to see more info </button>
                    <li> Title: ${data} </li> 
                    <div> <img src="${anime.image_url}"> </div>
                    <button class="watch" id=${anime.mal_id}>Add ${anime.title} to your watch list</button>
                </ul>
            </div>
            `
        }).join('')
        suggestion.innerHTML = html

        watchButton(matchedAnime)
        infoButton(matchedAnime)
    }

}

const watchButton = (animeList) => {
    const watch = [...document.querySelectorAll('.watch')]
    if (watch) {
        watch.forEach(button => button.addEventListener('click', (e) => {
            const idList = animeList.map(a => a.mal_id)
            const idMatch = idList.find(a => a === parseInt(e.target.id))
            addToWatchList(animeList, idMatch) // Take in the title
        }))
    }
}

const addToWatchList = (animeList, id) => {
    const selectedAnime = animeList.find(a => a.mal_id === id)
    watchedAnime.push(selectedAnime)
    saveAnime()
    renderWatchList()
}

const getMoreInfo = (animeList, title) => {
    modal.style.display = 'block'
    const selectedAnime = animeList.find(a => a.title === title)
    console.log(watchedAnime);

}

const infoButton = (animeList) => {
    const info = [...document.querySelectorAll('.info')]
    if (info) {
        info.forEach(button => button.addEventListener('click', (e) => {
            const titleList = animeList.map(a => a.title)
            const titleMatch = titleList.find(title => title === e.target.id)
            getMoreInfo(animeList, titleMatch) // Take in the title
        }))
    }

}





//add submit button ?
const searchInput = document.querySelector('.search')
const suggestion = document.querySelector('.suggestions')
const modal = document.querySelector('.modal')


const submit = document.getElementById('search-anime')
console.log(submit);
submit.addEventListener('submit', (e) => {
    e.preventDefault()
    // this.disabled = true;
    console.log("Form has been submitted");
    // setTimeout(() => {
    //     // this.disabled = false
    //     // console.log(this.disabled)
    // }, 5000)
    displayMatches(searchInput.value);
})


// searchInput.addEventListener('change', displayMatches)
// searchInput.addEventListener('keyup', displayMatches)
