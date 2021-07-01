import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "../animal/AnimalProvider"



export const FriendsWaiting = ({ locationObj }) => {
    const { animals, getAnimals } = useContext(AnimalContext)

    useEffect(() => {
        getAnimals(locationObj)
    }, [])

    const findDogs = animals.filter(animal => animal.user.locationId === locationObj.id)
    

    return (
        <div>{findDogs.length} Friends Waiting</div>
    )
}