import {configureStore} from "@reduxjs/toolkit"

const server ="http://localhost:5000/api/v1"

const store = configureStore({
    reducer: {
        [server]: axios
    
    
    }
})



export default store