import { useEffect, useState } from "react"

//ROUTER
import { Route, Routes } from "react-router-dom"

//COMPONENTS
import Canvas from "./noCodeBuilder/Canvas.jsx"
import DesktopPreview from "./preview/DesktopPreview.jsx"
import MobilePreview from "./preview/MobilePreview.jsx"

//TOOLS
import PopUp from "./tools/popups/PopUp.jsx"
import WaitingPopUp from "./tools/popups/WaitingPopUp.jsx"
import GetContrastingColor from "./tools/functions/GetContrastingColor.jsx"
// import GetErrorMessages from "./tools/functions/GetErrorMessages.jsx"

//REDUX
import { 
  useDispatch, 
  useSelector 
} from "react-redux"

import { 
  setShowPopUp, 
  setCanvasBackgroundRedux,
  setCanvasElementsRedux
} from "./redux/settingsRedux.js"


export default function App() {

  //REDUX
  const dispatch = useDispatch()

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //STATES
  const[fetching, setFetching] = useState(false)
  const[uiElementColor, setUIElementColor] = useState("")
  const[canvasElements, setCanvasElements] = useState(settings?.canvasElementsRedux)
  const[canvasBackground, setCanvasBackground] = useState({
    desktop: settings?.canvasBackgroundRedux?.desktop,
    mobile: settings?.canvasBackgroundRedux?.mobile,
    color: settings?.canvasBackgroundRedux?.color
  })

  //POPUP
  const[icon, setIcon] = useState("")
  const[popUpTitle, setPopUpTitle] = useState("")
  const[popUpMessage, setPopUpMessage] = useState("")
  
  
  //SET POPUP TO DEFAULT
  useEffect(() => {

    dispatch(setShowPopUp(""))

  }, [])


  //GET UI ELEMENT COLOR BASED ON THE BACKGROUND COLOR
  useEffect(() => {

    if(canvasBackground.desktop === "" | canvasBackground.mobile === ""){

      setUIElementColor(GetContrastingColor(canvasBackground.color))

    }else {
        
      setUIElementColor("white")

    }

  },[canvasBackground])


  //SAVE CANVAS CONTENT
  const saveCanvas = () => {

    dispatch(setShowPopUp("simulateSaving"))
    setFetching(true)

    setTimeout(() => { setFetching(false) }, 2000)

    setPopUpTitle(
      settings?.language === "es"? "Cambios guardados con éxito"
        : settings?.language === "en"? "Changes saved successfully"
          : settings?.language === "kr" && "변경 사항이 성공적으로 저장되었습니다"
    )
    setPopUpMessage("")
    setIcon("success")

    dispatch(setCanvasBackgroundRedux(canvasBackground))
    dispatch(setCanvasElementsRedux(canvasElements))

    // DELETE THE CODE ABOVE AND REPLACE IT WITH THE CODE BELOW TO FECTH THE DATA AND SAVE IT TO THE DATABASE

    // dispatch(setShowPopUp("simulateSaving"))
    // setFetching(true)
  
    // fetch("API_URL", {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json; charset=UTF-8",
    //     // "authorization": "bearer " + accessToken
    //   },
    //   body: JSON.stringify({ canvasElements: canvasElements })
    // }).then(async (res)=> {
  
    //   if(!res.ok){

    //     setFetching(false)
      
    //     const errorData = await res.json()
      
    //     if(errorData.authorized === false){
  
    //       dispatch(setShowPopUp(""))

    //       throw new Error("Not authorized")
      
    //     }else {
      
    /* ***GetErrorMessages*** is a function that returns the error messages in the correct language or a default message if the data base does not return an error message. Find this function in the following directory: src/tools/functions/GetErrorMessages.jsx */
  
    //       const { popUpTitle, popUpMessage } = GetErrorMessages(errorData, settings) 

    //       setPopUpTitle(popUpTitle)
    //       setPopUpMessage(popUpMessage)
    //       setIcon("error")
      
    //       throw new Error("Error")
      
    //     }
      
    //   }else {
              
    //     return res.json()
            
    //   }
          
    // }).then(data => {
      
    //   setPopUpTitle(data.popUpTitle)
    //   setPopUpMessage(data.popUpMessage)
    //   setIcon("success")
  
    // }).catch((error) => {
  
    //   if(error.message === "Not authorized"){
                  
    //     alert("Not authorized")
                  
    //   }else if(error.message === "Error"){
                  
    //     dispatch(setShowPopUp("serverError"))
                  
    //   }
          
    // }).finally(()=>{
  
    //   setTimeout(()=>{
  
    //     setFetching(false)
  
    //   },1000)
  
    // })

  }
    
  
  return (

    <>
          
      {settings.showPopUp === "simulateSaving" && 
  
      <>

        {fetching?

          <WaitingPopUp props={{message:
            settings?.language === "es"? "Guardando cambios, por favor espere..."
              : settings?.language === "en"? "Saving changes, please wait..."
                : settings?.language === "kr" && "변경 사항을 저장 중입니다. 잠시만 기다려주세요..."
          }}
          />

          :

          <PopUp
            source={"Builder"}
            icon={icon}
            popUpTitle={popUpTitle}
            popUpMessage={popUpMessage}
            buttonType={"single"}
            buttonTextTrue={""}
            buttonTextFalse={""}
            linkOne={""}
            linkTwo={""}
            buttonTextLinkOne={""}
            buttonTextLinkTwo={""}
          />         

        }

      </> 

      }


    
      <Routes>


        <Route path="/" element={      

          <Canvas 
            fetching={false}
            saveCanvas={saveCanvas}
            setCanvasBackground={setCanvasBackground}
            canvasBackground={canvasBackground}
            setCanvasElements={setCanvasElements}
            canvasElements={canvasElements}
            uiElementColor={uiElementColor}
          />
        
        }/>

        <Route path="/desktopPreview" element={

          <DesktopPreview 
            canvasElements={canvasElements}
            canvasBackground={canvasBackground}
          />

        }/>

        <Route path="/mobilePreview" element={
          
          <MobilePreview             
            canvasElements={canvasElements}
            canvasBackground={canvasBackground}
          />
          
        }/>

      </Routes>

    </>

  )

}


