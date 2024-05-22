import { useState, memo } from "react"

//COMPONENTS
import RingFetching from "../../../tools/layoutElements/RingFetching"

//REDUX
import { useSelector } from "react-redux"


function ImageGallery_Desktop({ 
  onSendData, 
  stickerURL 
}) {

  //REDUX SETTINGS
  const settings = useSelector(state => state.settings)

  //STATES
  const[loaded, setLoaded] = useState(new Array(42).fill(false))

  //HANDLE IMAGE LOAD
  const handleImageLoad = (index) => {

    setLoaded(currentLoaded => currentLoaded.map((item, idx) => idx === index ? true : item))

  }

  return (

    <MainContainer>

      <Title>
        {settings?.language === "es" && "Pegatinas"}
        {settings?.language === "en" && "Sticker Images"}
        {settings?.language === "kr" && "스티커"}
      </Title>

      <StickerGallery>

        {Array.from({ length: 42 }).map((_, index) => (

          <div key={index} onClick={() => onSendData(`./images/stickers/${index + 1}.svg`)}>

            {!loaded[index] ? (
              
              <ImageWrapper>
                <RingFetching/>
              </ImageWrapper>

            ) : (

              <Sticker_Images 
                src={`./images/stickers/${index + 1}.svg`} 
                alt={index + 1} 
                chosen={stickerURL === `./images/stickers/${index + 1}.svg` ? "true" : "false"}
              />
              
            )}

            <img
              src={`./images/stickers/${index + 1}.svg`}
              style={{ display: "none" }}
              onLoad={() => handleImageLoad(index)}
            />

          </div>

        ))}

      </StickerGallery>

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
const StickerGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
`
const Sticker_Images = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: ${props => props.chosen === "true" ? "3px solid white" : "none"};
  background-color: #333333;
  
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
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #cccccc16;
`
