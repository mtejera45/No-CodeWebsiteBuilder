//REDUX
import { useSelector } from "react-redux"

export default function WaitingPopUp(value) {

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)


  return (

    <PopUpMainContainer>

      <PopUpContainer backgroundcolor={theme?.bgColor0}>

        <MiniFlex>

          <WaitMiniContainer>
            <Text backgroundcolor={theme?.textColor}>{value?.props?.message}</Text>
          </WaitMiniContainer>

          <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
            
        </MiniFlex>

      </PopUpContainer>
      
    </PopUpMainContainer>    
      
  )

}

//STYLES

import styled from "styled-components"

import {
  PopUpTemplate,
  PopUpWindowTemplate
} from "../../styleComponents/ThemeStylesPopUp.jsx"

const PopUpMainContainer = styled(PopUpWindowTemplate)`
  padding-top: 10%;
  z-index: 999;
`
const PopUpContainer = styled(PopUpTemplate)`
  width: 650px;
  min-width: 650px;
`
const MiniFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  margin-bottom: 0px;
  gap: 40px;
`
const Text = styled.div`
  color: ${props => props.backgroundcolor};
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`
const WaitMiniContainer = styled.div`
  display: flex;
  justify-content: center;
`