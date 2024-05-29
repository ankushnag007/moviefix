import axios from 'axios';
import { apiKey } from '@/constants';

const baseUrl = `https://api.themoviedb.org/3/`
const endPoint = `discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=2023&page=1&vot
e_count.gte=100`
console.log(endPoint,"check endpoint");

const movieDetails = (id: any)=> `${baseUrl}/movie/${id}?api_key=${apiKey}`
const movieCredits = (id: any)=> `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMovieUrl = (id: any)=> `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`
const searchrMovie = `${baseUrl}/search/movie?api_key=${apiKey}`


export const image500 = (path: any)=>path?`https://image.tmdb.org/t/p/w500${path}`:null;
export const image342 = (path: any)=>path?`https://image.tmdb.org/t/p/w342${path}`:null;
export const image185 = (path: any)=>path?`https://image.tmdb.org/t/p/w185${path}`:null;

const apiCall = async(endPoint: any , params: any)=>{
    const options = {
        method:"GET",
        url: endPoint,
        params: params ? params : {}
    }
    try{
        const  response = await axios.request(options)
        return response;
    }catch(err){
        console.log(err, 'error while fetching the api');
        return{}
        
    }
}


export const fetchMovieDetails = (id: any) => {
    return apiCall(movieDetails(id))
}

export const fetchMovieCredits = (id: any) => {
    return apiCall(movieCredits(id))
}

export const fetchSimilarMovie = (id: any) => {
    return apiCall(similarMovie(id))
}


export const searchMovie = (params: any) => {
    return apiCall(searchrMovie, params) 
}