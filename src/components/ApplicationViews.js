import React from "react"
import { Route } from "react-router-dom"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalEnergyLevelProvider } from "./animalEnergyLevel/AnimalEnergyLevelProvider"
import { AnimalGenderProvider } from "./animalGender/AnimalGenderProvider"
import { AnimalSizeProvider } from "./animalSize/AnimalSizeProvider"
import { MessageList } from "./directMessage/DirectMessageList"
import { DirectMessageProvider } from "./directMessage/DirectMessageProvider"
import { DirectMessageForm } from "./directMessage/MessageForm"
import { LocationAnimalDetail } from "./location/LocationAnimalDetail"
import { LocationFriends } from "./location/LocationFriends"
import { LocationList } from "./location/LocationList"
import { LocationProvider } from "./location/LocationProvider"
import { UserForm } from "./user/UserForm"
import { UserProfile } from "./user/UserProfile"
import { UserProvider } from "./user/UserProvider"
import { ParkProvider } from "./park/ParkProvider"
import { ParkList } from "./park/ParkList"
import { DirectMessage } from "./directMessage/DirectMessage"



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

              <Route exact path="/profile/edit-animal/:animalId(\d+)">
                <AnimalForm />
              </Route>
            </AnimalProvider>
          </AnimalSizeProvider>
        </AnimalGenderProvider>
      </AnimalEnergyLevelProvider>

      {/* Render locations */}
      <LocationProvider>
        <UserProvider>
          <AnimalProvider>
            <DirectMessageProvider>
              <AnimalEnergyLevelProvider>
                <AnimalSizeProvider>
                  <Route exact path="/locations">
                    <LocationList />
                  </Route>

                  <Route exact path="/locations/friends/:locationId(\d+)">
                    <LocationFriends />
                  </Route>

                  <Route path="/locations/detail/:animalId(\d+)">
                    <LocationAnimalDetail />
                  </Route>

                  <Route path="/locations/message/:userId(\d+)">
                    <DirectMessageForm />
                  </Route>
                </AnimalSizeProvider>
              </AnimalEnergyLevelProvider>
            </DirectMessageProvider>
          </AnimalProvider>
        </UserProvider>
      </LocationProvider>

      {/* Render Direct Messages */}
      <DirectMessageProvider>
        <Route exact path="/messages">
          <MessageList />
        </Route>

        <Route exact path="/messages/reply/:messageId(\d+)">
          <DirectMessage />
        </Route>
      </DirectMessageProvider>

      {/* Render Parks */}
      <ParkProvider>
        <Route exact path="/parks">
          <ParkList />
        </Route>
      </ParkProvider>
    </>
  );
};