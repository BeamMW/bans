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
      --color-disabled: #8da1ad;
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

    * {
      box-sizing: border-box;
      outline: none;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      min-width: 375px;
    }

    #root {
      display: inline;
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
    ol :not(.description) {
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
  }
`;
