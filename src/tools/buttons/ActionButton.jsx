//ROUTER
import { useNavigate } from "react-router-dom"


export default function Action_Button({
  theme,
  absolute,
  margin,
  action,
  setShowPopUp,
  link
}) {

  //NAVIGATE
  const navigate = useNavigate()

  return (

    <Button 
      theme={theme} 
      absolute={absolute} 
      margin={margin}
      onClick={()=>{ 
        if(action === "close" && setShowPopUp) { setShowPopUp("") }
        if(action === "navigate" && link !== "") { navigate(link) }
        if(action === "back") { navigate(-1) }
      }}
    >
      <Icon_CloseOutlined size={"14px"}/>
    </Button>

  )

}

import styled, { keyframes } from "styled-components"

const spinAnimationOne = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(90deg); }
`
const spinAnimationTwo = keyframes`
  0% { transform: rotate(90deg); }
  100% { transform: rotate(0deg); }
`

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

const Button = styled.div`
  z-index: 999;
  top: 0px;
  right: 0px;
  width: 22px;
  height: 22px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;

  background-color: ${props => props.theme === "white" ? "white" : "#CCCCCC"};
  position: ${props => props.absolute === "true"? "absolute" : "relative"};
  margin: ${props => props.margin};

  &:hover {
    background-color: ${props => props.theme === "dark" ? "#D93D59" : "#EC7063"};
    color: #641E16;
    animation: ${props => props.props === "true"? spinAnimationOne : spinAnimationTwo} 0.7s linear forwards;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`
const Icon_CloseOutlined = styled(CloseOutlinedIcon)`
  font-size: ${props => props.size};
`
