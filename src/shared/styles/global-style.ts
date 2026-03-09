import { createGlobalStyle } from 'styled-components';
import { colors } from '@/shared/styles/tokens';
import nokiaFontUrl from '@/shared/assets/fonts/nokiafc22.ttf';

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
`;

export default GlobalStyle;
