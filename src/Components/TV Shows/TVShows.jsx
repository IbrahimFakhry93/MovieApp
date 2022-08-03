import React, { useContext } from 'react'
import axios from 'axios'
import styles from './TvShows.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { trendingContext } from '../../Store/Store'

export default function TVShows(props) {
 // console.log(props);
 // console.log("search word in Movies: "+props.searchFilmWord);
  // required last value + 1, we want required last value 13 so the length is 14
 
  let {tvList,setTVList,getAPIsPages,handleCurrentPage,currentPage,nums,pageNum}=useContext(trendingContext);
  const [searchList,setSearchList]=useState([]);
 
  // if(props.searchFilmWord){
  //   searchMovie();
  // }



 //props.searchFilmWord.toLowerCase()
  // function searchMovie(){
  //   console.log("search word in searchmovie func in movie app: "+props.searchFilmWord);
  //     let searchArr= setTVList.filter((movie,i)=>movie.original_title.toLowerCase().includes(props.searchFilmWord.toLowerCase()))
     // console.log(searchArr);
    //   setSearchList(searchArr);
    //  console.log(searchList);
    //  return searchList;
  //    return searchArr;
  //   }
  
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
useEffect(()=>{
  console.log(currentPage);
 },[currentPage])
  return (
    <>
    <div className="row justify-content-center py-5">
     {/* {(props.searchFilmWord.length>2)?searchMovie().length>=1?searchMovie().map((movie,i)=> 
      <div key={i} className='col-md-3'>
        <div className="item h-100 py-5 text-center ">
          {/* Don't forget / before movieDetails */}
          {/* <Link to={`/movieDetails/${movie.id}`}>
          <img className='w-75' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.original_title}/>
          <h3 onClick={searchMovie} className='h5 my-2 text-center'>
            {movie.original_title}
          </h3>
          </Link>
        </div>
        </div>):<div className='d-flex justify-content-center align-items-center'><h2 className="h1">Not Found</h2></div>:  */}
     
     {tvList.map((tv,i)=> <div key={i} className='col-md-2'>
      <div className="item">
       <Link to={`/TVDetails/${i}/${pageNum}`}>
        <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+tv.poster_path} alt=""/>
        <h3 className='h6 my-2 text-center'>
          {tv.original_title}
        </h3>
        </Link>
      </div>
      </div> )
        }
    </div>
    
    {/* <Link className={`page-link ${currentPage === number ? "active" : ""}`}></Link> */}

    <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center ">
          {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
          {nums.map((number,i)=><li onClick={(e)=>{getAPIsPages(i+1,"tv",setTVList); handleCurrentPage(e,number)}} key={i} className="page-item"><a className={`${styles.page} bg-transparent border-0 page-link ${currentPage == number ? "text-danger" : ""}`} >{i+1}</a></li>)}
        
          {/* <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
        </ul>
    </nav>
   
    </>
  )
      }