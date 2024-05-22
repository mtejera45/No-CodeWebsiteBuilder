import { createSlice } from "@reduxjs/toolkit"

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    canvasBackgroundRedux:{
      desktop: "./images/desktop/27.webp",
      mobile: "./images/mobile/21.webp",
      color: "rgba(255, 255, 255, 1)"
    },
    canvasElementsRedux: [],
    language:"en",
    showPopUp: ""
  },
  reducers: {

    setCanvasBackgroundRedux: (state, action) => {
      state.canvasBackgroundRedux.desktop = action.payload.desktop
      state.canvasBackgroundRedux.mobile = action.payload.mobile
      state.canvasBackgroundRedux.color = action.payload.color
    },
    setCanvasElementsRedux: (state, action) => {
      state.canvasElementsRedux = action.payload
    },
    setShowPopUp: (state, action) => {
      state.showPopUp = action.payload
    }

  }

})

export const {
  setCanvasBackgroundRedux,
  setCanvasElementsRedux,
  setShowPopUp
} = settingsSlice.actions

export default settingsSlice.reducer

