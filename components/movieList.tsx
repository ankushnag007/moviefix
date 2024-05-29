import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { image342 } from '@/api/moviedb';
import tw from 'twrnc';
import { styles } from '@/theme';
import { Chip } from 'react-native-paper';

interface MovieListProps {
  title: string;
  data: any[];
  hideSeeAll: boolean;
}

const { width, height } = Dimensions.get('window');

const MovieList: React.FC<MovieListProps> = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  console.log(data, "data of all movies");

  const handleClick = (item: any) => {
    navigation.navigate('Movie', item);
  };

  // Group movies by release year
  const moviesByYear: { [year: string]: any[] } = {};
  data.forEach((movie) => {
    const year = new Date(movie.release_date).getFullYear().toString();
    if (!moviesByYear[year]) {
      moviesByYear[year] = [];
    }
    moviesByYear[year].push(movie);
  });

  return (
    <View style={tw`mb-8 `}>
      {Object.entries(moviesByYear).map(([year, movies]) => (
        <View key={year}>
          <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white text-2xl font-bold`}>{`Year ${year}`}</Text>
            {!hideSeeAll && <Text style={styles.text}>See All</Text>}
          </View>
          <GestureHandlerRootView>
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 15,
                flexDirection: 'row', // Set flexDirection to 'row' for two columns
                flexWrap: 'wrap', // Allow content to wrap to the next row
                justifyContent: 'space-between', // Align items in each row
              }}
            >
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleClick(item)}
                  style={{
                    width: '48%', // Set width to fit two columns with some spacing
                    marginBottom: 10, // Add some vertical spacing between rows
                  }}
                >
                  <View style={tw`my-4  mt-3`}>
                    <Image
                      source={{ uri: image342(item.poster_path) }}
                      style={{
                        width: 100,
                        height: 200,
                        aspectRatio: 2 / 3, // Maintain the aspect ratio of the image
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <Text style={tw`text-white text-center justify-center text-center items-center`} numberOfLines={1}>
                    {item?.title?.slice(0, 20) + '...'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </GestureHandlerRootView>
        </View>
      ))}
    </View>
  );
};

export default MovieList;
