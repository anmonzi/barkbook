import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "../animal/AnimalProvider"



export const FriendsWaiting = ({ locationObj }) => {
    const { animals, getAnimals } = useContext(AnimalContext)

    const currentUser = parseInt(localStorage.getItem("barkbook_user"))

    useEffect(() => {
        getAnimals(locationObj)
    }, [])

    const findDogs = animals.filter(animal => animal.user.locationId === locationObj.id)
    const foundDogs = findDogs.filter(animal => animal.userId !== currentUser) // remove current user from array
    
    

    return (
        <div>{foundDogs.length > 1 || foundDogs.length === 0
            ? <>{foundDogs.length} Friends Waiting</>
            : <>{foundDogs.length} Friend Waiting</>
            }
        </div>
    )
}