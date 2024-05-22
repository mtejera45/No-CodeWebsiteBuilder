import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

//COMPONENTS
import AdjustOpacity from "../tools/functions/AdjustOpacity.jsx"


export default function TextArea({
  element, 
  setCanvasElements, 
  index, 
  autoLayers,
  setIndexSelected,
  indexSelected,
  canvasElements,
  dragContainer,
  uiElementColor
}) {
  
  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)
    

  //STATES
  const[startPositionTextArea, setStartPositionTextArea] = useState({ 
    x: element?.textPosition?.x, 
    y: element?.textPosition?.y 
  })

  //////// DRAGGING ////////

  const containerRect = dragContainer?.current?.getBoundingClientRect()


  const HandleMouseDown = () => {

    setCanvasElements(currentElements =>
      currentElements.map((element, idx) =>
        idx === index ? { ...element, isDragging: true } : element
      ))

  }

  const HandleMouseUp = () => {

    setCanvasElements(currentElements =>
      currentElements.map((element, idx) =>
        idx === index ? { ...element, isDragging: false } : element
      ))  

  }

  const HandleMouseMove = (event) => {

    if (element.isDragging) {

      let initialX = containerRect.x
      let initialY = containerRect.y

      let dx = event.clientX - initialX
      let dy = event.clientY - initialY
    

      setCanvasElements(currentElements => 
        currentElements?.map((element, idx) => 
          idx === index ? {
            ...element,
            textPosition: { x:dx, y:dy}
          } : element
        )
      )

    }

  }

  useEffect(() => {

    window.addEventListener("mousemove", HandleMouseMove)
    window.addEventListener("mouseup", HandleMouseUp)

    return () => {
      window.removeEventListener("mousemove", HandleMouseMove)
      window.removeEventListener("mouseup", HandleMouseUp)
    }

  },[element.isDragging])


  //////// RESIZING ////////


  const StartResize_TextArea = (event) => {

    setStartPositionTextArea({ x: event.clientX, y: event.clientY })

    event.preventDefault()

  }

  const Resize_Area = (event) => {

    if(!element.isResizing) return

    const dx = event.clientX - startPositionTextArea.x
    const dy = event.clientY - startPositionTextArea.y

    setCanvasElements(currentElements =>
      currentElements.map((element, idx) =>
        idx === index ? {
          ...element,
          textBoxSize: {
            width: Math.max(element.textBoxSize.width + dx, 10),
            height: Math.max(element.textBoxSize.height + dy, 10)
          }
        } : element
      )
    )

    setStartPositionTextArea({ x: event.clientX, y: event.clientY })

  }  


  return (

    <DraggableArea
      style={{
        width: `${element?.textBoxSize?.width}px`,
        height: `${element?.textBoxSize?.height}px`,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: `${element?.textPosition?.x}px`,
        top: `${element?.textPosition?.y}px`,
        cursor: element.isDragging ? "grabbing" : "grab",
        zIndex: element?.textZIndex,
        borderRadius: element?.borderRadius
      }}>

      <Text
        name="text"
        id="text"
        type="text"
        placeholder={
          settings?.language === "es"? "Escribe algo sobre tu tienda..."
            : settings?.language === "en"? "Write something about your store..."
              : settings?.language === "kr"? "상점에 대해 무언가를 써보세요..."
                : ""
        }
        maxLength={2000}
        value={element?.text}

        onChange={(event) =>
          setCanvasElements(currentElements =>
            currentElements.map((element, idx) =>
              idx === index ? { ...element, text: event.target.value } : element
            )
          )
        }

        onClick={(event) => {
          setIndexSelected(index)
          event.stopPropagation()
          event.preventDefault()
          setCanvasElements(currentElements =>
            currentElements.map((element, idx) =>
              idx === index ? { ...element, isDragging: false } : element
            ))

          if(autoLayers){

            setCanvasElements(currentElements =>
              currentElements.map((element, idx) =>
                idx === index ? 
                  { ...element, textZIndex: canvasElements.length } 
                  : 
                  { ...element, textZIndex: canvasElements.length - 1}
              ))
            
          }

        }}

        props={{
          bold: element?.bold ? "bold" : "normal",
          italic: element?.italic ? "italic" : "normal",
          underline: element?.underline ? "underline" : "none",
          color: element?.textColor,
          size: element?.textSize,
          backgroundcolor: AdjustOpacity(element?.textBackgroundColor, element?.textBGOpacity),
          align: element?.textAlign,
          borderRadius: element?.borderRadius,
          border: element?.border? `${element?.borderSize}px solid ${element?.borderColor} ` : `1px dashed ${uiElementColor}`,
          uiElementColor: uiElementColor
        }}
      >
      </Text>

      {indexSelected === index && indexSelected !== null && (

        <>

          <Icon_OpenWithOutlinedIcon 
            backgroundcolor={uiElementColor}
            onMouseDown={HandleMouseDown}
          />

          <Resize active={element?.isResizing? "true" : "false"}

            onMouseMove={Resize_Area}

            onMouseDown={StartResize_TextArea} 

            onMouseLeave={() => {

              setCanvasElements(currentElements =>
                currentElements.map((element, idx) =>
                  idx === index ? { ...element, isResizing: false } : element
                ))

            }}

            onMouseEnter={() => {

              setCanvasElements(currentElements =>
                currentElements.map((element, idx) =>
                  idx === index ? { ...element, isDragging: false } : element
                ))

            }}

            onClick={() => {

              setCanvasElements(currentElements =>
                currentElements.map((element, idx) =>
                  idx === index ? { ...element, isResizing: !element?.isResizing } : element
                ))

            }}

          >

            <Icon_HighlightAltOutlinedIcon 
              backgroundcolor={uiElementColor}
              highlight={theme.bgButtonColorLight}
              isresizing={element?.isResizing? "true" : "false"}
            />

          </Resize>

          <Icon_CloseOutlinedIcon backgroundcolor={uiElementColor}

            onClick={() => {

              setCanvasElements(currentElements =>
                currentElements.filter((element, idx) => idx !== index)
              )
  
              setIndexSelected(null)
  
            }}

          />

        </>

      )}

    </DraggableArea>
    
  )

}

