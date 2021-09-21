import React, { useState, createContext } from "react";

export const AnimalEnergyLevelContext = createContext();

export const AnimalEnergyLevelProvider = (props) => {
  const [animalEnergyLevels, setAnimalEnergyLevels] = useState([]);
  const [filteredValue, setFilteredValue] = useState(0);

  const getAnimalEnergyLevels = () => {
    return fetch(
      "https://barkbook-api-q3b97.ondigitalocean.app/animalEnergyLevels"
    )
      .then((res) => res.json())
      .then((data) => setAnimalEnergyLevels(data));
  };

  return (
    <AnimalEnergyLevelContext.Provider
      value={{
        animalEnergyLevels,
        getAnimalEnergyLevels,
        filteredValue,
        setFilteredValue,
      }}
    >
      {props.children}
    </AnimalEnergyLevelContext.Provider>
  );
};
