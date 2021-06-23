let anime = []
let watchedAnime = []
const getAnimeArr = () => anime

//Remove duplicates..
const getWatchedAnime = () => watchedAnime
const loadWatched = () => {
    const watchedJSON = localStorage.getItem('watched')
    const unique = Array.from(new Set(JSON.parse(watchedJSON)))
    watchedAnime = watchedJSON ? unique : []
}

const saveAnime = () => {
    localStorage.setItem('watched', JSON.stringify(watchedAnime))
}
loadWatched()

export { getAnimeArr, getWatchedAnime, saveAnime }


const loadInfo = () => {
    jikanjs.loadAnime(19815, 'episodes').then((response) => {
        response.episodes.forEach(element => {
            console.log(`${element.episode_id}: ${element.title} - ${element.title_romanji} - ${element.title_japanese}`);
        })
    }).catch((err) => {
        console.error(err); // in case a error happens
    });
}