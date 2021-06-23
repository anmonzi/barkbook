import React, { useState } from "react"




export const ImageUpload = () => {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")


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

    return (
        <div>
            <h2>Upload Image</h2>
            <input type="file" name="file" placeholder="Upload an Image"
            onChange={uploadImage} />

            {
                loading ? 
                (
                    <h3>Loading...</h3>
                ) 
                : 
                (
                    <img src={image} style={{
                         objectFit: 'cover',
                         borderRadius: '50%',
                         width: '200px',
                         maxHeight: '200px',
                         boxShadow: '0px 0px 10px rgb(212, 212, 212)',
                         backgroundPosition: 'top center',
                        }} />
                )
            }

        </div>
    )
}