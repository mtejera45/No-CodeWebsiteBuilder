//ROUTER
import styled from "styled-components"

export const PopUpTemplate = styled.div`
  background-color: ${props => props?.backgroundcolor};
  
  position: relative;
  width: 750px;
  min-width: 750px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px;
  border-radius: 5px;

`
export const PopUpWindowTemplate = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 5%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
`