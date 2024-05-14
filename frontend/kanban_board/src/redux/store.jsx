import { configureStore } from "@reduxjs/toolkit";

import progressSlice from './taskSlice'

import projectSlice from "./projectSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        progress:progressSlice,
        project:projectSlice,
        user:userSlice
    }
})
export default store