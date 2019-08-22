import { getAnimeArr } from './anime'
const jikanjs = require('jikanjs'); // Uses per default the API version 3
const anime = getAnimeArr()
const fetchAnime = async (name) => {

    const data = await jikanjs.search('anime', `${name}&page=1`).then((resp) => {

        //sets a 'watched' property to each anime.
        anime.map(a => a.watched = false)
        anime.push(...resp.results)
    })

    return data
}


export { fetchAnime }