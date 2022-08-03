import React, { useContext } from 'react'
import {trendingContext} from "../../Store/Store"
import styles from './Home.module.css'
import axios from 'axios'
import avatar from "./avatar.jpg"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home() {

  let {movieList,tvList,celebritiesList}=useContext(trendingContext);
  
//   const[movieList,setMovieList]=useState([]);
//   const[tvList,setTVList]=useState([]);
//   const[celebritiesList,setCelebritiesList]=useState([]);

// async function getAPIs(API,setAPI){
//      let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${API}/day?api_key=7dc30e92ba0ac3e93435b67040ce3212`);
//      setAPI(data.results.slice(0,10));
    //  console.log(data.results);
//   }

//  useEffect(()=>{
//    getAPIs("movie",setMovieList);
//    getAPIs("tv",setTVList);
//    getAPIs("person",setCelebritiesList);
//   },[])




  return (
    
    <>
    <div className='row gy-5 py-4'>
      <div className='col-md-4 d-flex align-items-center'>
        <div className="item"> 
        <div className="mb-3 brdr w-50"></div>
          {/* question <br> or <br/> */}
          <h2>Trending<br/>Movies<br/>To watch now</h2>
          <p className='text-muted'>Most watched movies by day</p>
          <div className="mt-3 brdr"></div>
        </div>
      </div>
      {movieList.slice(0,10).map((movie,i)=> 
      <div key={i} className='col-md-2'>
        <div className="item">
          {/* Don't forget / before movieDetails */}
          <Link to={`/movieDetails/${movie.id}`}>
          <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.original_title}/>
          <h3 className='h6 my-2 text-center'>
            {movie.original_title}
          </h3>
          </Link>
        </div>
        </div> )}
      
   


      <div className='col-md-4 d-flex align-items-center'>
        <div className="item"> 
        <div className="mb-3 brdr w-50"></div>
        <h2>Trending<br/>TV Shows<br/>To watch now</h2>
          <p className='text-muted'>Most watched TV Shows by day</p>
          <div className="brdr mt-3"></div>
        </div>
      </div>
      {tvList.slice(0,10).map((tv,i)=> <div key={i} className='col-md-2'>
        <div className="item">
          <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+tv.poster_path} alt=""/>
          <h3 className='h6 my-2 text-center'>
            {tv.original_title}
          </h3>
        </div>
        </div> )}
      
 


   
      <div className='col-md-4 d-flex align-items-center'>
        <div className="item"> 
        <div className="mb-3 brdr w-50"></div>
          <h2>Trending Celebrities<br/></h2>
          <p className='text-muted'>Most Trending Celebrities by day</p>
          <div className="mt-3 brdr"></div>
        </div>
      </div>
      {celebritiesList.slice(0,10).map((actor,i)=> <div key={i} className='col-md-2'>
        <div className="item">
          {actor.profile_path===null?<img className={`${styles.img} w-100`} src={avatar} alt=""/>:<img className='w-100' src={"https://image.tmdb.org/t/p/w500"+actor.profile_path} alt=""/>}
          <h3 className='h6 my-2 text-center'>
            {actor.name}
          </h3>
        </div>
        </div> )}
        </div>
    
    </>
  )
}
