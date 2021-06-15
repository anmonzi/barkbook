import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { LocationProvider } from "./location/LocationProvider"
import "./BarkBook.css"



export const BarkBook = () => (
    <>
    <Route
      render={() => {
        if (localStorage.getItem("barkbook_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>

    <LocationProvider>
        <Route path="/register">
            <Register />
        </Route>
    </LocationProvider>
  </>
)
