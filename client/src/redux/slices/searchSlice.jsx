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
      removeSearch(state){
        (state.search = null)
      }
  
  }})
  export const {searchStart,removeSearch}=searchSlice.actions

  export default searchSlice.reducer;
