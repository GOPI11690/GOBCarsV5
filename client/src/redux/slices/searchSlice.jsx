import { createSlice } from "@reduxjs/toolkit"


const searchSlice=createSlice({
    name: "search",
    initialState: {
     search:null,
   
    },
    reducers:{
      searchStart(state,action) {
        state.search = action.payload
      },
  
  }})
  export const {searchStart}=searchSlice.actions

  export default searchSlice.reducer;
