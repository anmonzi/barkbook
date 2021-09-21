import React, { useState, createContext } from "react";

export const LocationContext = createContext();

export const LocationProvider = (props) => {
  const [locations, setLocations] = useState([]); // initially locations is an empty array which gets updated with state by setLocations
  const [searchTerms, setSearchTerms] = useState("");

  const getLocations = () => {
    return fetch(
      "https://barkbook-api-q3b97.ondigitalocean.app/locations?_embed=users"
    )
      .then((res) => res.json())
      .then((data) => setLocations(data)); //updates state
  };

  const getLocationById = (locationId) => {
    return fetch(
      `https://barkbook-api-q3b97.ondigitalocean.app/locations/${locationId}?_embed=users`
    ).then((res) => res.json());
  };

  return (
    <LocationContext.Provider
      value={{
        locations,
        getLocations,
        getLocationById,
        searchTerms,
        setSearchTerms,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
