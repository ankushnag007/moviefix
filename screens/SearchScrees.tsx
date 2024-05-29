import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ChevronLeftIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { image185, searchMovie } from '@/api/moviedb'; 

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const [results, setResults] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigation = useNavigation();
    let movieName = "test gshdgshd  hasdsdu";

    const handleClick = (item: any) => {
        navigation.push('Movie', { item });
    };

    const handleSearch = (value: any) => {
console.log(value, "search value");
if(value && value.length>2){
    setLoading(false);
    searchMovie({
        query:value,
        include_adult:'false',
        language: 'en-US',
        page:1 
    }).then(data=>{
        setLoading(false)
        console.log(data.data, "check earched movies");
    setResults(data?.data?.results)
        
    })
    
}else{
    setLoading(false)
    setResults([])
}
    }

    const handleTextDebound = useCallback(debounce(handleSearch,400), []);

    // handeSearch
    return (
        
        <GestureHandlerRootView>
            <SafeAreaView style={tw`bg-gray-900 flex-1 pt-5`}>
                <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-white rounded-full`}>
                    <TextInput placeholder='Search Movies' placeholderTextColor='gray'
                     onChangeText={handleTextDebound}
                        style={tw`p-3 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
                    />
                    <TouchableOpacity style={tw`mr-1 bg-gray-300 rounded-full`} onPress={() => navigation.navigate('Home')}>
                        <XMarkIcon size="28" strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                </View>
                
                {/* Conditionally render loader if loading */}
                {loading ? (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                ) : (
                    // Render search results if not loading
                    results.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} style={tw`my-3`}>
                            <Text style={tw`text-white font-semibold ml-1`}>Results ({results.length>0?results.length :0})</Text>
                            <View style={tw`flex-row flex-wrap justify-between`}>
                                {results.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleClick(item)} style={tw`my-2 mb-4`}>
                                        <Image
                                            // source={require('../assets/images/movie.png')}
                                            source={{uri:image185(item?.poster_path)}}
                                            style={{ width: (width - 45) / 2, height: height * 0.3, borderRadius: 10 }}
                                        />
                                        <Text style={tw`text-white text-center`}>{item?.title?.slice(0, 14) + "..."}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        // Render no results message if results are empty
                        <Text style={tw`text-white font-bold text-xl justify-center items-center text-center pt-5`}>No Movie by this name</Text>
                    )
                )}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
