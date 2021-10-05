// limitar um numero de filmes para a lista
export function getListMovies(size, movies) {
    let popularMovies = [];
    for(let i = 0,s = size; i < s; i++) {
        popularMovies.push(movies[1]);
    }
    return popularMovies;
}

export function randomBanner(movies) {
    return Math.floor(Math.random() * movies.length );
}