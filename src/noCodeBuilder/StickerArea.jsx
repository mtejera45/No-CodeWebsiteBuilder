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
  dragContainer
}) {

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

    setCanvasElements(currentElements =>
      currentElements.map((element, idx) =>
        idx === index ? {
          ...element,
          textBoxSize: {
            width: Math.max(element.textBoxSize.width + dx, 10),
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

      <Sticker
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
        src={element?.imageURL}
        props={{
          color: element?.textColor,
          size: element?.textSize,
          backgroundcolor: element?.textBackgroundColor !== "transparent" && AdjustOpacity(element?.textBackgroundColor, element?.textBGOpacity),
          align: element?.textAlign,
          borderRadius: element?.borderRadius,
          border: element?.border? `${element?.borderSize}px solid ${element?.borderColor} ` : "1px dashed white",
          shadow: element?.shadow + ` ${AdjustOpacity(element?.shadowColor, element?.shadowOpacity)}`, //KEEP THE SPACE BEFORE AdjustOpacity
        }}
      />

      {indexSelected === index && indexSelected !== null && (

        <>

          <Icon_OpenWithOutlinedIcon 
            backgroundcolor={theme.bgColor1}
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
              backgroundcolor={theme.bgColor1}
              highlight={theme.bgButtonColorLight}
              isresizing={element?.isResizing? "true" : "false"}
            />

          </Resize>

          <Icon_CloseOutlinedIcon backgroundcolor={theme.bgColor1}

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

const Icon_OpenWithOutlinedIcon = styled(OpenWithOutlinedIcon)`
  background-color: ${props => props.backgroundcolor};
  font-size: 26px;
  position: absolute;
  left: -15px;
  top: -15px;
  padding: 4px;
  border-radius: 50%;
  cursor: move;
`
const Icon_HighlightAltOutlinedIcon = styled(HighlightAltOutlinedIcon)`
  font-size: 28px;
  background-color: ${props => props.isresizing === "true" ? `${props.highlight}` : `${props.backgroundcolor}` };
  padding: 5px;
  border-radius: 50%;
  cursor: se-resize;
`
const Icon_CloseOutlinedIcon = styled(CloseOutlinedIcon)`
  background-color: ${props => props.backgroundcolor};
  font-size: 26px;
  position: absolute;
  right: -15px;
  top: -15px;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: red;
  }
`
const DraggableArea= styled.div`
  position: sticky;
  cursor: ${props => props.mouse === "true" ? "move" : "auto"};
  max-width: 95%;
  max-height: 95%;
  min-height: 30px;
`
const Sticker = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${props => props.props.backgroundcolor};
  border: ${props => props.props.border};
  border-radius: ${props => props.props.borderRadius}px;
  cursor: ${props => props.mouse === "true" ? "move" : "auto"};
  filter: drop-shadow(${props => props.props.shadow});
`
const Resize = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${props => props.active === "true" ? "-100px" : "-45px"};
  bottom: ${props => props.active === "true" ? "-100px" : "-50px"};
  cursor: s-resize;
  height: ${props => props.active === "true" ? "200px" : "90px"};
  width: ${props => props.active === "true" ? "200px" : "90px"};
  background-color: ${props => props.active === "true" ? "rgba(0,0,0,0.3)" : "transparent"};
  border-radius: 50%;
  min-height: 100px;
`