import { useState } from "react"

import Draggable from "react-draggable"

//COMPONENTS
import ElementToolBar from "./ElementToolBar.jsx"
import AddImageBackground from "./imagePickerPopUps/AddImageBackground.jsx"
import AddImageSticker from "./imagePickerPopUps/AddImageSticker.jsx"
import ColorPicker from "../tools/colorPicker/ColorPicker.jsx"

//REDUX
import { useSelector } from "react-redux"


export default function ToolBar({
  setCanvasBackground,
  canvasBackground,
  setCanvasElements,
  canvasElements,
  showColorPicker,
  setShowColorPicker,
  indexSelected,
  setAutoLayers,
  autoLayers,
  setDivice,
  divice,
}) {

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //STATES
  const[showPopUp, setShowPopUp] = useState("")
  const[blockContolersDrag, setBlockContolersDrag] = useState(false)
  const[toggle, setToggle] = useState(true)

  return (
    
    <>

      {showPopUp === "backgroundPopUp" &&

        <AddImageBackground
          canvasBackground={canvasBackground}
          setCanvasBackground={setCanvasBackground}
          divice={divice}
          setShowPopUp={setShowPopUp}
        />

      }

      {showPopUp === "stickerPopUp" &&

        <AddImageSticker 
          canvasElements={canvasElements}
          setCanvasElements={setCanvasElements}
          divice={divice}
          setShowPopUp={setShowPopUp}
        />

      }

      {/* DRAGGABLE IS A LIBRARY THAT ALLOWS USERS TO DRAG ELEMENTS IN A SIMPLE WAY.

          HOWEVER, IN THIS PROJECT THIS LIBRARY IS USED TO MOVE ONLY THE CONTROL BAR
          THE OTHER ELEMENTS IN THE CANVAS ARE DRAGGED USING VANILLA JAVASCRIPT.

          IN CASE, YOU WANT TO USE THIS LIBRARY TO DRAG ALL THE ELEMENTS AND ENJOY ITS DRAGGING FUNCTIONALITIES,
          YOU CAN FOLLOW THE INSTRUCTIONS IN THE DOCUMENTATION: https://www.npmjs.com/package/react-draggable
      */}

      <Draggable
        axis="both"
        handle={blockContolersDrag? null : ".handle"}
        position={null}
        scale={1}
        bounds="parent"
        cancel={blockContolersDrag ? "input" : null}
      >

        {/* CONTROL BAR MAIN CONTAINER */}

        <MainContainer 
          height={canvasElements[indexSelected]?.border? "true" : "false"}
          elementype={toggle? canvasElements[indexSelected]?.type : "none"} 
          className={blockContolersDrag? null : "handle"}
          backgroundcolor={theme?.bgColor2}
        >

          <Header>

            <p>
              {settings?.language === "es" && "Panel"}
              {settings?.language === "en" && "Panel"}
              {settings?.language === "kr" && "패널"}
            </p>

            {toggle?
          
              <Icon_KeyboardArrowUpOutlinedIcon onClick={()=> setToggle(false)}/>
              :
              <Icon_KeyboardArrowDownOutlinedIcon onClick={()=> setToggle(true)}/>

            }
          </Header>
          
          {toggle &&

            <ScrollableContent>

              {/* BACKGROUND IMAGE AND COLOR */}
              
              <Group>

                <MiniTitle>
                  {settings?.language === "es" && "Fondo"}
                  {settings?.language === "en" && "Background"}
                  {settings?.language === "kr" && "배경"}
                </MiniTitle>

                <Flex>

                  {/* SHOWING THE POPUP TO ADD A BACKGROUND IMAGE */}

                  <Button
                    onClick={()=> setShowPopUp("backgroundPopUp")}
                    backgroundcolor={theme?.bgColor2}
                    textcolor={theme?.textColor}
                    border={theme?.border}
                  >

                    <Icon_PhotoSizeSelectActualOutlinedIcon/>

                  </Button>
                  
                  {/* SHOWING PICKUP COLOR PALETTE TO CHANGE THE BACKGROUND COLOR */}

                  <Button 
                    border={`2px solid ${canvasBackground.color}`}
                    backgroundcolor={theme?.bgColor2}
                    onClick={()=> setShowColorPicker("color")}
                  >
        
                    <Icon_FormatColorFillOutlinedIcon/>
        
                    {showColorPicker === "color" &&
        
                      <ColorPicker 
                        color={canvasBackground?.color}
                        onSendData={(data)=>{
                          setCanvasBackground(prevState => ({
                            ...prevState,
                            color:data
                          }))
                        }}
                      />
        
                    }
        
                  </Button>

                </Flex>

              </Group>

              <Flex>

                {/* ADDING TEXT */}

                <Group>

                  <MiniTitle>
                    {settings?.language === "es" && "Texto"}
                    {settings?.language === "en" && "Text"}
                    {settings?.language === "kr" && "텍스트"}
                  </MiniTitle>

                  <Button
                    onClick={()=>   { 

                      {/* MAXIMUM OF 10 ELEMENTS IN THE CANVAS */} 
                      {/* MODIFIY THE NUMBER IN THE IF STATEMENT IN CASE YOU WANT TO ADD MORE ELEMENTS*/}

                      if(canvasElements.length <= 10){

                        setCanvasElements(
                          [...canvasElements, {
                            text:"",
                            type: "text",
                            textSize: divice === "desktop"? 20 : 14,                    
                            textColor: "white",
                            textPosition: divice === "desktop"? 
                              { x: 380 + (canvasElements.length * 10), y: 150 + (canvasElements.length * 10)} 
                              : 
                              { x: 10 + (canvasElements.length * 5), y: 200 + (canvasElements.length * 5)},
                            textBoxSize: divice === "desktop"? { width: 500, height: 200 } : { width: 310, height: 100 },
                            textBackgroundColor: "transparent",
                            textBGOpacity: 0.5,
                            textAlign: "left",
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
                            isResizing: false
                          }]
                        )

                      }else{

                        alert(settings.language === "es"? "No puedes agregar más de 6 elementos"
                          : settings.language === "en"? "You can't add more than 6 elements"
                            : settings.language === "kr" && "6개 이상의 요소를 추가할 수 없습니다"
                        )

                      }

                    }}

                    border={theme?.border}
                    backgroundcolor={theme?.bgColor2}
                    textcolor={theme?.textColor}
                  >

                    <Icon_PlaylistAddOutlinedIcon/>

                  </Button>

                </Group>

                {/* ADDING STICKER */}

                <Group>

                  <MiniTitle>
                    {settings?.language === "es" && "Sticker"}
                    {settings?.language === "en" && "Sticker"}
                    {settings?.language === "kr" && "스티커"}
                  </MiniTitle>

                  <Button
                    onClick={()=>   { 

                      {/* MAXIMUM OF 10 ELEMENTS IN THE CANVAS */} 
                      {/* MODIFIY THE NUMBER IN THE IF STATEMENT IN CASE YOU WANT TO ADD MORE ELEMENTS*/}

                      if(canvasElements.length <= 10){

                        setShowPopUp("stickerPopUp")
                  
                      }else{

                        alert(settings.language === "es"? "No puedes agregar más de 6 elementos"
                          : settings.language === "en"? "You can't add more than 6 elements"
                            : settings.language === "kr" && "6개 이상의 요소를 추가할 수 없습니다"
                        )

                      }

                    }}

                    border={theme?.border}
                    backgroundcolor={theme?.bgColor2}
                    textcolor={theme?.textColor}
                  >

                    <Icon_AddPhotoAlternateOutlinedIcon/>

                  </Button>

                </Group>

              </Flex>
            
              {/* CHOOSING DEVICE */}

              <Group>

                <MiniTitle>
                  {settings?.language === "es" && "Dispositivo"}
                  {settings?.language === "en" && "Device"}
                  {settings?.language === "kr" && "장치"}
                </MiniTitle>
          
                <Flex>
        
                  <Button
                    id="device"
                    onClick={()=> setDivice("desktop")}

                    //STYLE PROPS
                    backgroundcolor={divice === "desktop"? 
                      `${theme?.bgButtonColorDark}` 
                      : 
                      `${theme?.bgButtonColorLight}`
                    }    
                    textcolor={divice === "desktop"? theme?.textButtonColorSelected : theme?.textButtonColor}
                  >
        
                    <Icon_DesktopWindowsOutlinedIcon/>

                  </Button>
        
                  <Button
                    id="device"
                    onClick={()=> setDivice("mobile")}
        
                    //STYLE PROPS
                    backgroundcolor={divice === "mobile"? 
                      `${theme?.bgButtonColorDark}` 
                      : 
                      `${theme?.bgButtonColorLight}`
                    }        
                    color={divice === "mobile"? theme?.textButtonColorSelected : theme?.textButtonColor}
                  >
                    <Icon_PhoneIphoneOutlinedIcon />
        
                  </Button>
        
                </Flex>

              </Group>

              {indexSelected !== null &&

                <Group
                  onMouseEnter={()=> setBlockContolersDrag(true)}
                  onMouseLeave={()=> setBlockContolersDrag(false)}
                >

                  {/* THE ***ElementToolBar**** COMPONENT IS USED TO MODIFY THE PROPERTIES OF THE ELEMENTS IN THE CANVAS */}
                  {/* THE ELEMENT TOOLBAR IS DISPLAYED ONLY WHEN AN ELEMENT IS SELECTED */}

                  <ElementToolBar
                    autoLayers={autoLayers}
                    setAutoLayers={setAutoLayers}
                    setCanvasElements={setCanvasElements}
                    canvasElements={canvasElements}
                    indexSelected={indexSelected}
                    canvasBackground={canvasBackground}
                    setShowColorPicker={setShowColorPicker}
                    showColorPicker={showColorPicker}
                  />

                </Group>

              }

            </ScrollableContent>

          }

        </MainContainer>

      </Draggable>

    </>

  )

}

