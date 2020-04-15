import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  html {
      box-sizing: border-box;
}

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background: #595959;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
