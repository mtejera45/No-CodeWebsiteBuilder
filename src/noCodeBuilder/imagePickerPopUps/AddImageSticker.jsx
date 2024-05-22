import { useState, useCallback } from "react"

//COMPONENTS
import ImageGallery_Stickers from "./imageGalleries/ImageGalleryStickers.jsx"

//TOOLS
import Action_Button from "../../tools/buttons/ActionButton.jsx"
// import ImageSearchBar from "../../tools/images_picker/ImageSearchBar.jsx"

//REDUX
import { useSelector } from "react-redux"

export default function Add_Image_Sticker({
  canvasElements,
  setCanvasElements,
  divice,
  setShowPopUp
}) {

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)

  //STATE
  const[stickerURL, setStickerURL] = useState("")

  //HANDLE STICKERS
  const handle_Stickers = useCallback((data) => {

    setStickerURL(data)

  }, [])
  

  return (

    <PopUpMainContainer>

      <PopUpContainer backgroundcolor={theme?.bgColor0}>

        <Action_Button 
          theme={"white"} 
          absolute={"true"} 
          margin={"20px"} 
          action={"close"}
          setShowPopUp={setShowPopUp}
          link={""}
        />

        <Mini_Column_Flex>

          {/* <ImageSearchBar 
            onSendData={handle_Stickers}
            props={{
              id:"image",
              empty:false, 
              imageLink: stickerURL
            }}
          /> */}

          <ImageGallery_Stickers 
            onSendData={handle_Stickers}
            stickerURL={stickerURL}
          />

        </Mini_Column_Flex>

        <ButtonSaveContainer>

          <ButtonSave

            onClick={()=> 

              stickerURL !== "" &&
              
                setCanvasElements(
                  [...canvasElements, {
                    text: "",
                    type: "sticker",
                    imageURL: stickerURL,
                    textSize: 18,                    
                    textColor: "white",
                    textPosition: divice === "desktop"? 
                      { x: 250 + (canvasElements.length * 20), y: 50 + (canvasElements.length * 20)} 
                      : 
                      { x: 10 + (canvasElements.length * 10), y: 200 + (canvasElements.length * 10)},                
                    textBoxSize: { width: 100, height: "auto" },
                    textBackgroundColor: "transparent",
                    textBGOpacity: 0.5,
                    textAlign: "",
                    textZIndex: canvasElements.length + 1,
                    border: false,
                    borderRadius: 10,
                    borderSize: 2,
                    borderColor: "#f0f0f0",
                    rotate: 0,
                    shadow:"",
                    shadowColor: "",
                    shadowOpacity: 0,
                    divice: divice,
                    bold: false,
                    italic: false,
                    underline: false,
                    isDragging: false,
                    isResizing: false,
                  }]
                )
            }

            className={"Admin_Panel_Button"}
          >
            {settings?.language === "es" && "Agregar"}
            {settings?.language === "en" && "Add"}
            {settings?.language === "kr" && "추가"}
          </ButtonSave>

        </ButtonSaveContainer>

      </PopUpContainer>
                
    </PopUpMainContainer>
    
  )

}

//STYLES

import styled from "styled-components"

import { 
  ButtonTemplate 
} from "../../styleComponents/ThemeStylesButtons.jsx"

import { 
  PopUpTemplate, 
  PopUpWindowTemplate 
} from "../../styleComponents/ThemeStylesPopUp.jsx"

const PopUpMainContainer = styled(PopUpWindowTemplate)`
  padding-top: 3%;
  z-index: 9999;
`
const PopUpContainer = styled(PopUpTemplate)`
  padding-top: 50px;
`
const Mini_Column_Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const ButtonSaveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`
const ButtonSave = styled(ButtonTemplate)`
`