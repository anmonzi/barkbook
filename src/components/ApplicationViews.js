import React from "react"
import { Route } from "react-router-dom"
import { LocationDetail } from "./location/LocationDetail"
import { LocationFriends } from "./location/LocationFriends"
import { LocationList } from "./location/LocationList"
import { LocationProvider } from "./location/LocationProvider"
import { UserProfile } from "./user/UserProfile"
import { UserContext, UserProvider } from "./user/UserProvider"



export const ApplicationViews = () => {
    return (
        <>
            {/* Render user/animal profile page */}
            <UserProvider>
                <LocationProvider>
                    <Route exact path="/profile">
                        <UserProfile />
                    </Route>
                </LocationProvider>
            </UserProvider>

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