//STYLES

import styled from "styled-components"

import { MiniTitleTemplate } from "../styleComponents/ThemeStyles.jsx"

//ICONS
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined"
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined"
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined"
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined"
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined"
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined"

const Icon_FormatColorFillOutlinedIcon = styled(FormatColorFillOutlinedIcon)`
  font-size: 16px;
`
const Icon_KeyboardArrowDownOutlinedIcon= styled(KeyboardArrowDownOutlinedIcon)`
  font-size: 26px;  
  cursor: pointer;  
`
const Icon_KeyboardArrowUpOutlinedIcon= styled(KeyboardArrowUpOutlinedIcon)`
  font-size: 26px;
  cursor: pointer;  
`
const Icon_PhotoSizeSelectActualOutlinedIcon = styled(PhotoSizeSelectActualOutlinedIcon)`
  font-size: 25px;
`
const Icon_DesktopWindowsOutlinedIcon = styled(DesktopWindowsOutlinedIcon)`
  font-size: 20px;
`
const Icon_PhoneIphoneOutlinedIcon = styled(PhoneIphoneOutlinedIcon)`
  font-size: 20px;
`
const Icon_PlaylistAddOutlinedIcon = styled(PlaylistAddOutlinedIcon)`
  font-size: 30px;
`
const Icon_AddPhotoAlternateOutlinedIcon = styled(AddPhotoAlternateOutlinedIcon)`
  font-size: 25px;
`

//////// <><><><><> //////// <><><><><> //////// <><><><><> //////// <><><><><> ////////


const MainContainer = styled.div`
  color:white;
  margin: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 15px;
  top: 0;
  left: 0;
  padding: 15px;
  width: 200px;
  height: ${props => props.elementype === "text" ? "94.4vh" : "auto"};
  background-color: ${props => props.backgroundcolor};
  border-radius: 10px;
  cursor: move;
  z-index: 99;
  overflow-x: visible;
  max-height: ${props => props.height === "true" ? "980px" : "830px"};
`
const ScrollableContent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 15px;

  overflow-y: scroll;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
`
const Button = styled.div`
  background-color: ${props => props.backgroundcolor};
  color: ${props => props.textcolor};
  border: ${props => props.border};

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  gap: 7px;
  cursor: pointer;
`
const MiniTitle = styled(MiniTitleTemplate)`
`
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
`