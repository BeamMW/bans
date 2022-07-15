import { css } from '@linaria/core';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :root {
  --color-purple: #da68f5;
  --color-red: #f25f5b;
  --color-red-expiring: #ff436a;
  --color-yellow: #f4ce4a;
  --color-green: #00f6d2;
  --color-blue: #0bccf7;
  --color-dark-blue: #042548;
  --color-darkest-blue: #032e49;
  --color-white: #ffffff;
  --color-gray: #8196a4;
  --color-white: white;
  --color-ghost: #ffffff19;
  --color-disconnect: #ff746b;
  --color-vote-red: #de3155;
  --color-dark-gray: rgba(50, 50, 50);
  --color-opacity: rgba(255,255,255,0.1);
  --color-popup: rgba(13, 77, 118);
  --color-select: #184469;
  --color-dark-transparent: rgba(26, 22, 22, 0.27);
  --color-half-opacity: rgba(255,255,255,0.05); 
  --color-disabled: #8da1ad;
  --color-transparent: transparent;
}

@font-face {
  font-family: 'SFProDisplay';
  src: url('./assets/fonts/SF-Pro-Display-Regular.otf');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'SFProDisplay';
  src: url('./assets/fonts/SF-Pro-Display-RegularItalic.otf');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'SFProDisplay';
  src: url('./assets/fonts/SF-Pro-Display-Bold.otf');
  font-weight: 700;
  font-style: normal;
}

/* 
@font-face {
  font-family: 'SFProDisplay';
  src: url('./assets/fonts/SF-Pro-Display-Black.otf');
  font-weight: 400;
  font-style: normal;
}


@font-face {
  font-family: 'SFProDisplay';
  src: url('./assets/fonts/SF-Pro-Display-BlackItalic.otf');
  font-weight: 400;
  font-style: italic;
}


@font-face {
  font-family: 'SFProDisplay';
  src: url('./assets/fonts/SF-Pro-Display-BoldItalic.otf');
  font-weight: 700;
  font-style: italic;
}
*/

    * {
      box-sizing: border-box;
      outline: none;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      min-width: 860px;
      font-family: 'SFProDisplay', sans-serif !important;
      font-weight: normal;
      height: 100vh;
    }

    #root {
      display: inline;
    }

    html * {
      font-family: 'SFProDisplay', sans-serif;
    }

    body {
      font-size: 14px;
      color: white;
    }    

    p {
      margin: 0;
    }

    h1,h2 {
      margin: 0;
    }

    ul,
    ol {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    tr, th, table {
      border: none;
      border-spacing: 0;
      padding: 0;
      margin: 0;
      border-collapse: inherit;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
}
`;





