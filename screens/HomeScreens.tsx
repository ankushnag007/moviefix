import React, { useEffect, useState } from 'react';
import { View, Text, Platform, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme/index';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import TrendingMovies from '@/components/trendingMovies';
import MovieList from '@/components/movieList';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS == "ios";

export default function HomeScreens() {
  const [trending, setTrending] = useState([1,2,3,4]);
  console.log(trending,"trending movies");
  
  const [upComing, setUpComing] = useState([1,2,3,4]);
  const [topRated, setTopRated] = useState([1,2,3,4]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
  try {
    // Fetch trending movies
    const trendingResponse = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=001e8e15c7bddf453c8bc88efab35f9f&sort_by=popularity.desc&page=1');
    const trendingData = await trendingResponse.json();
    setTrending(trendingData.results);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};


  return (
    <View style={tw`flex-1 bg-gray-900`}>
      <SafeAreaView style={tw`${ios ? 'mb-2' : 'mb-3'}`}>
        <StatusBar barStyle="light-content" />
        <View style={tw`flex-row justify-between items-center mx-4 mt-2 `}>
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
          <Text style={tw`text-white text-3xl ml-20`}>
            <Text style={styles.text}>Movie</Text><Text >Flix</Text>
          </Text>
          <GestureHandlerRootView>

          <TouchableOpacity style={tw`ml-20`} onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
          </TouchableOpacity>
          </GestureHandlerRootView>
        </View>
      </SafeAreaView>

      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* <TrendingMovies data={trending} /> */}
        <MovieList title='Movies this year' data={trending} />       
          <MovieList title='Top Rated' data={trending} />
        </ScrollView>
      )}
    </View>
  );
}
