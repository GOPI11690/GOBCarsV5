import { createSlice } from "@reduxjs/toolkit"


const searchSlice=createSlice({
    name: "search",
    initialState: {
     search:null,
    //  model:null,
    //  seater:null,
    //  carid:null,
    //  pickupdate:null,
    //  returndate:null
     
    },
    reducers:{
      searchStart(state,action) {
        state.search = action.payload
      },
   
    // searchClear(state) {
    //     (state.model = null),
    //     (state.seater = null)
    // }
  }})
  export const {searchStart}=searchSlice.actions

  export default searchSlice.reducer;
