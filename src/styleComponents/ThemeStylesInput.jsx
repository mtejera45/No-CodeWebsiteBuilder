//ROUTER
import styled from "styled-components"


export const InputTemplate = styled.input`
  // ##### THEME STYLES #####
  background-color: ${props => props?.backgroundcolor};
  border: ${props => props?.border};
  color: ${props => props?.textcolor};
  // ##### THEME STYLES #####

  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  height: 45px;
  padding-right: 30px;
  
  //PLACEHOLDER
  ::-webkit-input-placeholder {
    color: ${props => props?.holdercolor};
  }
  :focus{
    outline: none;
  }
  :focus::placeholder { 
    color:transparent 
  }
  ::placeholder{
    padding-left: 5px;
  }
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }  

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px ${props => props?.backgroundcolor} inset !important;
    -webkit-text-fill-color: ${(props) => props?.textcolor} !important;
  }

  :focus{
    outline: none;
  }
`
export const SelectTemplate = styled.select`
  // ##### THEME STYLES #####
  background-color: ${props => props?.backgroundcolor};
  border: ${props => props?.border};
  color: ${props => props?.textcolor};
  // ##### THEME STYLES #####

  appearance: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  padding: 12px 16px;
  cursor: pointer;
  height: 45px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 140, 186, 0.2);
    border-color: #008CBA;
  }
`