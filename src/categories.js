const jikanjs = require('jikanjs'); // Uses per default the API version 3

let random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//Random page number === random category
const randomPage = () => {
    for (let i = 0, random = []; i < 10; i++) {
        random[i] = i;
    }
    // randomize the array
    random.sort(() => Math.random() - .5)
    return random.pop()
}

//load the genres from jikan API
const loadGenres = (category) => {

    //work around for last element returning undefined while looping through nodelist
    if (category === undefined) {
        return
    }

    jikanjs.loadGenre('anime', randomPage()).then((resp) => {
        return linkGenres(resp.mal_url, category)
    }).catch((e) => console.error(e))
}

//anime categories
const spanElements = [...document.querySelectorAll('#anime-category')]
for (let i = 0; i < 4; i++) {
    loadGenres(spanElements[i])
}


//Link genres onto page
const linkGenres = (genre, category) => {
    category.innerHTML = `<a href="${genre.url}"> ${genre.name} </a>`
}


export { loadGenres }