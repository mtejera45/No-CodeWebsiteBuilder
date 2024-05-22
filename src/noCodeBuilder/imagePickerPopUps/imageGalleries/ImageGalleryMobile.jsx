import { useState, memo } from "react"

//COMPONENTS
import RingFetching from "../../../tools/layoutElements/RingFetching"

//REDUX
import { useSelector } from "react-redux"


function ImageGallery_Mobile({ onSendData }) {

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //STATES
  const[loaded, setLoaded] = useState(new Array(30).fill(false))

  //HANDLE IMAGE LOAD
  const handleImageLoad = (index) => {
  
    setLoaded(currentLoaded => currentLoaded.map((item, idx) => idx === index ? true : item))
  
  }


  return (

    <MainContainer>

      <Title>
        {settings?.language === "es" && "Imagen de fondo para móviles"}
        {settings?.language === "en" && "Mobile Background Image"}
        {settings?.language === "kr" && "모바일 배경 이미지"}
      </Title>

      <MobileGallery>

        {Array.from({ length: 30 }).map((_, index) => (

          <div key={index} onClick={() => onSendData(`./images/mobile/${index + 1}.webp`)}>

            {!loaded[index] ? (
              
              <ImageWrapper>
                <RingFetching/>
              </ImageWrapper>

            ) : (

              <Mobile_Image src={`./images/mobile/${index + 1}.webp`} alt={index + 1} />

            )}

            <img
              src={`./images/mobile/${index + 1}.webp`}
              style={{ display: "none" }}
              onLoad={() => handleImageLoad(index)}
            />

          </div>

        ))}

      </MobileGallery>

    </MainContainer>

  )

}

const ImageGalleryMemo = memo(ImageGallery_Mobile)

export default ImageGalleryMemo

//STYLES

import styled from "styled-components"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 50vh;

  scroll-behavior: smooth;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
const MobileGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
`
const Mobile_Image = styled.img`
  width: 105px;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;

  &:hover {
    border: 3px solid white;
  }
`
const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: white;
`
const ImageWrapper = styled.div`
  width: 105px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #cccccc16;
`
