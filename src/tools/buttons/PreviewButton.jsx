//ROUTER
import { useNavigate } from "react-router-dom"

//REDUX
import { useSelector } from "react-redux"


export default function Preview_Button({ divice }) {

  //NAVIGATE
  const navigate = useNavigate()

  //REDUX
  const settings = useSelector(state => state.settings)

  return (

    <Button 
      onClick={()=>{ navigate(divice === "desktop"? "/desktopPreview" : "/mobilePreview") }}
      title={
        settings.language === "es"? "Vista previa"
          : settings.language === "en"? "Preview"
            : settings.language === "kr"? "미리보기"
              : "Clean canvas"
      }
    >
      <Icon_SearchOutlinedIcon/>
    </Button>

  )

}

//STYLES

import styled from "styled-components"

import { PiMagnifyingGlassBold } from "react-icons/pi"

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
    background-color: #0e714d;
    color: white;
    scale: 1.2;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`
const Icon_SearchOutlinedIcon = styled(PiMagnifyingGlassBold)`
  font-size: 20px;
`
