import { useState } from "react"

//COMPONENTS
// import PopUp from "../popups/PopUp.jsx"
// import GetErrorMessages from "../tools/GetErrorMessages.jsx"


//REDUX
import { 
  // useDispatch, 
  useSelector 
} from "react-redux"

// import {
//   setShowPopUp,
// } from "../../redux/settingsRedux.js"


export default function ImageSearchBar(value) {

  // //REDUX
  // const dispatch = useDispatch()

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  // //REDUX USER-TOKEN
  // const accessToken = useSelector(state => state.user.accessToken)
  
  //STYLES
  const theme = useSelector(state => state.style.theme)

  //STATES
  const[images, setImages] = useState([])

  // const[message, setMessage]= useState("")
  // const[messageTwo, setMessageTwo]= useState("")
  // const[icon, setIcon] = useState("")


  //////// <><><><><> //////// <><><><><> //////// <><><><><> //////// <><><><><> ////////

    
  function GetImageList(image){ 

    if(image.length > 0){

      //   fetch(backendURL+"/settings/getSearchImages", {
      //     method:"PUT",
      //     headers: {
      //       "content-type": "application/json; charset=UTF-8",
      //       "authorization": "bearer " + accessToken
      //     },
      //     body: JSON.stringify({
      //       image:image,
      //       numberOfImages:8
      //     })
      //   }).then(async (res)=> {

      //     if(!res.ok){
  
      //       const errorData = await res.json()
  
      //       if(errorData.authorized === false){
  
      //         throw new Error("Not authorized")
  
      //       }else {
  
      //         const { message, messageTwo } = GetErrorMessages(errorData, settings)
      //         setMessage(message)
      //         setMessageTwo(messageTwo)
      //         setIcon("error")
  
      //         throw new Error("Error")
  
      //       }
  
      //     }else {
          
      //       return res.json()
        
      //     }
      
      //   }).then(data => {
        
      //     setImages(data.searchImages)

      //   }).catch((error) => {

      //     if(error.message === "Not authorized"){
                      
      //       alert("Not authorized")
                      
      //     }else if(error.message === "Error"){
                      
      //       dispatch(setShowPopUp("ImageSearchingBar"))
                      
      //     }
              
      //   })

    }else{
      
      setImages([])

    }

  }

  //////// <><><><><> //////// <><><><><> //////// <><><><><> //////// <><><><><> ////////
    
  return (

    <>

      {/* {settings.showPopUp === "ImageSearchingBar" &&

        <PopUp props={{
          source:"ImageSearchingBar",
          icon:icon,
          message:message,
          messageTwo:messageTwo,
          buttonType:"single",
          buttonTextTrue:"",
          buttonTextFalse:"",
          linkOne:"",
          linkTwo:"",
          buttonTextLinkOne:"",
          buttonTextLinkTwo:""
        }} />

      } */}

      <Max_Length>

        <InputImage 
          type="text" 
          id={value?.props?.id}
          value={value?.props?.imageLink}
          onChange={(event)=>{

            GetImageList(event.target.value)
            value?.onSendData && value?.onSendData(event.target.value)
            
          }}
          placeholder={
            settings?.language === "es"? "Buscar una imagen..."
              : settings?.language === "en"? "Find an image..."
                : settings?.language === "kr" && "이미지를 찾아보세요..."
          }

          //PROPS STYLES
          border={theme?.border}
          textcolor={theme?.textColor}
          backgroundcolor={value?.props?.empty? theme?.inputEmptyColor : theme?.bgColor2}
          holdercolor={value?.props?.empty? theme?.placeholderLight : theme?.placeholderDark}
          borderBottomRightRadius={images.length > 0? "0px":"5px"}
          borderBottomLeftRadius={images.length > 0? "0px":"5px"}
        />

        <ImageList 
          border={theme?.border}
          imageList={images}
        >

          {images?.map((item, index) =>
            <ImageListItem
              key={index}
              onClick={()=>{     
                setImages([])
                value?.onSendData && value?.onSendData(item?.image)
              }}

              //PROPS STYLES
              style={{
                borderBottomRightRadius: images?.length -1 === index? "5px": "0px",
                borderBottomLeftRadius: images?.length -1 === index? "5px": "0px",
              }} 
              backgroundcolor={index % 2 === 0? `${theme?.bgColor2}` : `${theme?.bgColor3}`}
              textcolor={theme?.textColor}
            >
              <Hover>
                <ImgName>{item?.imageName?.length > 20? item?.imageName.slice(0,20).trim()+"..." : item?.imageName}</ImgName>
                <Img props={item?.image}/>
              </Hover>

            </ImageListItem>
          )}

        </ImageList>

      </Max_Length>

    </>

  )

}


//STYLES

import styled from "styled-components"

import {
  InputTemplate
} from "../../styles/Theme_Styles_Input"

const Max_Length = styled.div`  
  position: relative;
  width: 100%;
`
const InputImage = styled(InputTemplate)`
  border-bottom-right-radius: ${({borderBottomRightRadius}) => borderBottomRightRadius};
  border-bottom-left-radius: ${({borderBottomLeftRadius}) => borderBottomLeftRadius};
`
const ImageList = styled.div`
  position: absolute;
  z-index: 100;
  top: 45px;
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  border-bottom: ${props => props.imageList.length > 0? `${props?.border}` : ""};

  border-left: ${props => props?.border};
  border-right: ${props => props?.border};;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

//IMAGES

const ImageListItem = styled.div`
  background-color: ${props => props?.backgroundcolor};
`
const Hover = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;

  &:hover{
    transform: scale(1.03);
  }
`
const ImgName = styled.p`
  display: flex;
  justify-content: flex-start;
  width: fit-content;
`
const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 180px;
  background-image: ${props => props?.props !== ""? `url(${props?.props})` : "none"};
  object-fit: contain;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
