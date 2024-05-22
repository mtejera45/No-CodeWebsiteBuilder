export default function RingFetching() {

  return (
    
    <Spinner/>

  )

}

//STYLES

import styled, { keyframes } from "styled-components"

const spin = keyframes`
  100% {
    transform: rotate(1turn);
  }
`
const Spinner = styled.div`
  width: 32px;
  height: 32px;
  display: grid;
  animation: ${spin} 3s infinite;

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    border: 3px solid;
    border-radius: 50%;
    border-color: #F2F4F4 #B2BABB #616A6B transparent;
    mix-blend-mode: darken;
    animation: ${spin} 1s infinite linear;
  }
  
  &::after {
    border-color: transparent #616A6B #B2BABB #F2F4F4;
    animation-direction: reverse;
  }
`

