import {useEffect, useState} from "react"

//COMPONENTS
import ColorPicker from "../tools/colorPicker/ColorPicker.jsx"

//REDUX
import { useSelector } from "react-redux"


export default function TextArea_Controler({
  canvasElements, 
  setCanvasElements,
  indexSelected,
  setAutoLayers,
  autoLayers,
  setShowColorPicker,
  showColorPicker
}) {

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //STATES
  const[selection, setSelection] = useState({
    source:"",
    limit:0
  })

  useEffect(() => {

    setShowColorPicker("")

  }, [indexSelected])

  return (

    <>
    
      {canvasElements[indexSelected]?.type === "text" &&

        <Group>
          
          <Labels htmlFor="textSize">
            {settings?.language === "es" && "Tamaño del texto"}
            {settings?.language === "en" && "Text size"}
            {settings?.language === "kr" && "텍스트 크기"}
          </Labels>

          <MiniFlex>

            <Button 
              border={theme?.border}
              backgroundcolor={theme?.bgColor2}
            >
              <Icon_FormatSizeOutlinedIcon/>

              <Input_Size 
                type="number"
                id="textSize"
                placeholder="10px"
                maxLength={2}
                value={canvasElements[indexSelected]?.textSize}
                onChange={(event)=>{

                  if(event.target.value <= 99) {

                    setCanvasElements(currentElements =>
                      currentElements.map((element, idx) =>
                        idx === indexSelected ? { ...element, textSize: event.target.value } : element
                      )
                    )
                  
                  }

                }}    
        
                //STYLE PROPS
                backgroundcolor={theme?.bgColor3}
                border={theme?.border}
                textColor={theme?.textColor}
              />
            </Button>
        
            <Button 
              border={`2px solid ${canvasElements[indexSelected]?.textColor}`}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> setShowColorPicker("textColor")}
            >
        
              <Icon_FormatColorFillOutlinedIcon/>
        
              {showColorPicker === "textColor" &&
        
                <ColorPicker 
                  color={canvasElements[indexSelected]?.textColor}
                  onSendData={(data)=>{
                    setCanvasElements (currentElements =>
                      currentElements.map((element, idx) =>
                        idx === indexSelected ? { ...element, textColor: data } : element
                      ))}
                  }
                />
        
              }
        
            </Button>
        
          </MiniFlex>

        </Group>

      }

      {canvasElements[indexSelected]?.type === "text" &&

        <>

          <Group>

            <MiniTitle>
              {settings?.language === "es" && "Color de fondo"}
              {settings?.language === "en" && "Background color"}
              {settings?.language === "kr" && "배경 색상"}
            </MiniTitle>

            <MiniFlex>

              <Button 
                border={theme?.border}
                backgroundcolor={theme?.bgColor2}
                onClick={()=> {
                  setCanvasElements(currentElements =>
                    currentElements.map((element, idx) =>
                      idx === indexSelected ? { ...element, textBackgroundColor: "transparent" } : element
                    )
                  )}
                }
              >
              
                <Icon_CropDinOutlinedIcon/>
              
              </Button>
              
              <Button 
                border={canvasElements[indexSelected]?.textBackgroundColor === "transparent"? theme?.border : `2px solid ${canvasElements[indexSelected]?.textBackgroundColor}`}
                backgroundcolor={theme?.bgColor2}
                onClick={()=> setShowColorPicker("bgColor")}
              >
              
                <Icon_FormatColorFillOutlinedIcon/>
              
                {showColorPicker === "bgColor" &&
              
                  <ColorPicker 
                    color={canvasElements[indexSelected]?.textBackgroundColor}
                    onSendData={(data)=>
                      setCanvasElements(currentElements =>
                        currentElements.map((element, idx) =>
                          idx === indexSelected ? { ...element, textBackgroundColor: data } : element
                        )
                      )}
                  />
              
                }
              
              </Button>
              
            </MiniFlex>

          </Group>


          <Group>

            <MiniTitle>
              {settings?.language === "es" && "Opacidad del fondo"}
              {settings?.language === "en" && "Background opacity"}
              {settings?.language === "kr" && "배경 불투명도"}
            </MiniTitle>

            <MiniFlex>

              <BarButton border={theme?.border}>

                <input 
                  onChange={(event) => {
                    setCanvasElements(currentElements =>
                      currentElements.map((element, idx) =>
                        idx === indexSelected ? { ...element, textBGOpacity: event.target.value } : element
                      ))
                  }}
                  type="range" min="0.1" max="1" step="0.1" value={canvasElements[indexSelected]?.textBGOpacity} className="PB-range-slider" id="myRange"/>
                      
                <p className="PB-range-slidervalue">{canvasElements[indexSelected]?.textBGOpacity}</p>

              </BarButton>
                
            </MiniFlex>

          </Group>
          
        </>

      }

      {canvasElements[indexSelected]?.type === "text" &&

        <Group>

          <MiniTitle>
            {settings?.language === "es" && "Estilo del texto"}
            {settings?.language === "en" && "Text style"}
            {settings?.language === "kr" && "텍스트 스타일"}
          </MiniTitle>

          <MiniFlex>

            <Button
              border={canvasElements[indexSelected]?.bold? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, bold: !element.bold } : element
                  ))}
              }
            >
              <Icon_FormatBoldOutlinedIcon/>
            </Button>

            <Button
              border={canvasElements[indexSelected]?.italic? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, italic: !element.italic } : element
                  ))}
              }
            >
              <Icon_FormatItalicOutlinedIcon/>
            </Button>
            
            <Button
              border={canvasElements[indexSelected]?.underline? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, underline: !element.underline } : element
                  ))}
              }
            >
              <Icon_FormatUnderlinedOutlinedIcon/>
            </Button>

          </MiniFlex>

        </Group>

      }


      {canvasElements[indexSelected]?.type === "text" &&

        <Group>

          <MiniTitle>
            {settings?.language === "es" && "Alineación del texto"}
            {settings?.language === "en" && "Text alignment"}
            {settings?.language === "kr" && "텍스트 정렬"}
          </MiniTitle>

          <MiniFlex>

            <Button
              border={canvasElements[indexSelected]?.textAlign === "left"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, textAlign: "left" } : element
                  ))}
              }
            >
              <Icon_FormatAlignLeftOutlinedIcon/>
            </Button>

            <Button
              border={canvasElements[indexSelected]?.textAlign === "center"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, textAlign: "center" } : element
                  ))}
              }
            >
              <Icon_FormatAlignCenterOutlinedIcon/>
            </Button>

            <Button
              border={canvasElements[indexSelected]?.textAlign === "right"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, textAlign: "right" } : element
                  ))}
              }
            >
              <Icon_FormatAlignRightOutlinedIcon/>
            </Button>
            
            <Button
              border={canvasElements[indexSelected]?.textAlign === "justify"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, textAlign: "justify" } : element
                  ))}
              }
            >
              <Icon_FormatAlignJustifyOutlinedIcon/>
            </Button>

          </MiniFlex>

        </Group>

      }

      <Group>

        <MiniTitle>
          {settings?.language === "es" && "Control de capas"}
          {settings?.language === "en" && "Layers Control"}
          {settings?.language === "kr" && "레이어 제어"}
        </MiniTitle>

        <MiniFlex>

          <BarButton border={theme?.border}>

            <input 
              disabled={autoLayers}
              style={{opacity: autoLayers? 0.2 : 1, cursor: autoLayers? "not-allowed" : "pointer"}}
              onChange={(event) => {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, textZIndex: event.target.value } : element
                  ))
              }}
              type="range" min="1" max="10" step="1" value={canvasElements[indexSelected]?.textZIndex} className="PB-range-slider" id="myRange"
            />
  
            <p className="PB-range-slidervalue">{canvasElements[indexSelected]?.textZIndex}</p>

          </BarButton>

          <Button border={theme?.border}
            onClick={()=> {  setAutoLayers(!autoLayers) }}
            title={
              autoLayers?
                (settings?.language === "es"? "Activar control manual de capas"
                  : settings?.language === "en"? "Activate manual layers control"
                    : settings?.language === "kr" && "수동 레이어 제어 활성화"
                )
                :
                (settings?.language === "es"? "Activar control de capas automático"
                  : settings?.language === "en"? "Enable automatic layers control"
                    : settings?.language === "kr" && "자동 레이어 제어 활성화"
                )
            }
          >

            {autoLayers?
            
              <Icon_LayersOutlinedIcon/>
              :
              <Icon_TouchAppOutlinedIcon/>

            }

          </Button>

        </MiniFlex>

      </Group>

      <Group>

        <MiniTitle>
          {settings?.language === "es" && "Borde"}
          {settings?.language === "en" && "Border"}
          {settings?.language === "kr" && "테두리"}
        </MiniTitle>

        <MiniFlex>

          <Button 
            border={selection.source === "none"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
            onClick={()=> {

              setSelection({
                source:"none",
                limit: 0
              })
              setCanvasElements(currentElements =>
                currentElements.map((element, idx) =>
                  idx === indexSelected ? { ...element, border: !element.border } : element
                )
              )}

            }
          >

            {canvasElements[indexSelected]?.border === false?
              <Icon_BorderClearOutlinedIcon/>
              :
              <Icon_BorderOuterOutlinedIcon/>
            }

          </Button>

          
          {canvasElements[indexSelected]?.border &&

            <>

              <Button border={selection.source === "borderRadius"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
                onClick={()=> {
                  setSelection({
                    source:"borderRadius",
                    limit: 30
                  })
                }}
              >
                <Icon_BorderStyleOutlinedIcon/>
              </Button>

              <Button border={selection.source === "borderSize"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
                onClick={()=> {
                  setSelection({
                    source:"borderSize",
                    limit: 10
                  })
                }}
              >
                <Icon_LineWeightOutlinedIcon/>
              </Button>

            </>

          }

        </MiniFlex>

      </Group>

      {(selection.source === "borderRadius" || selection.source === "borderSize") && canvasElements[indexSelected]?.border &&

        <Group>

          {selection.source === "borderRadius" &&

            <Labels htmlFor="myRange">
              {settings?.language === "es" && "Tamaño del radio"}
              {settings?.language === "en" && "Radius size"}
              {settings?.language === "kr" && "반경 크기"}
            </Labels>

          }

          {selection.source === "borderSize" &&

            <Labels htmlFor="myRange">
              {settings?.language === "es" && "Tamaño del borde"}
              {settings?.language === "en" && "Border size"}
              {settings?.language === "kr" && "테두리 크기"}
            </Labels>

          }

          <BarButton border={theme?.border}>

            <input 
              onChange={(event) => {
                setCanvasElements(currentElements =>
                  currentElements.map((element, idx) =>
                    idx === indexSelected ? { ...element, [selection.source]: event.target.value } : element
                  ))
              }}
              value={canvasElements[indexSelected]?.[selection.source] || 1} 
              type="range" min="1" max={selection.limit} step="1" 
              className="PB-range-slider" 
              id="myRange"
            />

            <p className="PB-range-slidervalue">{canvasElements[indexSelected]?.[selection.source]}</p>

          </BarButton>

        </Group>

      }

      {canvasElements[indexSelected]?.border && 

        <Group>

          <MiniTitle>
            {settings?.language === "es" && "Color del borde"}
            {settings?.language === "en" && "Border color"}
            {settings?.language === "kr" && "테두리 색상"}
          </MiniTitle>

          <Button 
            border={`2px solid ${canvasElements[indexSelected]?.borderColor}`}
            backgroundcolor={theme?.bgColor2}
            onClick={()=> setShowColorPicker("boderColor")}
          >

            <Icon_BorderColorOutlinedIcon/>

            {showColorPicker === "boderColor" &&

                <ColorPicker 
                  color={canvasElements[indexSelected]?.borderColor}
                  onSendData={(data)=>
                    setCanvasElements(currentElements =>
                      currentElements.map((element, idx) =>
                        idx === indexSelected ? { ...element, borderColor: data } : element
                      )
                    )}
                />

            }

          </Button>

        </Group>

      }

      {canvasElements[indexSelected]?.type === "sticker" &&

        <>

          <Group>
                
            <MiniTitle>
              {settings?.language === "es" && "Sombras"}
              {settings?.language === "en" && "Shadows"}
              {settings?.language === "kr" && "그림자"}
            </MiniTitle>

            <MiniFlex>

              <Button
                border={canvasElements[indexSelected]?.shadow === ""? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
                backgroundcolor={theme?.bgColor2}
                onClick={()=> {
                  setCanvasElements(currentElements =>
                    currentElements.map((element, idx) =>
                      idx === indexSelected ? { ...element, shadow:"", shadowOpacity:0 } : element
                    ))}
                }
              >
                <Icon_DisabledByDefaultOutlinedIcon/>

              </Button>

              <Button
                border={canvasElements[indexSelected]?.shadow === "6px 6px 12px"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
                backgroundcolor={theme?.bgColor2}
                onClick={()=> {
                  setCanvasElements(currentElements =>
                    currentElements.map((element, idx) =>
                      idx === indexSelected ? { ...element, shadow:"6px 6px 12px", shadowOpacity:0.4 } : element
                    ))}
                }
              >

                <Icon_Filter1OutlinedIcon/>

              </Button>

              <Button
                border={canvasElements[indexSelected]?.shadow === "10px 10px 20px"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
                backgroundcolor={theme?.bgColor2}
                onClick={()=> {
                  setCanvasElements(currentElements =>
                    currentElements.map((element, idx) =>
                      idx === indexSelected ? { ...element, shadow:"10px 10px 20px", shadowOpacity:0.6 } : element
                    ))}
                }
              >

                <Icon_Filter2OutlinedIcon/>

              </Button>
          
              <Button
                border={canvasElements[indexSelected]?.shadow === "16px 16px 32px"? `2px solid ${theme?.bgButtonColorLight}` : theme?.border}
                backgroundcolor={theme?.bgColor2}
                onClick={()=> {
                  setCanvasElements(currentElements =>
                    currentElements.map((element, idx) =>
                      idx === indexSelected ? { ...element, shadow: "16px 16px 32px", shadowOpacity:0.8 } : element
                    ))}
                }
              >

                <Icon_Filter3OutlinedIcon/>

              </Button>

            </MiniFlex>

          </Group>

          <Group>

            <MiniTitle>
              {settings?.language === "es" && "Color de sombra"}
              {settings?.language === "en" && "Shadow color"}
              {settings?.language === "kr" && "그림자 색상"}
            </MiniTitle>

            <Button 
              border={`2px solid ${canvasElements[indexSelected]?.shadowColor}`}
              backgroundcolor={theme?.bgColor2}
              onClick={()=> setShowColorPicker("shadowColor")}
            >

              <Icon_FormatColorFillOutlinedIcon/>

              {showColorPicker === "shadowColor" &&

                <ColorPicker 
                  color={canvasElements[indexSelected]?.shadowColor}
                  onSendData={(data)=>
                    setCanvasElements(currentElements =>
                      currentElements.map((element, idx) =>
                        idx === indexSelected ? { ...element, shadowColor: data } : element
                      )
                    )}
                />

              }

            </Button>

          </Group>

        </>

      }

    </>

  )

}

import styled from "styled-components"

import { LabelTemplate, MiniTitleTemplate } from "../styleComponents/ThemeStyles.jsx"

import FormatSizeOutlinedIcon from "@mui/icons-material/FormatSizeOutlined"
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined"
import CropDinOutlinedIcon from "@mui/icons-material/CropDinOutlined"
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined"
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined"
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined"
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined"
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined"
import BorderStyleOutlinedIcon from "@mui/icons-material/BorderStyleOutlined"
import BorderOuterOutlinedIcon from "@mui/icons-material/BorderOuterOutlined"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import BorderClearOutlinedIcon from "@mui/icons-material/BorderClearOutlined"
import LineWeightOutlinedIcon from "@mui/icons-material/LineWeightOutlined"
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined"
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined"
import Filter2OutlinedIcon from "@mui/icons-material/Filter2Outlined"
import Filter3OutlinedIcon from "@mui/icons-material/Filter3Outlined"
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined"
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined"
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined"
import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined"

const Icon_DisabledByDefaultOutlinedIcon = styled(DisabledByDefaultOutlinedIcon)`
  font-size: 26px;
`
const Icon_Filter1OutlinedIcon = styled(Filter1OutlinedIcon)`
  font-size: 26px;
`
const Icon_Filter2OutlinedIcon = styled(Filter2OutlinedIcon)`
  font-size: 26px;
`
const Icon_Filter3OutlinedIcon = styled(Filter3OutlinedIcon)`
  font-size: 26px;
`
const Icon_TouchAppOutlinedIcon= styled(TouchAppOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatColorFillOutlinedIcon = styled(FormatColorFillOutlinedIcon)`
  font-size: 16px;
`
const Icon_FormatSizeOutlinedIcon = styled(FormatSizeOutlinedIcon)`
  font-size: 16px;
`
const Icon_CropDinOutlinedIcon = styled(CropDinOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatAlignCenterOutlinedIcon = styled(FormatAlignCenterOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatAlignJustifyOutlinedIcon = styled(FormatAlignJustifyOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatAlignLeftOutlinedIcon = styled(FormatAlignLeftOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatAlignRightOutlinedIcon = styled(FormatAlignRightOutlinedIcon)` 
  font-size: 26px;
`
const Icon_LayersOutlinedIcon = styled(LayersOutlinedIcon)`
  font-size: 26px;
`
const Icon_BorderStyleOutlinedIcon = styled(BorderStyleOutlinedIcon)`
  font-size: 26px;
`
const Icon_BorderOuterOutlinedIcon = styled(BorderOuterOutlinedIcon)`
  font-size: 26px;
`
const Icon_BorderColorOutlinedIcon = styled(BorderColorOutlinedIcon)`
  font-size: 16px;
`
const Icon_BorderClearOutlinedIcon = styled(BorderClearOutlinedIcon)`
  font-size: 26px;
`
const Icon_LineWeightOutlinedIcon = styled(LineWeightOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatBoldOutlinedIcon = styled(FormatBoldOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatItalicOutlinedIcon = styled(FormatItalicOutlinedIcon)`
  font-size: 26px;
`
const Icon_FormatUnderlinedOutlinedIcon = styled(FormatUnderlinedOutlinedIcon)`
  font-size: 26px;
`
const Group = styled.div`
  display: flex;
  flex-direction: column;
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
const MiniFlex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
` 
const Input_Size = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundcolor};
  color: ${props => props.textColor};
  height: 25px;
  width: 35px;
  font-size: 12px;
  border-radius: 4px;
  border: ${props => props.border};
  text-align: center;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
`
const Labels = styled(LabelTemplate)`
`
const MiniTitle = styled(MiniTitleTemplate)`
`
const BarButton = styled.div`
  border: ${props => props.border};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px 0px #1F1E241F;
  min-width: 120px;
`