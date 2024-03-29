import React, { useEffect, useState } from "react";
import HotDeals from "./HotDeals";
import { Link, Redirect } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import VisibilitySensor from 'react-visibility-sensor';

const Alert = React.forwardRef(function Alert(props, ref) {
  // this is for snack bar
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [subscribeMail, updateSubscribeMail] = useState("");
  const [searchValue, updadateSearchValue] = useState("");
  const [search, updateSearch] = useState(false);
  const [snack, updateSnack] = useState(false);

  let handleClick = () => {
    updateSearch(true);
  };

  let subscribe = (e) => {
    e.preventDefault();
    updateSnack(true);
    updateSubscribeMail("");
  };

  let handleClose = () => {
    updateSnack(false);
  };

  if (search) {
    let uri = "/searchPackages/" + searchValue;
    return <Redirect to={uri} />;
  }
  return (
    <React.Fragment>
      <Snackbar
        open={snack}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User Successfully Subscribed!!!
        </Alert>
      </Snackbar>

      <header className="masthead ">
        <div className="container d-flex h-100 align-items-center">
          <div className="mx-auto text-center">
            <h1 className="mx-auto my-0 text-uppercase">Wanderlust</h1>
            <h2 className="text-white-50 mx-auto mt-2 mb-5">
              All that is gold does not glitter, Not all those who wander are
              lost.
            </h2>
            <div className="form-inline d-flex">
              <input
                type="text"
                className="form-control-lg flex-fill text-uppercase"
                placeholder="Where?"
                onChange={(e) => updadateSearchValue(e.target.value)}
              ></input>{" "}
              &nbsp;
              <button
                className="btn btn-primary btn-lg mx-auto"
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="about-section text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h2 className="text-white mb-2">
                Unleash the traveller inside you
              </h2>
              <p className="about-paragraph mb-5">
                When someone makes a travel plan, the first few things they want
                to sort out, are flights, accommodation, and other amenities for
                a convenient holiday. To enjoy holidays, you want to have the
                basics taken care of, especially for family vacations and
                honeymoon trips. You want your accommodation, return flight
                bookings, meals of the days, and other traveling formalities
                sorted beforehand. At <Link to="/home">Wanderlust</Link>, we
                take care of all the requirements to ensure that you get to
                enjoy the best of your holiday, exploring and experiencing the
                destination.
              </p>
            </div>
          </div>
        </div>
      </section>
      <HotDeals />
      <section className="footer-section text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h2 className="text-white">Subscribe to receive updates!</h2>
              <div className="form-inline d-flex mt-5">
                <input
                  value={subscribeMail}
                  type="text"
                  className="subscribe-textbox flex-fill"
                  onChange={(e) => updateSubscribeMail(e.target.value)}
                  placeholder="ENTER AN EMAIL ADDRESS..."
                ></input>{" "}
                &nbsp; &nbsp;
                <button
                  className="btn btn-primary"
                  disabled={!subscribeMail.match(/^[a-z0-9]+@[a-z]{3,}\.com$/)}
                  onClick={subscribe}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section text-center">
        <div className="container">
         
            <VisibilitySensor partialVisibility >
              {({ isVisible }) => (
                 <div className="row">
            <div className="col-md-4 mb-3">
             
            
              <div className={isVisible? 'card cardtrans py-4 bg-white': 'card py-4 bg-white'}>
                <div className="card-body">
                  <h4 className="text-uppercase m-0">ADDRESS</h4>
                  <hr className="my-4"></hr>
                  <div className="small text-black-50">Qburst TVM</div>
                </div>
              </div>
          
            </div>
            <div className="col-md-4 mb-3">
              <div className={isVisible? 'card cardtrans py-4 bg-white': 'card py-4 bg-white'}>
                <div className="card-body">
                  <h4 className="text-uppercase m-0">EMAIL</h4>
                  <hr className="my-4"></hr>
                  <div className="small text-black-50">
                    ananthu998@gmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className={isVisible? 'card cardtrans py-4 bg-white': 'card py-4 bg-white'}>
                <div className="card-body">
                  <h4 className="text-uppercase m-0">PHONE</h4>
                  <hr className="my-4"></hr>
                  <div className="small text-black-50">+91 9567805039</div>
                </div>
              </div>
            </div>
            </div>
              )}
            </VisibilitySensor>
      

        </div>
      </section>
    </React.Fragment>
  );
}
