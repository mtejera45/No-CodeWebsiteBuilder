import { useState, memo } from "react"

//COMPONENTS
import RingFetching from "../../../tools/layoutElements/RingFetching"

//REDUX
import { useSelector } from "react-redux"


function ImageGallery_Desktop({ onSendData }) {

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
        {settings?.language === "es" && "Imagen de fondo para desktops"}
        {settings?.language === "en" && "Desktops Background Image"}
        {settings?.language === "kr" && "데스크탑 배경 이미지"}
      </Title>

      <DesktopGallery>

        {Array.from({ length: 30 }).map((_, index) => (

          <div key={index} onClick={() => onSendData(`./images/desktop/${index + 1}.webp`)}>

            {!loaded[index] ? (
              
              <ImageWrapper>
                <RingFetching/>
              </ImageWrapper>

            ) : (

              <Desktop_Image src={`./images/desktop/${index + 1}.webp`} alt={index + 1} />

            )}

            <img
              src={`./images/desktop/${index + 1}.webp`}
              style={{ display: "none" }}
              onLoad={() => handleImageLoad(index)}
            />

          </div>

        ))}

      </DesktopGallery>

    </MainContainer>

  )

}

const ImageGalleryMemo = memo(ImageGallery_Desktop)

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
const DesktopGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
`
const Desktop_Image = styled.img`
  width: 155px;
  height: 105px;
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
  width: 155px;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #cccccc16;
`
