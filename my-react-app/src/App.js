import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter, Link } from 'react-router-dom'
import { useState } from 'react';
function App() {
  
  //console.log(login);
  // sessionStorage.clear()
  // const [login,updateLogin]=useState("")
  // updateLogin(sessionStorage.getItem("login"))
  // console.log(sessionStorage)
  return (
   
    <BrowserRouter>
    {/* {sessionStorage.getItem("login")?updateLogin(true):null} */}
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <a className="navbar-brand font-weight-bolder" href="#"><img src={logo} height='50vw' width='50vw'></img> Wander Lust</a>

        <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#id">
          <span className='navbar-toggler-icon'></span>
        </button>
        {/* {login? */}
        <div className='collapse navbar-collapse' id='id'>
          <ul className='navbar-nav '>
            <li className='nav-item '>
              <Link className="nav-link" to={'/hotDeals'}>Hot Deals</Link>
            </li>
            <li className='nav-item'>
              <Link className="nav-link" to={'/plannedTrips'}>Planned Trips</Link>
            </li>
            <li className='nav-item'>
              <Link className="nav-link " to={'/'}>Welcome</Link>
            </li>
          </ul>
        </div>:null
        {/* } */}
      </nav>
      





      
      <Login />

    </BrowserRouter>
  );
}

export default App;
