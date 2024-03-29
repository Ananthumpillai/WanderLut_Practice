import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import React, { useState } from 'react';
import Home from './components/Home';
import Register from './components/register';
import Demo from './components/demo'
import 'bootstrap/dist/css/bootstrap.min.css';
import HotDeals from './components/HotDeals';
import BookingComponent from './components/BookingComponent';
import Packages from './components/Packages';
import FullScreenDemo from './components/demo';
import ViewBookings from './components/ViewBookings';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



function App() {


  const [open, setOpen] = useState(false);
  const [login, updateLogin] = useState(sessionStorage.getItem("login"))
  // console.log(sessionStorage.login);

  let handleLogout = () => {

    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once  logged out, you won't be able to book packages or view your bookings
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => (setOpen(false))}>Disagree</Button>
          <Button onClick={handleLogout} >Agree</Button>
        </DialogActions>
      </Dialog>



      <Router>
        <div>
          {/* {sessionStorage.getItem("login")?updateLogin(true):null} */}
          <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <a className="navbar-brand font-weight-bolder " href="/"><img src={process.env.PUBLIC_URL + 'assets/lono-final.png'} height='50vh' width='100%'></img></a>

            <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#id">
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='id'>


              <ul className='navbar-nav ms-auto '>
                {login ?
                  <li className='nav-item'>
                    <Link className="nav-link" to={'/'} >Welcome {sessionStorage.getItem('name')}</Link>
                  </li> : null}
                <li className='nav-item '>
                  <Link className="nav-link" to={'/hotDeals'}>Hot Deals</Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to={'/viewBookings'}>Planned Trips</Link>
                </li>



                {login ?
                  <li className='nav-item'>
                    <button className='btn btn-dark' onClick={() => setOpen(true)}>Logout</button>
                  </li>
                  :
                  <li className='nav-item '>
                    <Link className="nav-link" to={'/login'}>Login</Link>
                  </li>
                }


              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path='/' component={Home} ></Route>
            <Route exact path='/home' component={Home} ></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/hotDeals' component={HotDeals}></Route>
            <Route path='/searchPackages/:keyword' component={Packages}></Route>
            <Route path='/book/:destinationId' component={BookingComponent}></Route>
            <Route exact path='/viewBookings' component={ViewBookings} ></Route>
            <Route path='*' component={() => <Redirect to='/home'></Redirect>} ></Route>
          </Switch>

        </div>
      </Router>
      <footer className="bg-black p-5 ">
        Copyright &copy; www.eta.wanderlust.com 2018
      </footer>
    </div>

  );
}

export default App;




