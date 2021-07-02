import React, { useContext, useEffect, useState } from "react"
import { AnimalEnergyLevelContext } from "../animalEnergyLevel/AnimalEnergyLevelProvider"
import { AnimalGenderContext } from "../animalGender/AnimalGenderProvider"
import { AnimalSizeContext } from "../animalSize/AnimalSizeProvider"
import { AnimalContext } from "./AnimalProvider"
import { useHistory, useParams } from "react-router-dom"
import "./AnimalForm.css"


export const AnimalForm = () => {
    const { addAnimal, removeAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { animalSizes, getAnimalSizes } = useContext(AnimalSizeContext)
    const { animalEnergyLevels, getAnimalEnergyLevels } = useContext(AnimalEnergyLevelContext)
    const { animalGenders, getAnimalGenders } = useContext(AnimalGenderContext)

    const [animal, setAnimal] = useState({})
    const [isLoading, setIsLoading] = useState({})
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [editModeImage, setEditModeImage] = useState("")

    const {animalId} = useParams()
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("barkbook_user"))


    const handleControlledInputChange = (event) => {
        const newAnimal = {...animal}
        newAnimal[event.target.name] = event.target.value
        setAnimal(newAnimal)
    }

    const handleSaveAnimal = () => {
        if (animalId && image === "") {
            // PUT - update with original animal image
            updateAnimal({
                id: animal.id,
                name: animal.name,
                userId: userId,
                animalEnergyLevelId: parseInt(animal.animalEnergyLevelId),
                animalSizeId: parseInt(animal.animalSizeId),
                imageURL: editModeImage,
                age: animal.age,
                animalGenderId: parseInt(animal.animalGenderId),
                breed: animal.breed,
                description: animal.description
            })
            .then(() => history.push("/profile"))
        } else if (animalId && image !== "") {
            // PUT - update with new animal image
            updateAnimal({
                id: animal.id,
                name: animal.name,
                userId: userId,
                animalEnergyLevelId: parseInt(animal.animalEnergyLevelId),
                animalSizeId: parseInt(animal.animalSizeId),
                imageURL: image,
                age: animal.age,
                animalGenderId: parseInt(animal.animalGenderId),
                breed: animal.breed,
                description: animal.description
            })
            .then(() => history.push("/profile"))
        } else {
            // POST - add new animal with uploaded image
            addAnimal({
                name: animal.name,
                userId: userId,
                animalEnergyLevelId: parseInt(animal.animalEnergyLevelId),
                animalSizeId: parseInt(animal.animalSizeId),
                imageURL: image,
                age: animal.age,
                animalGenderId: parseInt(animal.animalGenderId),
                breed: animal.breed,
                description: animal.description
            })
            .then(() => history.push("/profile"))
        }
    }



    const uploadImage = async event => {
        const files = event.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "barkbookimages")
        setLoading(true)
        
        const response = await fetch("https://api.cloudinary.com/v1_1/dv6jdeyfx/image/upload",
        {
            method: "POST",
            body: data
        })

        const file = await response.json()
        console.log(file)

        setImage(file.secure_url)
        setLoading(false)
    }


    useEffect(() => {
        getAnimalGenders()
        .then(getAnimalSizes).then(getAnimalEnergyLevels).then(() => {
            if (animalId) {
                getAnimalById(animalId)
                .then(animal => {
                    setEditModeImage(animal.imageURL)
                    setAnimal(animal)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])


    const checkKeyDown = (event) => {
        if (event.code === "Enter") event.preventDefault()
    }


    return (
        <div className="form-flex">
            <form className="animal-form" onKeyDown={(event) => checkKeyDown(event)}>
            {animalId
            ? <><h2 className="animalForm__title">Update Pet</h2></>
            : <><h2 className="animalForm__title">New Pet</h2></>
            }
            <div>
            {editModeImage === ""
            ? <><h3 className="animalForm__title">Add Dog Image</h3></>
            : <><h3 className="animalForm__title">Update Dog Image</h3></>
            }
        
            {image === "" 
            ?
            <> 
                <div className="previous-img">
                    <img src={editModeImage}  alt="" className={ `${editModeImage !== ""  ? "loading" : "hidden" }`}/>
                </div>
            </>
            :
            <div></div>
            }
                
            <div className="img-upload-container">
                <input type="file" name="file" onChange={uploadImage} 
                className="img-upload" required />
                    {loading
                    ? 
                    <h3>Loading...</h3> 
                    : 
                    <img src={image} className={ `${image !== ""  ? "loading" : "hidden" }`}/>
                    }
            </div>
            </div>
            <fieldset>
                <div className="form-group">
                <label htmlFor="animalName">Pet name: </label>
                <input type="text" id="animalName" name="name" required autoFocus className="form-control"
                placeholder="Fido"
                onChange={handleControlledInputChange}
                defaultValue={animal.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="animalBreed">Pet breed: </label>
                <input type="text" id="animalBreed" name="breed" required className="form-control"
                placeholder="Pet breed"
                onChange={handleControlledInputChange}
                defaultValue={animal.breed}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="animalAge">Pet Age:</label>
                <input type="number" id="petAge" name="age" required className="form-control" value={animal.age} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="customer">Pet Gender</label>
                <select value={animal.animalGenderId} name="animalGenderId" id="animalGenderId" className="form-control" onChange={handleControlledInputChange}>
                    <option value="0">Choose Gender</option>
                    {animalGenders.map(g => (
                    <option key={g.id} value={g.id}>
                        {g.gender}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="customer">Pet Size</label>
                <select value={animal.animalSizeId} name="animalSizeId" id="animalSizeId" className="form-control" onChange={handleControlledInputChange}>
                    <option value="0">Select Pet Size</option>
                    {animalSizes.map(size => (
                    <option key={size.id} value={size.id}>
                        {size.size}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="location">Pet Energy Level: </label>
                <select value={animal.animalEnergyLevelId} name="animalEnergyLevelId" id="animalEnergyLevelId" className="form-control" onChange={handleControlledInputChange}>
                    <option value="0">Select Energy Level</option>
                    {animalEnergyLevels.map(energy => (
                    <option key={energy.id} value={energy.id}>
                        {energy.energyLevel}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="inputDescription"> Pet Description </label>
                    <textarea type="text" id="animalDescription" name="description" className="form-control" cols={10} rows={10} required value={animal.description} onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <div className="animal-form-btns">
                <button className="btn btn-primary"
                    disabled={isLoading}
                    onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSaveAnimal() // handle put or post functionality  ->  ternary statement below - if there's an animalId then load save animal text...else add animal text
                    }}>
                {animalId ? <>Update Animal</> : <>Add Animal</>}
                </button>
                {/* Ternary for delete button - if there's no animal.id don't show button */}
                {animalId
                ? <button className="btn btn-primary" onClick={() => {
                    removeAnimal(animalId)
                    history.push("/profile")
                }}>Delete Pet</button>
                : <></>
                }
            </div>
            </form>
        </div>
      )
}




