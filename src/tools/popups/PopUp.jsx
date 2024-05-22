
//REDUX
import { useDispatch, useSelector } from "react-redux"

import { setShowPopUp, }from "../../redux/settingsRedux.js"


export default function PopUp({
  onSendData,
  icon,
  popUpTitle,
  popUpMessage,
  buttonType,
  buttonTextTrue,
  buttonTextFalse,
  linkOne,
  linkTwo,
  buttonTextLinkOne,
  buttonTextLinkTwo
}) {

  //REDUX
  const dispatch = useDispatch()

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)
  
  //////// <><><><><> //////// <><><><><> //////// <><><><><> //////// <><><><><> ////////

    
  return (
        
    <PopUpMainContainer>

      <PopUpContainer backgroundcolor={theme?.bgColor0}>

        {/* <<<<<<<<<<<<< TITLE >>>>>>>>>>>>> */}

        <PopUpMessageContainer>

          <Mini_Flex>

            {popUpTitle !== "" &&

              <PopUpTitle textcolor={theme?.textColor}>{popUpTitle}</PopUpTitle> 

            }

            {/* <<<<<<<<<<<<< EMOTICONS >>>>>>>>>>>>> */}

            {icon !== "" &&

              <>       

                {icon === "heart" &&
                  <Icon>
                    <Icon_FaHeart/>
                  </Icon>
                }

                {icon === "success" &&
                  <Icon>
                    <svg className="animated-check" viewBox="0 0 24 24">
                      <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> 
                    </svg>
                  </Icon>
                }

                {icon === "error" &&
                  <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="red">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </Icon>
                }

                {icon === "warning" &&
                  <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF9E00">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>              
                  </Icon>
                }

              </>

            }

          </Mini_Flex>

          {popUpMessage !=="" &&

            <PopUpMessage
              textcolor={theme?.textColor}
            >{popUpMessage}</PopUpMessage>

          } 

        </PopUpMessageContainer>

        {/* <<<<<<<<<<<<< BUTTONS >>>>>>>>>>>>> */}

        <ButtonContainer>

          {buttonType === "single" &&
          
            <Buttons 
              onClick={()=>{

                dispatch(setShowPopUp(""))
                onSendData && onSendData("")
                
              }}   

              //STYLE PROPS
              className={"Admin_Panel_Button"}
            >Ok</Buttons>

          }

          {buttonType === "double" &&

            <>

              {buttonTextTrue !== "" &&

                <Buttons 
                  onClick={()=>{

                    dispatch(setShowPopUp(""))
                    onSendData && onSendData(true)

                  }} 
                  
                  //STYLE PROPS
                  className={"Admin_Panel_Button"}
                >{buttonTextTrue}</Buttons>
                
              }

              {buttonTextFalse !== "" &&

                <Buttons 
                  onClick={()=>{

                    dispatch(setShowPopUp(""))
                    onSendData && onSendData(false)

                  }}       

                  //STYLE PROPS
                  className={"Admin_Panel_Button"}
                >{buttonTextFalse}</Buttons>

              }

            </>
          
          }

          {buttonType === "link" &&

            <>

              {/* //////// <><><><><> //////// <><><><><> LINK ONE <><><><><> //////// <><><><><> //////// */}

              {linkOne !== "" &&

                <ButtonLink 
                  to={linkOne}
                  onClick={()=>{

                    dispatch(setShowPopUp(""))    

                    onSendData && onSendData("")

                  }}       

                  //STYLE PROPS
                  className={"Admin_Panel_Button"}
                >{buttonTextLinkOne}</ButtonLink>

              }
              {linkOne === "" && buttonTextLinkOne !== "" &&

                <Buttons 
                  onClick={()=>{

                    dispatch(setShowPopUp(""))

                    onSendData && onSendData("")

                  }}       

                  //STYLE PROPS
                  className={"Admin_Panel_Button"}
                >{buttonTextLinkOne}</Buttons>

              }

              {/* //////// <><><><><> //////// <><><><><> LINK TWO <><><><><> //////// <><><><><> //////// */}


              {linkTwo !== "" &&

                <ButtonLink 
                  to={linkTwo}
                  onClick={()=>{

                    dispatch(setShowPopUp(""))

                    onSendData && onSendData("")

                  }}       

                  //STYLE PROPS
                  className={"Admin_Panel_Button"}
                >{buttonTextLinkTwo}</ButtonLink>

              }

              {linkTwo === "" && buttonTextLinkTwo !== "" &&

                <Buttons 
                  onClick={()=>{

                    dispatch(setShowPopUp(""))

                    onSendData && onSendData("")

                  }}       

                  //STYLE PROPS
                  className={"Admin_Panel_Button"}
                >{buttonTextLinkTwo}</Buttons>

              }

            </>

          }

        </ButtonContainer>

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

import {
  ButtonTemplate,
  Button_LinkTemplate
} from "../../styleComponents/ThemeStylesButtons.jsx"

//ICONS
import { FaHeart } from "react-icons/fa"

const Icon_FaHeart = styled(FaHeart)`
  color: #9936A8;

  animation-name: parpadeo;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;

  @-moz-keyframes parpadeo{  
    0% { opacity: 1.0; }
    50% { opacity: 0.0; }
    100% { opacity: 1.0; }
  }

  @-webkit-keyframes parpadeo {  
    0% { opacity: 1.0; }
    50% { opacity: 0.0; }
    100% { opacity: 1.0; }
  }

  @keyframes parpadeo {  
    0% { opacity: 1.0; }
    50% { opacity: 0.0; }
    100% { opacity: 1.0; }
  }
`
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  font-size: 22px;
  width: 26px;
  height: 26px;
`
const PopUpMainContainer = styled(PopUpWindowTemplate)`
  padding-top: 10%;
  z-index: 9;
`
const PopUpContainer = styled(PopUpTemplate)`
`
const PopUpMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`
const Mini_Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`
const PopUpTitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.textcolor};
`
const PopUpMessage = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  line-height: 1.4;
  color: ${props => props.textcolor};
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`
const Buttons = styled(ButtonTemplate)`
  min-width: 100px;
`
const ButtonLink = styled(Button_LinkTemplate)`
`