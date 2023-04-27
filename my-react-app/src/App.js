import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { useState } from 'react';
import Home from './components/Home';
import Register from './components/register';

import 'bootstrap/dist/css/bootstrap.min.css';
import HotDeals from './components/HotDeals';
function App() {



  const [login, updateLogin] = useState(sessionStorage.getItem("login"))
  // console.log(sessionStorage.login);

  let handleLogout = () => {
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <Router>
     <div>
        {/* {sessionStorage.getItem("login")?updateLogin(true):null} */}
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
          <a className="navbar-brand font-weight-bolder" href="#"><img src={logo} height='30vw' width='30vw'></img> Wander Lust</a>

          <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#id">
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='id'>

            {login ?
              <ul className='navbar-nav '>


                <li className='nav-item'>
                  {/* <Link className="nav-link " >Welcome</Link> */}
                </li>
                <li className='nav-item'>
                  <button className='btn btn-dark' onClick={handleLogout}>Logout</button>
                </li>
              </ul>
              :
              <ul className='navbar-nav ms-auto '>

                <li className='nav-item '>
                  <Link className="nav-link" to={'/hotDeals'}>Hot Deals</Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to={'/viewBookings'}>Planned Trips</Link>
                </li>
                <li className='nav-item '>
                  <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
              </ul>
            }
          </div>
        </nav>
   
        <Switch>

          <Route exact path='/home' component={Home} ></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
           <Route path='/hotDeals' component={HotDeals}></Route>
          {/* <Route path='/viewBookings'></Route>  */}
        </Switch>

  </div>
      </Router> 
      <footer className="bg-black text-center text-white-50">
     Copyright &copy; www.eta.wanderlust.com 2018
</footer>
    </div>
    
  );
}

export default App;




