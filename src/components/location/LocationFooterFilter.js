import React, { useContext, useEffect } from "react"
import { AnimalEnergyLevelContext } from "../animalEnergyLevel/AnimalEnergyLevelProvider"
import { AnimalSizeContext } from "../animalSize/AnimalSizeProvider"
import "./Location.css"


export const FooterSearch = () => {
    const { animalEnergyLevels, getAnimalEnergyLevels} = useContext(AnimalEnergyLevelContext)
    const { animalSizes, getAnimalSizes } = useContext(AnimalSizeContext)
    

    

    useEffect(() => {
        getAnimalEnergyLevels().then(getAnimalSizes)
    }, [])

    

    return (
        <footer className="footerSearchBar">
            <div className="filter-select">
                <label htmlFor="selectEnergyLevel">Filter by Energy Level</label>
                    <select name="energyLevel" id="energyLevel" className="filter-form-control">
                        <option value="0">Select Energy Level</option>
                        {animalEnergyLevels.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.energyLevel}
                        </option>
                        ))}
                    </select>
                </div>
            <div className="filter-select">
                <label htmlFor="selectSize">Filter by Size </label>
                    <select name="size" id="size" className="filter-form-control">
                        <option value="0">Select Size</option>
                        {animalSizes.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.size}
                        </option>
                        ))}
                    </select>
                </div>
        </footer>
    )
}