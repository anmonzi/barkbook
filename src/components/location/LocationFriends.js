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
    
    
    return (
        <>
            <h1 className="location__name title">{ location.name } Friends</h1>
            <section className="dog__cards">  
                           
                    <div className="dog__card">
                        {locationAnimals.map(animal =>
                            <AnimalCard key={animal.id} animalObj={animal} />
                            )}
                    </div>
            </section>
            <div className="btn-flex">
                <button className="btn go-back-btn" onClick={() => {
                    history.push("/locations")
                }}>Go Back</button>
            </div>
        </>
    )
}
