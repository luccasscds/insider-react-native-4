import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key);
    let moviesSave = JSON.parse(myMovies) || [];
    return moviesSave;
}

export async function saveMovies(key, newMovie){
    let movieStored = await getMoviesSave(key);
    const hasMovie = movieStored.some( item => item.id === newMovie.id );
    if(hasMovie){
        return;
    }
    movieStored.push(newMovie);
    await AsyncStorage.setItem(key, JSON.stringify(movieStored));
}

export async function deleteMovie(id){
    let movieStored = await getMoviesSave('@asdasdfasfasfa');
    let myMovies = movieStored.filter( item => {
        return(item.id !== id);
    });
    await AsyncStorage.setItem('@asdasdfasfasfa', JSON.stringify(myMovies));
    return myMovies;
}

export async function hasMovie(movie){
    let movieStored = await getMoviesSave('@asdasdfasfasfa');
    const hasMovie = movieStored.find( item => item.id === movie.id );
    if(hasMovie) return true;
    return false;
}