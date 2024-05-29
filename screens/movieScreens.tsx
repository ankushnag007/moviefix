import { View, Text, Image, SafeAreaView, Platform, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import { apiKey } from '@/constants';
import axios from 'axios';
import { styles } from '../theme/'
import Cast from '@/components/cast';
import MovieList from '../components/movieList';
import { fetchMovieDetails,fetchMovieCredits, image500 } from '@/api/moviedb';
const { width, height } = Dimensions.get('window');

interface MovieScreensProps {
    handleClick: () => void;
    navigation: () => void;
    hideSeeAll: () => boolean;
}


export default function MovieScreens() {
    let moviename = "Me and you"
    const navigation = useNavigation();
    const { params: item } = useRoute();
    const ios = Platform.OS == 'ios';
    const topMargin = ios ? "" : 'marginTop:3'
    const [cast, setCast] = useState(['Tom hanks', 'Daniel craige', 'Tom criuz', 'Tom hanks', 'Daniel craige', 'Tom criuz'])
    const [similarMovies, setSimilarMovies] = useState(['Tom hanks', 'Daniel craige', 'Tom criuz', 'Tom hanks', 'Daniel craige', 'Tom criuz'])
    const [movieDetails, setMovieDetails] = useState({})
    const [ movieCredits, setMovieCredits] = useState({})
    const [ movieCast, setMovieCast] = useState([])

    useEffect(() => {
        console.log(item?.id, "id check");
        getMovieDetails(item?.id)
        getMovieCredits(item?.id)

    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        // console.log(data.data, "movie detai ls");
        setMovieDetails(data?.data);
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        console.log(data.data, "movie c");
        setMovieCredits(data?.data);
        setMovieCast(data?.data?.cast)
    }



    return (
        <GestureHandlerRootView>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                style={tw`flex-1 bg-gray-900`}
            >
                <View style={tw`w-full relative`}>
                    <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4`}>
                        <TouchableOpacity style={tw`p-1 pt-3`} onPress={() => navigation.goBack()}>
                            <ChevronLeftIcon size="28" strokeWidth={2.5} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`p-1 pt-3`}>
                            <HeartIcon size="28" strokeWidth={2.5} color='white' />
                        </TouchableOpacity>
                    </SafeAreaView>
                    <View>
                        <Image
                            source={{
                                uri: image500(movieDetails?.poster_path || "https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg"
                                )
                            }}
                            style={{ width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={[tw`absolute bottom-0`, { width, height: height * 0.22, borderRadius: 10 }]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                        />

                    </View>
                </View>
                <View style={[tw`my-3`, { marginTop: -(height * 0.09), borderRadius: 10 }]}>
                    <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
                        {movieDetails?.title}
                    </Text>
                    <Text style={tw`text-gray-400 text-center text-base font-bold tracking-wider`}>
                        Released on ○ {movieDetails?.release_date} ○ {movieDetails?.runtime} min
                    </Text>
                    <View style={tw`flex-row justify-center mx-4`}>
                        <View style={tw`flex-row justify-center mx-4`}>
                            {movieDetails?.genres?.map((genre, index) => {
                                let showDot = index + 1 !== movieDetails.genres.length;
                                return (
                                    <React.Fragment key={index}>
                                        <Text style={tw`text-white text-center text-sm font-bold tracking-wider`}>
                                            {genre.name}
                                        </Text>
                                        {showDot && <Text style={tw`text-white text-center text-sm font-bold tracking-wider`}> * </Text>}
                                    </React.Fragment>
                                );
                            })}
                        </View>



                    </View>
                    <Text style={tw`text-gray-400 mx-4 mt-3`}>
                        {movieDetails?.overview}
                    </Text>
                </View>
                <Text style={tw`text-gray-400 mx-4 mt-3`}>
                    Vote Count {movieDetails?.vote_count}
                </Text>
                <Cast navigation={navigation} cast={movieCast} />
                <View style={tw`mt-5`}>
                    {/* <MovieList title="Similiar Movies" hideSeeAll={true} data={similarMovies} /> */}
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}