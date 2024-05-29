import { View, Text, Image, Dimensions, Platform, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '@/components/movieList';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == "ios";
// const verticalMargn = ios ? "": marginTop:3
export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFaourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies]= useState([1,2,3,4])
    // const toggleFavourite =()=>{

    // }
    return (
        <GestureHandlerRootView>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                style={tw`flex-1 bg-gray-900`}
            >
                <View style={tw`w-full relative`}>
                    <SafeAreaView style={tw` z-20 w-full flex-row justify-between items-center px-4`}>
                        <TouchableOpacity style={tw`p-1 pt-3`} onPress={() => navigation.goBack()}>
                            <ChevronLeftIcon size="28" strokeWidth={2.5} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`p-1 pt-3`} onPress={() => toggleFavourite(!isFaourite)}>
                            <HeartIcon size="28" strokeWidth={2.5} color={isFaourite ? 'red' : 'white'} />
                        </TouchableOpacity>
                    </SafeAreaView>
                    <View style={tw`flex-row justify-center`}>
                        <View style={tw`items-center rounded-full overflow-hidden h-72 w-72 border border-white`}>
                            <Image source={require('../assets/images/movie.png')}
                                style={{ height: height * 0.43, width: width * 0.74 }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 80 }}>
                    <View style={[tw`my-3 mt-10`, { marginTop: -(height * 0.09), borderRadius: 10 }]}>
                        <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
                            Jr.  John Carter
                        </Text>
                        <Text style={tw`text-gray-400 text-center text-base font-bold tracking-wider`}>
                            London , United Kingdom
                        </Text>
                                               
                    </View>
                    <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-gray-300 rounded-full`}>
                        <View style={tw`border-r-2 px-2`}>
                            <Text style={tw`text-white font-semibold`}>Gender</Text>
                            <Text style={tw`text-white text-sm items-center justify-center ml-2`}>Male </Text>
                        </View>
                        <View style={tw`border-r-2 px-2`}>
                            <Text style={tw`text-white font-semibold`}>Birthday</Text>
                            <Text style={tw`text-white text-sm items-center justify-center`}>14-05-1994</Text>
                        </View>
                        <View style={tw`border-r-2 px-2`}>
                            <Text style={tw`text-white font-semibold`}>Known for</Text>
                            <Text style={tw`text-white text-sm items-center justify-center `}>Acting</Text>
                        </View>
                        <View style={tw`border-r-2 px-2`}>
                            <Text style={tw`text-white font-semibold`}>Popularity</Text>
                            <Text style={tw`text-white text-sm items-center justify-center ml-2`}>45.5m </Text>
                        </View>
                    </View>
                    <View style={tw`border-r-2 px-2`}>
                            <Text style={tw`text-white font-semibold mx-2 mt-5 mb-2`}>Biography</Text>
                            <Text style={tw`text-gray-700 text-sm items-center justify-center ml-2 tracking-wide`}>
                            William Henry Gates III is an American businessman, investor, philanthropist, and writer best known for co-founding the software giant Microsoft, along with his childhood friend Paul Allen.
                                 </Text>
                        </View>
                </View>
                <View style={tw`border-r-2  pt-2`}>
                <MovieList title="Movies" hideSeeAll={true} data={personMovies}/>
                </View>

            </ScrollView>
        </GestureHandlerRootView>
    )
}