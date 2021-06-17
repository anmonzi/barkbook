import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { UserContext } from "../user/UserProvider"
import "./Location.css"
import { useParams, useHistory } from 'react-router-dom'
import { AnimalCard } from "./LocationAnimalCards"



export const LocationFriends = () => {
    const { getLocationById } = useContext(LocationContext)
    const { animals, getAnimals } = useContext(AnimalContext)
    const { users, getUsers } = useContext(UserContext)
    const [ locationAnimals, setLocationAnimals] = useState([])
    const [ location, setLocation ] = useState({ users: [] })
    const { locationId } = useParams()
    const history = useHistory() //just returns a value

    useEffect(() => {
        getLocationById(locationId).then(setLocation)
    }, [locationId])

    useEffect(() => {
        getUsers().then(getAnimals)
    }, [])

    useEffect(() => {
        const foundUsers = users.filter(user => user.locationId === location.id)
        const foundAnimals = []
        for(const user of foundUsers) {
            const foundAnimal = animals.find(animal => animal.userId === user.id)
            if (foundAnimal !== undefined) {
                foundAnimals.push(foundAnimal)
            }
        } 
        setLocationAnimals(foundAnimals)
    }, [location])

    

    return (
        <>
            <button className="btn go-back-btn" onClick={() => {
                history.push("/locations")
            }}>Go Back</button>
            <h1 className="location__name">{ location.name } Friends</h1>
            <section className="dog__cards">  
                           
                    <div className="dog__card">
                        {locationAnimals.map(animal =>
                            <AnimalCard key={animal.id} animalObj={animal} />
                        )}
                    </div>
            </section>
        </>
    )
}
