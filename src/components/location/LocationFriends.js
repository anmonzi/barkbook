import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { UserContext } from "../user/UserProvider"
import { useParams, useHistory } from 'react-router-dom'
import { AnimalCard } from "./LocationAnimalCards"
import { AnimalFilter } from "./LocationAnimalFilter"
import { AnimalEnergyLevelContext } from "../animalEnergyLevel/AnimalEnergyLevelProvider"
import { AnimalSizeContext } from "../animalSize/AnimalSizeProvider"
import "./Location.css"




export const LocationFriends = () => {
    const { getLocationById } = useContext(LocationContext)
    const { animals, getAnimals } = useContext(AnimalContext)
    const { users, getUsers } = useContext(UserContext)
    const { filteredValue, setFilteredValue } = useContext(AnimalEnergyLevelContext)
    const { filteredSizeValue, setFilteredSizeValue } = useContext(AnimalSizeContext)

    const [ locationAnimals, setLocationAnimals] = useState([])
    const [ location, setLocation ] = useState({ users: [] })
    const [filteredAnimals, setFilteredAnimals] = useState([])


    const { locationId } = useParams()
    const currentUser = parseInt(localStorage.getItem("barkbook_user"))
    const history = useHistory() //just returns a value


    useEffect(() => {
        getLocationById(locationId).then(setLocation)
    }, [locationId])


    useEffect(() => {
        getAnimals().then(getUsers)
    }, [])


    useEffect(() => {
        const findAllUsers = users.filter(user => user.locationId === parseInt(locationId)) //grab all users for this location
        const foundUsers = findAllUsers.filter(user => user.id !== currentUser) // remove current user from array

        const foundAnimals = []
        for (const user of foundUsers) {
            animals.forEach(animal => {
                if (animal.userId === user.id) {
                    foundAnimals.push(animal)
                }
            })
        }
        
        setLocationAnimals(foundAnimals)
    }, [users])


    useEffect(() => {
        if (filteredValue !== 0 && filteredSizeValue !== 0) {
            const andSearch = locationAnimals.filter(animal => animal.animalEnergyLevelId === filteredValue && animal.animalSizeId === filteredSizeValue)
            setFilteredAnimals(andSearch)
        } else if (filteredValue !== 0 || filteredSizeValue !== 0) {
            const orSearch = locationAnimals.filter(animal => animal.animalEnergyLevelId === filteredValue || animal.animalSizeId === filteredSizeValue)
            setFilteredAnimals(orSearch)
        } else {
            setFilteredAnimals(locationAnimals)
        }
    }, [filteredValue, filteredSizeValue, locationAnimals])



    useEffect(() => {
        setFilteredValue(0)
        setFilteredSizeValue(0)
    }, [])
    
    
    return (
        <>
            <h1 className="location__name title">{ location.name } Friends</h1>
            <AnimalFilter />
            <section className="dog__cards">  
                           
                    <div className="dog__card">
                        {filteredAnimals.map(animal =>
                            <AnimalCard key={animal.id} animalObj={animal} />
                            )}
                    </div>
            </section>
            <div className="btn-flex">
                <button className="btn go-back-btn btn-primary" onClick={() => {
                    history.push("/locations")
                }}>Go Back</button>
            </div>
        </>
    )
}
