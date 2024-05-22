//ROUTER
import styled from "styled-components"
import { Link } from "react-router-dom"

export const ButtonTemplate = styled.button`
  height: 40px;
  min-width: 100px;
  width: fit-content;
  font-size: 14px;
  list-style: none;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  cursor: pointer;
`

export const Button_LinkTemplate = styled(Link)`
  height: 40px;
  min-width: 100px;
  width: fit-content;
  font-size: 14px;
  list-style: none;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  cursor: pointer;
`