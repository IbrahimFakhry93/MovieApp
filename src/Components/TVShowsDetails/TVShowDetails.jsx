import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import styles from './TVShowDetails.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export default function TVShowDetails() {
const[TVDetailsList,setTVDetailsList]=useState([]);
let params=useParams();
console.log(params);
const[pageNum,setPageNum]=useState(1);
const[TVDetails,setTVDetails]=useState(null);

async function getTVDetails(){
   let {data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=7dc30e92ba0ac3e93435b67040ce3212&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${params.pageNum}`) ;
   console.log(data.results);
   setTVDetailsList(data.results);
   setTVDetails(data.results[params.index])
  
}

useEffect(()=>{
    getTVDetails();
},[])


  return (
    <>
    {TVDetails?
   <div className="row py-3">
        <div className="col-md-3 d-flex align-items-center">
            <img className='w-100 h-100' src={"https://image.tmdb.org/t/p/w500"+TVDetails.poster_path} alt={TVDetails.original_name}/>
        </div>
        <div className="col-md-9 d-flex align-items-center">
            <div className="item">
                <h2>{TVDetails.original_name}</h2>
                {/* <p className="h2 text-muted mb-3 d-block">{TVDetails.tagline}</p> */}
                {/* {TVDetails.genres.map((genre,i)=><span key={i} className='d-d-inline-block bg-info p-2 mx-1 rounded-2 mt-1'>{genre.name}</span>)} */}
                <ul className="list-unstyled px-0 py-1 mt-2">
                    <li className="mb-4"> <span className="me-1">Vote:</span>{TVDetails.vote_average}</li>
                    <li className="mb-4"> <span className="me-1">Vote Count:</span>{TVDetails.vote_count}</li>
                    <li className="mb-4"> <span className="me-1">Popularity:</span>{TVDetails.popularity}</li>
                    <li className="mb-1"> <span className="me-1">Release Date:</span>{TVDetails.first_air_date}</li>
                </ul>
                <p className="h5 text-muted">{TVDetails.overview}</p>
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
