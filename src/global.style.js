import { createGlobalStyle } from "styled-components";

export const RootStyle = createGlobalStyle`
 #root {
    height: 100vh;
  }
  body {
    height: 100%;
    min-height: 100%;
    margin: 0;
    * {
      box-sizing: border-box;
    }
}

`;
