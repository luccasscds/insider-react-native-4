import React, { useState, useEffect } from "react";
import { Container, ListMovie } from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import api,{ api_key } from "../../services/api";
import SearchItem from "../../components/SearchItem";

function Search() {
    const [ movies, setMovies ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect( () => {
        let isActive = true;

        async function getMovies() {
            const response = await api.get('/search/movie', {
                params: {
                    query: route?.params?.name,
                    api_key: api_key,
                    language: "pt-BR",
                    page: 1
                }
            })
            if(isActive) {
                setMovies(response.data.results);
                setLoading(false);
            }
        }

        if(isActive) {
            getMovies();
        }
        return () => {
            isActive = false;
        }

    }, [] )

    function navigateDetailsPage(item){
        navigation.navigate("Detail", { id: item.id });
    }

    if(loading){
        return(
            <Container></Container>
        )
    }

    return(
        <Container>
            <ListMovie
                data={movies}
                showsVerticalScrollIndicador={false}
                keyExtractor={ (item) => String(item.id) }
                renderItem={ ({ item }) => <SearchItem data={ item } navigatePage={ () => navigateDetailsPage(item) } /> }
            />
        </Container>
    )
}
export default Search;