//STYLES

import styled from "styled-components"

import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined"
import HighlightAltOutlinedIcon from "@mui/icons-material/HighlightAltOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

const DraggableArea= styled.div`
  position: sticky;
  cursor: ${props => props.mouse === "true" ? "move" : "auto"};
  max-width: 95%;
  max-height: 95%;
  min-height: 30px;
`
const Text = styled.textarea`
  width: 100%;
  height: 100%;
  color: ${props => props.props.color};
  font-size: ${props => (props.props.size) + "px"};
  background-color: ${props => props.props.backgroundcolor};
  text-align: ${props => props.props.align};
  border: ${props => props.props.border};
  border-radius: ${props => props.props.borderRadius}px;
  text-decoration: ${props => props.props.underline};
  font-weight: ${props => props.props.bold};
  font-style: ${props => props.props.italic};
  cursor: ${props => props.mouse === "true" ? "move" : "auto"};
  overflow: hidden;
  padding: 10px 15px;
  resize: none;

  ::-webkit-input-placeholder {
    color: ${props => props.props.uiElementColor};
  }
  :focus {
    outline: none;
  }
  :focus::placeholder { 
    color: transparent;
  }
  ::placeholder {
    padding-left: 5px;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
  } 
`
const Resize = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${props => props.active === "true" ? "-95px" : "-40px"};
  bottom: ${props => props.active === "true" ? "-95px" : "-45px"};
  height: ${props => props.active === "true" ? "200px" : "90px"};
  width: ${props => props.active === "true" ? "200px" : "90px"};
  background-color: ${props => props.active === "true" ? "rgba(0,0,0,0.3)" : "transparent"};
  border-radius: 50%;
  min-height: 100px;
  cursor: s-resize;
`
const Icon_OpenWithOutlinedIcon = styled(OpenWithOutlinedIcon)`
  background-color: ${props => props.backgroundcolor};
  color: ${props => props.backgroundcolor === "white" ? "black" : "white"};

  font-size: 23px;
  position: absolute;
  left: -10px;
  top: -10px;
  padding: 4px;
  border-radius: 50%;
  cursor: move;
`
const Icon_HighlightAltOutlinedIcon = styled(HighlightAltOutlinedIcon)`
  background-color: ${props => props.isresizing === "true" ? `${props.highlight}` : `${props.backgroundcolor}` };
  color: ${props => props.backgroundcolor === "white" ? "black" : "white"};

  font-size: 26px;
  padding: 5px;
  border-radius: 50%;
  cursor: se-resize;
`
const Icon_CloseOutlinedIcon = styled(CloseOutlinedIcon)`
  background-color: ${props => props.backgroundcolor};
  color: ${props => props.backgroundcolor === "white" ? "black" : "white"};

  font-size: 24px;
  position: absolute;
  right: -10px;
  top: -10px;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #a42e2e;
  }
`