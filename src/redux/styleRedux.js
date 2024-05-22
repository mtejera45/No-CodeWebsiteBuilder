import { createSlice } from "@reduxjs/toolkit"

const styleSlice = createSlice({
  name: "style",
  initialState: {

    colorPalette:[
      "#FFAF45",
      "#FB6D48",
      "#D74B76", 
      "#673F69",

      "#074173",
      "#1679AB",
      "#5DEBD7", 
      "#C5FF95",

      "#5E1675",
      "#E90064",
      "#27AE60", 
      "#337357",

      "#7D7463",
      "#219C90", 
      "#BE7B72",
      "#FDAF7B",

      "#8EAC50",
      "#D3D04F",
      "#F6FDC3",
      "#FF8080",

      "#F4CE14", 
      "#2B3499",
      "#D71313",
      "#000000",
      "#FFFFFF",
      "#CCCCCC"
    ],
    
    showColorPicker:"",

    colorPickerEditor:{
      displayColorPicker: false,
      colorRGBA:{
        r:0,
        g:0,
        b:0,
        a:0.5,
      }
    },

    //DARK MODE BY DEFAULT
    theme: {
      bgColor0: "#111111",
      bgColor1: "#141414",
      bgColor2: "#191919",
      bgColor3: "#2B2B2B",
      bgButtonColorDark: "#4A235A",
      bgButtonColorLight: "#6554AF",
      textButtonColor: "#FFFFFF",
      textButtonColorSelected: "#FFFFFF",
      border: "2px solid #2B2B2B",
      textColor: "#FFFFFF",
      redWrongColor: "#EC375B",
      greenRightColor: "#28B463",
      yellowWarningColor: "#FFAC00",
      inputEmptyColor: "#D93D59",
      placeholderLight: "#FFFFFF",
      placeholderDark: "gray",
      selectAllButtonColor: "#2B2B2B",
      deleteAllButtonColor: "#EC375B",
      adminPanelVerticalBarColor: "#0E0E0E"
    },
  
  },

  reducers: {

    setColorPalette: (state, action) => {

      const newColor =  state.colorPalette.includes(action.payload)

      if(newColor === false){

        state.colorPalette.push(action.payload)
        state.colorPalette.length > 10 && state.colorPalette.shift()
        
      }

    },

    setColorPickerEditor: (state, action) => {

      if(action.payload.source === "display"){
      
        state.colorPickerEditor.displayColorPicker = !action.payload.display

      }else if(action.payload.source === "displayFalse"){

        state.colorPickerEditor.displayColorPicker = false
      
      }else{

        state.colorPickerEditor.colorRGBA = action.payload.colorRGBA
      
      }
      
    }

  }

})

export const {
  setColorPalette,
  setColorPickerEditor
} = styleSlice.actions
export default styleSlice.reducer