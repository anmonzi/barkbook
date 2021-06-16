import React, { useContext, useEffect, useState } from "react"
import { AnimalEnergyLevelContext } from "../animalEnergyLevel/AnimalEnergyLevelProvider"
import { AnimalGenderContext } from "../animalGender/AnimalGenderProvider"
import { AnimalSizeContext } from "../animalSize/AnimalSizeProvider"
import { UserContext } from "../user/UserProvider"
import { AnimalContext } from "./AnimalProvider"
import { useHistory, useParams } from "react-router-dom"
import "./AnimalForm.css"


export const AnimalForm = () => {
    const { addAnimal, removeAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { users, getUsers } = useContext(UserContext)
    const { animalSizes, getAnimalSizes } = useContext(AnimalSizeContext)
    const { animalEnergyLevels, getAnimalEnergyLevels } = useContext(AnimalEnergyLevelContext)
    const { animalGenders, getAnimalGenders } = useContext(AnimalGenderContext)

    const [animal, setAnimal] = useState({})
    const [isLoading, setIsLoading] = useState({})

    const {animalId} = useParams()
    const history = useHistory()


    const handleControlledInputChange = (event) => {
        const newAnimal = {...animal}
        newAnimal[event.target.name] = event.target.value
        setAnimal(newAnimal)
    }

    const handleSaveAnimal = () => {
        if (animalId) {
            // PUT - update
            updateAnimal({
                id: animal.id,
                userId: "",
                animalEnergyLevelId: "",
                animalSizeId: "",
                imageURL: "",
                age: 0,
                animalGenderId: "",
                breed: "",
                description: ""
            })
            .then(() => history.push("/profile"))
        } else {
            // POST - add
            addAnimal({
                userId: "",
                animalEnergyLevelId: "",
                animalSizeId: "",
                imageURL: "",
                age: 0,
                animalGenderId: "",
                breed: "",
                description: ""
            })
            .then(() => history.push("/profile"))
        }
    }


    useEffect(() => {
        getUsers().then(getAnimalGenders)
        .then(getAnimalSizes).then(getAnimalEnergyLevels).then(() => {
            if (animalId) {
                getAnimalById(animalId)
                .then(animal => {
                    setAnimal(animal)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])


    return (
        <form className="animalForm">
          <h2 className="animalForm__title">New Animal</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="animalName">Animal name: </label>
              <input type="text" id="animalName" name="name" required autoFocus className="form-control"
              placeholder="Animal name"
              onChange={handleControlledInputChange}
              defaultValue={animal.name}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="animalBreed">Animal breed: </label>
              <input type="text" id="animalBreed" name="breed" required autoFocus className="form-control"
              placeholder="Animal breed"
              onChange={handleControlledInputChange}
              defaultValue={animal.breed}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="location">Assign to location: </label>
              <select value={animal.locationId} name="locationId" id="animalLocation" className="form-control" onChange={handleControlledInputChange}>
                <option value="0">Select a location</option>
                {locations.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="customer">Customer: </label>
              <select value={animal.customerId} name="customerId" id="customerAnimal" className="form-control" onChange={handleControlledInputChange}>
                <option value="0">Select a customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                      {c.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
              event.preventDefault() // Prevent browser from submitting the form and refreshing the page
              handleSaveAnimal() // handle put or post functionality  ->  ternary statement below - if there's an animalId then load save animal text...else add animal text
            }}>
          {animalId ? <>Save Animal</> : <>Add Animal</>}</button>  
        </form>
      )
}




