import { configureStore } from "@reduxjs/toolkit";

import progressSlice from './slice'

const store = configureStore({
    reducer:{
        progress:progressSlice
    }
})
export default store