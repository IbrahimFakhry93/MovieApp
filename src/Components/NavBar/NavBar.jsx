import React from 'react'
import styles from './NavBar.module.css'
import { Link,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function NavBar(props) {
  // console.log(props)
  function searchWord(e){
    props.inputSearchWordFunc(e.target.value);
}
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-dark shadow">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bolder fs-3" to="home">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        {props.userToken?<> <li className="nav-item">
          <Link className="nav-link text-light" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="tvshows">TV Shows</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="networks">Networks</Link>
        </li></>:""}
       
  
        {/* <li className="nav-item">
          <Link className="nav-link" to=''>Disabled</Link>
        </li> */}
      </ul>
      {/* props.inputSearchWordFunc(this.value) */}
      <ul className="navbar-nav d-flex p-0 list-unstyled">
        <input onChange={searchWord} className="form-control me-2 mb-3 mb-lg-0 order-lg-first order-3" type="search" placeholder="Search" aria-label="Search"/>
        <div className="icons d-flex my-3 my-lg-0 align-items-center order-lg-first order-2">
          <a href="#"><i className="fa-brands fa-facebook-f me-2 text-light"></i></a>
          <a href="#"><i className="fa-brands fa-instagram me-2 text-light"></i></a>
          <a href="#"><i className="fa-brands fa-youtube me-2 text-light"></i></a>
          <a href="#"><i className="fa-brands fa-spotify me-2 text-light"></i></a>
        </div>
        {props.userToken?<li className="nav-item order-lg-last order-first">
        <span onClick={props.logout} className={`${styles.logout} nav-link text-light pe-2`}>Logout</span>
        </li>:<>
        <li className="nav-item  order-lg-last order-first">
        <Link className="nav-link text-light pe-2" to="login">Login</Link>
        </li>
        <li className="nav-item  order-lg-last order-first">
        <Link className="nav-link text-light pe-2" to="register">Register</Link>
        </li> 
        </>}
        
        
      </ul>
    </div>
        </div>
        </nav>  
   </>
  )
}
