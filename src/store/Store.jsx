import {configureStore}  from "@reduxjs/toolkit"

import userSlice from "../features/userSlice"
import placeSlice from "../features/placeSlice"

export const store=configureStore({
    reducer:{
        store:userSlice,
        place:placeSlice
    }
})