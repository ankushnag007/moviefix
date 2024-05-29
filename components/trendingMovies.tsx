import { View, Text, Dimensions, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc'; // Import NativeWind utility function
import Carousel from 'react-native-reanimated-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '@/api/moviedb';

interface TrendingMoviesProps {
  data: any[]; // Adjust the type according to your data structure
}

interface MovieCardProps {
  item: any;
  width: number;
  height: number;
  handleClick: () => void;
}

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const handleClick = (item: any) => {
    navigation.navigate('Movie', item );
  };

  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-white text-xl mb-5 p-1`}>Popular Movies</Text>
      <Carousel
      autoPlay
        width={width}
        height={width / 1}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <MovieCard item={item} width={width} height={height} handleClick={() => handleClick(item)} />
        )}
      />
    </View>
  );
};

const MovieCard: React.FC<MovieCardProps> = ({ item, width, height, handleClick }) => {
  console.log(item.poster_path, "check poster path");
  
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:3
      }}
      onPress={handleClick}
    >
      <Image
        // source={require('../assets/images/movie.png')}
        source={{uri:image500(item.poster_path)}}
        style={{
          width: 300, // Adjust the percentage as needed
          height: 800, // Adjust the percentage as needed
          borderRadius: 20,
          margin:5,
          resizeMode:'cover',
          
        }}
      />
    </TouchableOpacity>
  );
};

export default TrendingMovies;
