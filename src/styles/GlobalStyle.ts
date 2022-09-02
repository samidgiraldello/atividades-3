import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
`
export const colors = {
  primary: "#085073",
  secondary: "#0C6E9C",
  third: "#ffb74d",
  thirdLight: "#ffe9ca",
  white: "#ffffff",
  black: "#000000",
}
