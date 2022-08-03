import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import styles from './MovieDetails.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export default function MovieDetails() {
const[movieDetails,setMovieDetails]=useState(null);

let params=useParams();
console.log(params.id);
async function getMovieDetails(){
   let{data} = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=7dc30e92ba0ac3e93435b67040ce3212&language=en-US`) ;
   setMovieDetails(data);
  //  console.log(data);
}

useEffect(()=>{
  getMovieDetails();
},[])


  return (
    <>
    {movieDetails?
   <div className="row py-5">
        <div className="col-md-3">
            <img className='w-100 h-100' src={"https://image.tmdb.org/t/p/w500"+movieDetails.poster_path} alt={movieDetails.original_title}/>
        </div>
        <div className="col-md-9">
            <div className="item">
                <h2>{movieDetails.original_title}</h2>
                <p className="h2 text-muted mb-3 d-block">{movieDetails.tagline}</p>
                {movieDetails.genres.map((genre,i)=><span key={i} className='d-d-inline-block bg-info p-2 mx-1 rounded-2 mt-1'>{genre.name}</span>)}
                <ul className="list-unstyled px-0 py-1 mt-2">
                    <li className="mb-4"> <span className="me-1">Vote:</span>{movieDetails.vote_average}</li>
                    <li className="mb-4"> <span className="me-1">Vote Count:</span>{movieDetails.vote_average}</li>
                    <li className="mb-4"> <span className="me-1">Popularity:</span>{movieDetails.popularity}</li>
                    <li className="mb-1"> <span className="me-1">Release Date:</span>{movieDetails.release_date}</li>
                </ul>
                <p className="h5 text-muted">{movieDetails.overview}</p>
            </div>
        </div>
   </div>
   
   :
        <div className="layer position-fixed start-0 top-0 w-100 h-100 bg-opacity-50 bg-black d-flex justify-content-center align-items-center">
        <i className="fas fa-spinner fa-spin fs-1"></i>
        </div>}
</>
  )
}
