import { createContext } from "react";
import React from 'react'
import { useState , useEffect } from "react";
import axios from "axios";

export let trendingContext = createContext(0);

export default function TrendingContextProvider(props){

    const[movieList,setMovieList]=useState([]);
    const[tvList,setTVList]=useState([]);
    const[celebritiesList,setCelebritiesList]=useState([]);
    
    const[pageNum,setPageNum]=useState(1);
    const[currentPage,setCurrentPage]=useState(0);
    let nums=new Array(20).fill(1).map((elem,i)=>i+1);
    
    

   
  async function getAPIs(API,setAPI,duration){
       let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${API}/${duration}?api_key=7dc30e92ba0ac3e93435b67040ce3212`);
       setAPI(data.results);
      //  console.log(data.results);
    }
  
    async function getAPIsPages(pageNum,API,setAPI){
        let {data}=await axios.get(`https://api.themoviedb.org/3/discover/${API}?api_key=7dc30e92ba0ac3e93435b67040ce3212&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`);
        setAPI(data.results);
        setPageNum(pageNum);
      //  console.log(data.results)
     }
    
     function handleCurrentPage(e,number){
        console.log(number);
        console.log("==================");
        console.log(e.target.text);
       let activePage=e.target.text;
        setCurrentPage(activePage);
      }


   useEffect(()=>{
     getAPIs("movie",setMovieList,"day");
     getAPIs("tv",setTVList,"day");
     getAPIs("person",setCelebritiesList,"week");
     getAPIsPages(1,"movie",setMovieList);
     getAPIsPages(1,"tv",setMovieList);
    },[])
    
  

    useEffect(()=>{
    console.log(currentPage);
    },[currentPage])



  
    return <trendingContext.Provider value={{movieList,tvList,celebritiesList,setMovieList,setTVList,setCelebritiesList,getAPIsPages,handleCurrentPage,currentPage,nums,setPageNum,pageNum}}>
      {props.children}
    </trendingContext.Provider>


}
