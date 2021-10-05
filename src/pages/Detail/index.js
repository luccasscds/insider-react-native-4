import React, { useState, useEffect } from "react";
import { Container, Header, HeaderButton, Banner, ButtonLink, Title, ContentArea, Rate, ListGenres, Description } from "./style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import api,{ api_key } from "../../services/api";
import Stars from "react-native-stars";
import Genres from "../../components/Genres";
import { ScrollView, Modal } from "react-native";
import ModalLink from "../../components/ModalLink";
import { saveMovies, hasMovie, deleteMovie } from "../../utils/storage";

function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const [movie, setMovie] = useState({});
    const [openLink, setOpenLink] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState(false);

    useEffect( () => {
        isActive = true;

        async function getMovie(){
            const response = await api.get(`/movie/${route.params?.id}`, {
                params: {
                    api_key: api_key,
                    language: 'pt-BR'
                }
            })
            .catch( (err) => {
                console.log(err)
            })
            if(isActive) {
                setMovie(response.data);
                const isFavorite = await hasMovie(response.data);
                setFavoriteMovies(isFavorite);
            }
        };
        if(isActive){
            getMovie();
        }

        return () => {
            isActive = false;
        }
    }, []);

    async function handleFavoriteMovie(movie){
        if(favoriteMovies){
            await deleteMovie(movie.id);
            setFavoriteMovies(false);
        }else{
            await saveMovies('@asdasdfasfasfa', movie);
            setFavoriteMovies(true);
        }
    }
    
    return (
        <Container>
            <Header>
                <HeaderButton onPress={ () => navigation.goBack() } >
                    <Feather name="arrow-left" size={28} color="#fff" />
                </HeaderButton>
                <HeaderButton onPress={ () => handleFavoriteMovie(movie) } >
                    { favoriteMovies ? (
                        <Ionicons name="bookmark" size={28} color="#fff" />
                    ) : (
                        <Ionicons name="bookmark-outline" size={28} color="#fff" />
                    )}
                </HeaderButton>
            </Header>

            <Banner
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
            />

            <ButtonLink onPress={ ()=> setOpenLink(true) } >
                <Feather name="link" size={24} color="#fff" />
            </ButtonLink>

            <Title numberOfLines={1} >{ movie.title }</Title>

            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={ <Ionicons name="md-star" size={24} color="#e7a74a" /> }
                    emptyStar={ <Ionicons name="md-star-outline" size={24} color="#e7a74a" /> }
                    halfStar={ <Ionicons name="md-star-half" size={24} color="#e7a74a" /> }
                    disable={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>

            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={ (item) => String(item.id) }
                renderItem={ ({item})=> <Genres data={item} /> }
            />

            <ScrollView showsVerticalScrollIndicator={false} >
                <Title>Sinopse</Title>
                <Description>{ movie?.overview }</Description>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={ openLink } >
                <ModalLink
                    link={ movie?.homepage }
                    title={ movie?.title }
                    closeModal={ () => setOpenLink(false) }
                />
            </Modal>
        </Container>
    )
}

export default Detail;