import './App.css';
import { useState, useEffect } from 'react';
import { Route,Routes, Navigate, useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Register from './Components/Registeration/Register';
import Login from './Components/Login/Login';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import TVShows from './Components/TV Shows/TVShows';
import People from './Components/People/People';
import About from './Components/About/About';
import Network from  './Components/Network/Network';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import NotFound from './Components/Not Found/NotFound';
import PeopleDetails from './Components/PeopleDetails/PeopleDetails';
import TVShowDetails from './Components/TVShowsDetails/TVShowDetails';
import TrendingContextProvider from './Store/Store';


export default function App() {
  let navigate=useNavigate();
  const[searchMovieWord,setSearchMovieWord]=useState("");

  function inputSearchWord(x){
    console.log("Search Word from NavBar in APP: "+x);
    setSearchMovieWord(x);
    navigate('/movies');
  }
  useEffect(()=>{
    console.log("movie word in useEffect: "+searchMovieWord)
  },[searchMovieWord])


  const[userToken,setToken]=useState(null);
  
  function decodeToken(){
    let encodedToken=localStorage.getItem("User Token");
    let decodedToken=jwtDecode(encodedToken);
    setToken(decodedToken);
    // console.log( decodedToken);
  }
 
  function ProtectRoute(props){
    // console.log(props.children);
    if(localStorage.getItem("User Token") === null){
      // navigate to login
      return <Navigate to='/login/'/>
    }
    else{
        // navigate to required component
        return props.children
    }
  }

  function logOut(){
    setToken(null);
    localStorage.removeItem('User Token');
    navigate('/login');
  }

  // Why we called decodeToken inside userEffect?
  // Answer:
  // When a user does a Refresh to the web page first component to be called is App.
  // first method to be called is userEffect in ComponentDidMount phase.
  // when APP component reload, first method to be called is userEffect
  // to avoid removing user token by the above statement  const[userToken,setToken]=useState(null) >>
  // when the user refresh the page after login.

  useEffect(()=>{
    if(localStorage.getItem('User Token')){
     decodeToken();
    }
  },[])  // note: the parameter of useEffect is [] empty array so we are in mounting phase.

  
  return (
    <>
    <NavBar inputSearchWordFunc={inputSearchWord} logout={logOut} userToken={userToken}/>
    <div className='container py-3'>
    <TrendingContextProvider>
    <Routes>

  
      <Route path='/' element={<ProtectRoute><Home/></ProtectRoute>}></Route>
      <Route path='home'  element={<ProtectRoute><Home/></ProtectRoute>}></Route>
      <Route path='movies' element={<ProtectRoute><Movies  searchFilmWord={searchMovieWord} /></ProtectRoute>}></Route>
      <Route path='tvshows' element={<ProtectRoute><TVShows/></ProtectRoute>}></Route>
      <Route path='people' element={<ProtectRoute><People/></ProtectRoute>}></Route>
   

    <Route path='PeopleDetails' element={<ProtectRoute><PeopleDetails/></ProtectRoute>}>
    <Route path=':id' element={<ProtectRoute><PeopleDetails/></ProtectRoute>}></Route>
    </Route>
    <Route path='movieDetails' element={<ProtectRoute><MovieDetails/></ProtectRoute>}>
    <Route path=':id' element={<ProtectRoute><MovieDetails/></ProtectRoute>}></Route>
    </Route>
    <Route path='TVDetails' element={<ProtectRoute><TVShowDetails/></ProtectRoute>}>
    <Route path=':index/:pageNum' element={<ProtectRoute><TVShowDetails/></ProtectRoute>}></Route>
    </Route>
    <Route path='about' element={<ProtectRoute><About/></ProtectRoute>}></Route>
    <Route path='networks' element={<ProtectRoute><Network/></ProtectRoute>}></Route>
    <Route path='login' element={<Login decodeToken={decodeToken}/>}></Route>
    <Route path='register' element={<Register />}></Route>
    <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </TrendingContextProvider>
    </div>
    </>
  );
}


