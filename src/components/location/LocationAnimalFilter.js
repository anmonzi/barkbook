import React, { useContext, useEffect } from "react"
import { AnimalEnergyLevelContext } from "../animalEnergyLevel/AnimalEnergyLevelProvider"
import { AnimalSizeContext } from "../animalSize/AnimalSizeProvider"
import "./Location.css"


export const AnimalFilter = () => {
    const { animalEnergyLevels, getAnimalEnergyLevels, setFilteredValue } = useContext(AnimalEnergyLevelContext)
    const { animalSizes, getAnimalSizes, setFilteredSizeValue } = useContext(AnimalSizeContext)
    

    useEffect(() => {
        getAnimalEnergyLevels().then(getAnimalSizes)
    }, [])

    
    const handleResetValues = () => {
        setFilteredSizeValue(0)
        setFilteredValue(0)
    }


    return (
        <section className="filter-button__flex">
            <div className="filter-select">
                <label htmlFor="selectEnergyLevel">Filter by Energy Level</label>
                    <select name="energyLevel" id="energyLevel" className="filter-form-control"
                        onChange={(changeEvent) => {
                            setFilteredValue(parseInt(changeEvent.target.value))
                        }}>
                        <option value="0">Select Energy Level</option>
                        <option value="0">See All</option>
                        {animalEnergyLevels.map(energyLevel => (
                        <option key={energyLevel.id} value={energyLevel.id}>
                            {energyLevel.energyLevel}
                        </option>
                        ))}
                    </select>
                </div>
            <div className="filter-select">
                <label htmlFor="selectSize">Filter by Size </label>
                    <select name="size" id="size" className="filter-form-control"
                        onChange={(changeEvent) => {
                            setFilteredSizeValue(parseInt(changeEvent.target.value))
                        }}>
                        <option value="0">Select Size</option>
                        <option value="0">See All</option>
                        {animalSizes.map(size => (
                        <option key={size.id} value={size.id}>
                            {size.size}
                        </option>
                        ))}
                    </select>
                </div>
                <button className="btn go-back-btn btn-primary" onClick={() => {
                    handleResetValues()
                    }}>Reset</button>
        </section>
    )
}