import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Container, SearchContainer, Input, SearchButton, Title,BannerButtom,Banner,SliderMovie } from "./styles";
import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem"
import api, {api_key} from "../../services/api";
import { getListMovies,randomBanner } from "../../utils/movies";
import { useNavigation } from "@react-navigation/native";

function Home() {
    const [bannerMovies, setBannerMovies] = useState({});
    const [ nowMovies, setNowMovies ] = useState([]);
    const [ popularMovies, setPopularMovies ] = useState([]);
    const [ topMovies, setTopMovies ] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [ input, setInput ] = useState('');

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

        async function getMovies() {
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: api_key,
                        language: "pt-BR",
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: api_key,
                        language: "pt-BR",
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: api_key,
                        language: "pt-BR",
                        page: 1,
                    }
                })
            ])

            if(isActive) {
                const nowList = getListMovies(10,nowData.data.results);
                const popularList = getListMovies(5,popularData.data.results);
                const topList = getListMovies(5,topData.data.results);
                
                setBannerMovies(nowData.data.results[randomBanner(nowData.data.results)]);
                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);
                setLoading(false);
            }
        }

        getMovies();
        
        return () => {
            isActive = false;
            ac.abort();
        }

    }, []);

    function navigateDetailsPage(item){
        navigation.navigate("Detail", { id: item.id });
    }
    function handleSearchMovies(){
        if(input === '') return;
        navigation.navigate("Search", { name: input });
        setInput('');
    }

    if(loading) {
        return(
            <Container >
                <ActivityIndicator size="large" color="#fff" />
            </Container>
        )
    }

    return (
        <Container>
            <Header title="React Prime"/>
            <SearchContainer>
                <Input 
                    placeholder="Ex Vingadores"
                    placeholderTextColor="#ddd"
                    value={ input }
                    onChangeText={ (text) => setInput(text) }
                />
                <SearchButton onPress={ handleSearchMovies } >
                    <Feather name="search" size={30} color="#fff"/>
                </SearchButton>
            </SearchContainer>
            <ScrollView showsVerticalScrollIndicador={false}>
                <Title>Em cartaz</Title>
                <BannerButtom activeOpacity={0.9} onPress={ () => navigateDetailsPage(bannerMovies) }>
                    <Banner 
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original${bannerMovies.poster_path}` }} 
                    />
                </BannerButtom>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={ ({item}) => <SliderItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
                    keyExtractor={ (item) => String(item.id) }
                />
                <Title>Populares</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({item}) => <SliderItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
                    keyExtractor={ (item) => String(item.id) }
                />
                <Title>Mais votados</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({item}) => <SliderItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
                    keyExtractor={ (item) => String(item.id) }
                />
            </ScrollView>
        </Container>
    )
}
export default Home;