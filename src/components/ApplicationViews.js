import React from "react"
import { Route } from "react-router-dom"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalEnergyLevelProvider } from "./animalEnergyLevel/AnimalEnergyLevelProvider"
import { AnimalGenderProvider } from "./animalGender/AnimalGenderProvider"
import { AnimalSizeProvider } from "./animalSize/AnimalSizeProvider"
import { LocationDetail } from "./location/LocationDetail"
import { LocationFriends } from "./location/LocationFriends"
import { LocationList } from "./location/LocationList"
import { LocationProvider } from "./location/LocationProvider"
import { UserForm } from "./user/UserForm"
import { UserProfile } from "./user/UserProfile"
import { UserContext, UserProvider } from "./user/UserProvider"



export const ApplicationViews = () => {
    return (
        <>
            {/* Render user/animal profile page */}
            <UserProvider>
                <LocationProvider>
                    <AnimalProvider>
                        <Route exact path="/profile">
                            <UserProfile />
                        </Route>

                        <Route exact path="/profile/edit/:userId(\d+)">
                            <UserForm />
                        </Route>
                    </AnimalProvider>
                </LocationProvider>
            </UserProvider>

            {/* Render Animal Forms */}
            
            <AnimalEnergyLevelProvider>
                <AnimalGenderProvider>
                    <AnimalSizeProvider>
                        <AnimalProvider>
                            <Route exact path="/profile/create-animal">
                                <AnimalForm />
                            </Route>
                        </AnimalProvider>
                    </AnimalSizeProvider>
                </AnimalGenderProvider>
            </AnimalEnergyLevelProvider>
            

            {/* Render locations */}
            <LocationProvider>
                <UserProvider>
                    <Route exact path="/locations">
                        <LocationList />
                    </Route>

                    <Route exact path="/locations/friends/:locationId(\d+)">
                        <LocationFriends />
                    </Route>

                    <Route path="/locations/detail/:userId(\d+)">
                        <LocationDetail />
                    </Route>
                </UserProvider>
            </LocationProvider>
        </>
    )
}