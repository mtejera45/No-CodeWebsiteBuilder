import { useCallback } from "react"

//COMPONENTS
import ActionButton from "../../tools/buttons/ActionButton.jsx"
import ImageGalleryDesktop from "./imageGalleries/ImageGalleryDesktop.jsx"
import ImageGalleryMobile from "./imageGalleries/ImageGalleryMobile.jsx"
// import ImageSearchBar from "../../tools/imageSearchBar/ImageSearchBar.jsx"

//REDUX
import { useSelector } from "react-redux"

export default function Add_Image({
  canvasBackground,
  setCanvasBackground,
  divice,
  setShowPopUp
}) {

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //REDUX STYLE
  const theme = useSelector(state => state.style.theme)


  const handle_Background = useCallback((data) => {

    if(divice === "desktop") {

      setCanvasBackground((prevState) => ({
        ...prevState,
        desktop: data,
      }))
      
    }else if(divice === "mobile") {

      setCanvasBackground((prevState) => ({
        ...prevState,
        mobile: data,
      }))
      
    }

    setShowPopUp("")

  },[divice, setCanvasBackground])


  return (

    <PopUpMainContainer>

      <PopUpContainer backgroundcolor={theme?.bgColor0}>

        <ActionButton 
          theme={"white"} 
          absolute={"true"} 
          margin={"20px"} 
          action={"close"}
          setShowPopUp={setShowPopUp}
          link={""}
        />

        <MiniColumnFlex>

          <Flex>

            {/* UNCOMMENT ***ImageSearchBar*** TO BE ABLE TO FETCH AND SEARCH FOR IMAGES FROM YOUR API */}
            {/* FIND THE ImageSearchBar COMPONENT IN THE FOLLOWIN DIRECTORY src/tools/image_Search_Bar/ImageSearchBar.jsx */}
            {/* IT IS POSSIBLE THAT YOU NEED TO MAKE SOME CHANGES TO THE COMPONENT TO MAKE IT WORK WITH YOUR API */}

            {/* <ImageSearchBar 
              onSendData={handle_Background}
              props={{
                id:"image",
                empty:false,
                imageLink: divice === "desktop"? canvasBackground?.desktop : canvasBackground?.mobile
              }}
            /> */}

            {divice === "desktop" &&

              <ImageGalleryDesktop
                onSendData={handle_Background}
                props={{
                  id:"image",
                  empty:false,
                  imageLink: divice === "desktop"? canvasBackground?.desktop : canvasBackground?.mobile
                }}
              />

            }

            {divice === "mobile" &&

              <ImageGalleryMobile
                onSendData={handle_Background}
                props={{
                  id:"image",
                  empty:false,
                  imageLink: divice === "desktop"? canvasBackground?.desktop : canvasBackground?.mobile
                }}
              />

            }

          </Flex>

          <ButtonContainer>

            <Button 
              onClick={()=> {

                setShowPopUp("")
                
                divice === "desktop"?
                  setCanvasBackground(prevState => ({
                    ...prevState,
                    desktop:""
                  }))
                  :
                  setCanvasBackground(prevState => ({
                    ...prevState,
                    mobile:""
                  }))

              }}            
            >

              <DeleteBackground>
                {settings?.language === "es" && "Eliminar Imagen de Fondo"}
                {settings?.language === "en" && "Delete Background Image"}
                {settings?.language === "kr" && "배경 이미지 삭제"}
              </DeleteBackground>

              <Icon_ImageNotSupportedOutlinedIcon/>

            </Button>

          </ButtonContainer>

        </MiniColumnFlex>

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

//ICONS
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined"

const Icon_ImageNotSupportedOutlinedIcon = styled(ImageNotSupportedOutlinedIcon)`
  font-size: 26px;
`
const Flex = styled.div`  
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PopUpMainContainer = styled(PopUpWindowTemplate)`
  padding-top: 3%;
  z-index: 999;
`
const PopUpContainer = styled(PopUpTemplate)`
  padding-top: 50px;
`
const MiniColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const Button = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;

  &:hover {
    cursor: pointer;
    color: #D93D59;
  }
`
const DeleteBackground = styled.p`
  font-size: 14px;
  font-weight: 400;
`