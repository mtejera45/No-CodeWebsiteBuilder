//COMPONENTS
import AdjustOpacity from "../tools/functions/AdjustOpacity.jsx"
import ActionButton from "../tools/buttons/ActionButton.jsx"

export default function Desktop_Preview({
  canvasBackground,
  canvasElements
}) {
  
  return (

    <MainContainer>
    
      <ActionButton 
        theme={"white"} 
        absolute={"true"} 
        margin={"20px"} 
        action={"navigate"} 
        link={"/"}
      />

      <BackgroundContainer 
        backgroundimage={canvasBackground.desktop}
        backgroundcolor={canvasBackground.color}
      >

        {/* ############## ELEMENTS ############## */}

        <Center>

          {canvasElements?.filter((element) => element.divice === "desktop").map((element, index) => {

            return (
                  
              element.type === "text"?
                
                <ElementContainer 
                  key={index}
                  style={{
                    width: `${element?.textBoxSize?.width}px`,
                    height: `${element?.textBoxSize?.height}px`,
                    left: `${element?.textPosition?.x}px`,
                    top: `${element?.textPosition?.y}px`,
                    zIndex: element?.textZIndex,
                    borderRadius: element?.borderRadius
                  }}
                >
                  <Text 
                    props={{
                      color: element?.textColor,
                      size: element?.textSize,
                      backgroundcolor: AdjustOpacity(element?.textBackgroundColor, element?.textBGOpacity),
                      align: element?.textAlign,
                      borderRadius: element?.borderRadius,
                      border: element?.border? `${element?.borderSize}px solid ${element?.borderColor} ` : "none",
                      bold: element?.bold ? "bold" : "normal",
                      italic: element?.italic ? "italic" : "normal",
                      underline: element?.underline ? "underline" : "none",
                    }}
                  >{element?.text}
                  </Text>

                </ElementContainer>
        
                :

                <ElementContainer
                  key={index}
                  style={{
                    width: `${element?.textBoxSize?.width}px`,
                    height: `${element?.textBoxSize?.height}px`,
                    left: `${element?.textPosition?.x}px`,
                    top: `${element?.textPosition?.y}px`,
                    zIndex: element?.textZIndex,
                  }}
                >

                  <Sticker
                    src={element?.imageURL}
                    props={{
                      color: element?.textColor,
                      size: element?.textSize,
                      backgroundcolor: element?.textBackgroundColor !== "transparent" && AdjustOpacity(element?.textBackgroundColor, element?.textBGOpacity),
                      align: element?.textAlign,
                      borderRadius: element?.borderRadius,
                      border: element?.border? `${element?.borderSize}px solid ${element?.borderColor} ` : "none",
                      shadow: element?.shadow + ` ${AdjustOpacity(element?.shadowColor, element?.shadowOpacity)}`, //KEEP THE SPACE BEFORE AdjustOpacity
                    }}
                  />

                </ElementContainer>

            )

          })}

        </Center>

      </BackgroundContainer>

    </MainContainer>

  )

}

//STYLES

import styled from "styled-components"

const MainContainer = styled.div`
`
const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${props => props.backgroundcolor};
  background-image: url(${props => props.backgroundimage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
const ElementContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: ${props => props.width}px;
  max-height: ${props => props.height}px;
`
const Text = styled.div`
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
  overflow: hidden;
  padding: 10px 15px;
`
const Sticker = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${props => props.props.backgroundcolor};
  border: ${props => props.props.border};
  border-radius: ${props => props.props.borderRadius}px;
  filter: drop-shadow(${props => props.props.shadow});
`
const Center = styled.div`
  width: 1280px;
  height: 800px;
  transform: translate(0%, 10%);
`