import React, { useContext } from 'react'
import axios from 'axios'
import styles from './People.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import avatar from "./avatar.jpg"
import { trendingContext } from '../../Store/Store'
export default function People(props) {
 // console.log(props);
 // console.log("search word in Movies: "+props.searchFilmWord);
  // required last value + 1, we want required last value 13 so the length is 14
  
  const [searchList,setSearchList]=useState([]);
  let{celebritiesList,setCelebritiesList}=useContext(trendingContext);
  
  
  

 //props.searchFilmWord.toLowerCase()
  function searchActor(){
    console.log("search word in searchmovie func in movie app: "+props.searchFilmWord);
      let searchArr= celebritiesList.filter((actor,i)=>actor.original_name.toLowerCase().includes(props.searchFilmWord.toLowerCase()))
     // console.log(searchArr);
    //   setSearchList(searchArr);
    //  console.log(searchList);
    //  return searchList;
     return searchArr;
    }
  
    // searchMovie();

  // if(props.searchFilmWord.length>2){
  //   searchMovie();
  // }
  // else{
  //   setSearchList([]);
  // }




 useEffect(()=>{
 //  console.log(searchList)
 },[searchList])
//  props.searchFilmWord?searchMovie():searchList==[]

  return (
    <>
    <div className="row justify-content-center py-5">
     {/* {(props.searchFilmWord.length>2)?searchActor().length>=1?searchActor().map((movie,i)=> 
      <div key={i} className='col-md-3'>
        <div className="item h-100 py-5 text-center ">
          {/* Don't forget / before movieDetails */}
          {/* <Link to={`/movieDetails/${movie.id}`}>
          <img className='w-75' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.original_title}/>
          <h3 onClick={searchActor} className='h5 my-2 text-center'>
            {movie.original_title}
          </h3>
          </Link>
        </div>
        </div>):<div className='d-flex justify-content-center align-items-center'><h2 className="h1">Not Found</h2></div>
         :
         */}
        
        
        {celebritiesList.map((actor,i) => 
       
        <div key={i} className='col-md-2'>
           <Link to={`/PeopleDetails/${actor.id}`}>
            <div className="item">
           {actor.profile_path===null?<img className={`${styles.img} w-100`} src={avatar} alt=""/>:<img className='w-100' src={"https://image.tmdb.org/t/p/w500"+actor.profile_path} alt=""/>}
           <h3 className='h6 my-2 text-center'>
             {actor.name}
           </h3>
            </div>
            </Link>
         </div>)}
         </div>
    
    {/* <Link className={`page-link ${currentPage === number ? "active" : ""}`}></Link> */}

  
   
    </>
  )
      }