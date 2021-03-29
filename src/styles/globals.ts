import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
}

html {
  font-size: 62.5%;
}

html, body, #__next {
  height: 100%;
}

a {
  text-decoration: none;
  display: block;
}

:root{
  --hightlight: #FF57B2;
  --heading: #F8F8F8;
  --bg: #1A1D23;
  --info: #BBBBBB;
  --body: #D7D7D7;
}

`;
