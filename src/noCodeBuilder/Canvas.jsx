import { useState, useRef } from "react"

//COMPONENTS
import ToolBar from "./ToolBar.jsx"
import TextArea from "./TextArea.jsx"
import StickerArea from "./StickerArea.jsx"
import RingFetching from "../tools/layoutElements/RingFetching.jsx"
import PreviewButton from "../tools/buttons/PreviewButton.jsx"
import CleanButton from "../tools/buttons/CleanButton.jsx"

//REDUX
import { useSelector } from "react-redux"


export default function Canvas({
  canvasBackground,
  setCanvasBackground,
  canvasElements,
  setCanvasElements,
  saveCanvas,
  fetching,
  uiElementColor
}) {

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)

  //STATES
  const[indexSelected, setIndexSelected] = useState(null)
  const[autoLayers, setAutoLayers] = useState(true)
  const[divice, setDivice] = useState("desktop")
  const[showColorPicker, setShowColorPicker] = useState("")

  const dragContainer = useRef(null)

  //////// <><><><><> //////// <><><><><> //////// <><><><><> //////// <><><><><> ////////
    
  return (

    <MainContainer backgroundcolor={theme.bgColor0}>

      <ActionButtons>

        <PreviewButton divice={divice}/>

        <CleanButton 
          divice={divice}
          canvasElements={canvasElements}
          setCanvasElements={setCanvasElements}
        />

      </ActionButtons>

      <ToolBar 
        canvasBackground={canvasBackground}
        setCanvasBackground={setCanvasBackground}

        canvasElements={canvasElements}
        setCanvasElements={setCanvasElements}

        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}

        divice={divice}
        setDivice={setDivice}

        setAutoLayers={setAutoLayers}
        autoLayers={autoLayers}
        indexSelected={indexSelected}
      />
      
      <BackgroundImage 
        ref={dragContainer}
        image={divice === "desktop"? canvasBackground?.desktop : canvasBackground?.mobile}        
        divice={divice}
        backgroundColor={canvasBackground?.color}
        onClick={()=> setShowColorPicker("")}
      >

        {divice === "desktop"?
                
          <>

            <SafeArea 
              uiElementColor={uiElementColor} 
              divice={divice}
            ></SafeArea>

            {canvasElements?.map((element, index) => {

              return (

                element.type === "text"?
                          
                  element.divice === "desktop" &&

                  <TextArea
                    key={index}
                    dragContainer={dragContainer}
                    autoLayers={autoLayers}
                    canvasElements={canvasElements}
                    indexSelected={indexSelected}
                    setIndexSelected={setIndexSelected}
                    setCanvasElements={setCanvasElements}
                    element={element}
                    index={index}
                    divice={divice}
                    uiElementColor={uiElementColor}
                  />

                  :

                  element.divice === "desktop" &&

                  <StickerArea
                    key={index}
                    dragContainer={dragContainer}
                    autoLayers={autoLayers}
                    canvasElements={canvasElements}
                    indexSelected={indexSelected}
                    setIndexSelected={setIndexSelected}
                    setCanvasElements={setCanvasElements}
                    element={element}
                    index={index}
                    divice={divice}
                  />

              )})

            }

          </>

          :

          <>

            <SafeArea 
              uiElementColor={uiElementColor}
              divice={divice}
            ></SafeArea>

            {canvasElements?.map((element, index) => {

              return (

                element.type === "text"?

                  element.divice === "mobile" &&
                                
                  <TextArea
                    key={index}
                    dragContainer={dragContainer}
                    autoLayers={autoLayers}
                    canvasElements={canvasElements}
                    indexSelected={indexSelected}
                    setIndexSelected={setIndexSelected}
                    setCanvasElements={setCanvasElements}
                    element={element}
                    index={index}
                    divice={divice}
                    uiElementColor={uiElementColor}
                  />

                  :

                  element.divice === "mobile" &&

                  <StickerArea
                    key={index}
                    dragContainer={dragContainer}
                    autoLayers={autoLayers}
                    canvasElements={canvasElements}
                    indexSelected={indexSelected}
                    setIndexSelected={setIndexSelected}
                    setCanvasElements={setCanvasElements}
                    element={element}
                    index={index}
                    divice={divice}
                  />

              )})

            }

          </>

        }

      </BackgroundImage>

      {/*  SAVE BUTTON */}

      <Button_Container>
        
        <Button 
          onClick={()=> saveCanvas()}

          //STYLE PROPS
          className={"button"}
        >
          {fetching? <RingFetching/> 
            : 
            settings?.language === "es"? "Guardar"
              : settings?.language === "en"? "Save"
                : settings?.language === "kr"? "저장하기"
                  : "Save"
          }
        </Button>

      </Button_Container>

    </MainContainer>

  )

}

//STYLES

import styled from "styled-components"

import { ButtonTemplate } from "../styleComponents/ThemeStylesButtons.jsx"

const MainContainer = styled.div`
  position: relative;
  background-color: ${props => props.backgroundcolor};
  width: 100%;
  height: 100vh;
  display: flex;  
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const BackgroundImage = styled.div`
  position: relative; 
  width: ${props => props.divice === "desktop" ? "1280px" : "340px"};
  height: ${props => props.divice === "desktop" ? "800px" : "650px"};
  transform:${props => props.divice === "desktop" ? "translate(0%, 10%)" : "translate(0%, 10%)"};
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  background-color: ${props => props.backgroundColor};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
const SafeArea = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${props => props.divice === "desktop" ? "1280px" : "340px"};
  height: ${props => props.divice === "desktop" ? "800px" : "650px"};
  transform: translate(-50%, -50%);
  z-index: 999;
  pointer-events: none;
  background-color: transparent;
  border: 2px dashed ${props => props.uiElementColor};
`
const Button = styled(ButtonTemplate)`
`
const Button_Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: end;
  margin-top: 30px;
`
const ActionButtons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 30px;
  margin-right: 20px;
  display: flex;
  width: fit-content;
  gap: 10px;
`