import { createGlobalStyle } from 'styled-components';
import { colors, borders } from '@/shared/styles/tokens';
import nokiaFontUrl from '@/app/styles/nokiafc22.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Nokia;
    src: url(${nokiaFontUrl});
  }

  * {
    font-family: Nokia;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    color: ${colors.textPrimary};
  }

  *:focus {
    outline: none;
  }

  input[type='text'] {
    background: inherit;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom-color: ${colors.textPrimary};
    border-bottom-style: ${borders.dashed};
  }

  button {
    background-color: inherit;
    border-color: ${colors.textPrimary};
    border-bottom-style: ${borders.dotted};
    border-left-style: ${borders.dotted};
    border-top-style: none;
    border-right-style: none;
  }

  textarea {
    width: 100%;
    height: 80%;
    resize: none;
    background-color: inherit;
    border-bottom-style: ${borders.dotted};
    border-left-style: ${borders.dotted};
    border-top-style: none;
    border-right-style: none;
    border-color: ${colors.textPrimary};
  }
`;

export default GlobalStyle;
