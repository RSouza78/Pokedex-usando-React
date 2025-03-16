import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .light-mode {
    background-color: #ffffff;
    color: #000000;
  }

  .dark-mode {
    background-color: #121212;
    color: #000000;
  }
`;

export default GlobalStyle;
