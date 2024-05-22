import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

//TWITTER COLOR PICKER
import reactCSS from "reactcss"
import { TwitterPicker } from "react-color"

import {
  setColorPickerEditor,
  setColorPalette
} from "../../redux/styleRedux"


export default function ColorPicker({color, onSendData}) {

  const[colorHex, setColorHex] = useState(color || "")
  const[updateColors, setUpdateColors] = useState(false)

  //REDUX
  const dispatch = useDispatch()

  //REDUX STYLE
  const colorPickerEditor = useSelector(state => state.style.colorPickerEditor)
  const colorPalette = useSelector(state => state.style.colorPalette)

  //////// <><><><><> //////// <><><><><> //////// <><><><><> //////// <><><><><> ////////

    
  const styles = reactCSS({
    "default": {
      color: {
        width: "36px",
        height: "16px",
        borderRadius: "2px",
        background: colorHex,
      },
      swatch: {
        border: "1px solid #ffffff",
        padding: "1px",
        background: "#00000",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  })

  const customColors = colorPalette // CUSTOM PALETTE COLORS

  //////// <><><><><> //////// <><><><><> //////// <><><><><> //////// <><><><><> ////////

    
  return (

    <div>

      <div 
        style={styles.swatch} 
        onClick={()=> {
          dispatch(setColorPickerEditor({source:"display"}))
          setUpdateColors(updateColors)
        }}
      >

        <div style={styles.color}/>

      </div>

      {colorPickerEditor.displayColorPicker? 

        <div style={styles.popover}>

          <div style={styles.cover} 
            onClick={()=> {dispatch(setColorPickerEditor({source:"displayFalse"}))}}
          />

          <TwitterPicker 
            colors={customColors}
            
            onChange={(event)=> {

              onSendData(`rgba(${event.rgb.r}, ${event.rgb.g},${event.rgb.b},${event.rgb.a})`)

              setColorHex(event.hex)

              dispatch(setColorPalette(event.hex)) // UPDATE PALETTE COLORS

            }}

          />

        </div> 

        : 

        null 

      }

    </div>
  )
}