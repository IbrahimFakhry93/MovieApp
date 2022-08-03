import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import styles from './PeopleDetails.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export default function PeopleDetails() {
const[actorDetails,setActorDetails]=useState(null);
let params=useParams();
console.log(params.id);
async function getActorDetails(){
   let{data} = await axios.get(`https://api.themoviedb.org/3/person/${params.id}?api_key=7dc30e92ba0ac3e93435b67040ce3212&language=en-US`) ;
   setActorDetails(data);
  //  console.log(data);
}

useEffect(()=>{
  getActorDetails();
},[])


  return (
    <>
    {actorDetails?
   <div className="row py-5">
        <div className="col-md-4">
            <img className='w-100 h-100' src={"https://image.tmdb.org/t/p/w500"+actorDetails.profile_path} alt={actorDetails.name}/>
        </div>
        <div className="col-md-8">
            <div className="item">
                <h2>{actorDetails.name}</h2>
                <p className="h6 text-muted mb-3 d-block">{actorDetails.biography}</p>
                <span  className='d-d-inline-block bg-info p-2 mx-1 rounded-2 mt-1'>{actorDetails.known_for_department}</span>
                <ul className="list-unstyled px-0 py-1 mt-2">
                    <li className="mb-4"> <span className="me-1">Birthday:</span>{actorDetails.birthday}</li>
                    <li className="mb-4"> <span className="me-1">Place of Birth:</span>{actorDetails.place_of_birth}</li>
                    <li className="mb-4"> <span className="me-1">Popularity:</span>{actorDetails.popularity}</li>
                </ul>
                {/* <p className="h5 text-muted">{actorDetails.biography}</p> */}
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