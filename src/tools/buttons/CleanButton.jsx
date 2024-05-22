//REDUX
import { useSelector } from "react-redux"


export default function Preview_Button({canvasElements, setCanvasElements, divice }) {
  
  //REDUX
  const settings = useSelector(state => state.settings)

  //CLEAN CANVAS BY DIVICE
  const clean = () => {

    const cleanArray = canvasElements.filter(element => element.divice !== divice)

    setCanvasElements(cleanArray)

  }

  return (

    <Button onClick={()=> clean() }
      title={
        settings.language === "es"? "Limpiar lienzo"
          : settings.language === "en"? "Clean canvas"
            : settings.language === "kr"? "캔버스 청소"
              : "Clean canvas"
      }
    >
      <Icon_SearchOutlinedIcon/>
    </Button>

  )

}

//STYLES

import styled from "styled-components"

import { PiBroomBold } from "react-icons/pi"

const Button = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
  background-color: white;
  transition: 0.5s;

  &:hover {
    background-color: #D93D59;
    color: white;
    scale: 1.2;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`
const Icon_SearchOutlinedIcon = styled(PiBroomBold)`
  font-size: 20px;
`
