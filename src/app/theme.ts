import { Theme, ThemeUIStyleObject } from "theme-ui";
import Utils from "./library/base/utils";

const baseColors = {
  blue: "#1542cd",
  purple: "#745ddf",
  cyan: "#2eb6ea",
  green: "#6DBBB9",
  yellow: "#fd9d28",
  red: "#b95151",
  lightRed: "#ff755f"
};

const colors = {
  primary: "transparent"/* baseColors.blue */,
  secondary: baseColors.purple,
  accent: baseColors.cyan,
  transactionBg: "#0d1537",
  success: baseColors.green,
  warning: baseColors.yellow,
  danger: baseColors.red,
  dangerHover: baseColors.lightRed,
  info: baseColors.blue,
  invalid: "#bb6e6e",

  text: "#ffffff66",
  background: "transparent",
  muted: "rgba(109, 187, 185, 0.3);"
};

const buttonBase: ThemeUIStyleObject = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  ":enabled": { cursor: "pointer" }
};

const button: ThemeUIStyleObject = {
  ...buttonBase,

  px: "32px",
  py: "12px",
  mt: "16px",

  color: "#333",
  //border: 1,
  borderRadius: "19px",

  fontWeight: "bold",

  ":disabled": {
    opacity: 0.5
  }
};

const buttonOutline = (color: string, hoverColor: string): ThemeUIStyleObject => ({
  color,
  borderColor: color,
  background: "none",

  ":enabled:hover": {
    color: "background",
    bg: hoverColor,
    borderColor: hoverColor
  }
});

const iconButton: ThemeUIStyleObject = {
  ...buttonBase,

  padding: 0,
  width: "40px",
  height: "40px",

  background: "none",

  ":disabled": {
    color: "text",
    opacity: 0.25
  }
};

const cardHeadingFontSize = 18.7167;

const cardGapX = [0, 3, 4];
const cardGapY = [3, 3, 4];

const card: ThemeUIStyleObject = {
  position: "relative",
  mt: cardGapY,
  border: 0,
  boxShadow: [1, null, 2],
  borderRadius: [10],
  overflow: "hidden",
};

const infoCard: ThemeUIStyleObject = {
  ...card,

  padding: 3,

  borderColor: "rgba(122,199,240,0.4)",
  background: "linear-gradient(200deg, #d4d9fc, #cae9f9)",

  h2: {
    mb: 2,
    fontSize: cardHeadingFontSize
  }
};

const formBase: ThemeUIStyleObject = {
  display: "block",
  width: "auto",
  flexShrink: 0,
  //padding: 2,
  fontSize: 3,
  color: '#333'
};

const formCell: ThemeUIStyleObject = {
  ...formBase,

  bg: "background",
  border: 1,
  borderColor: "muted",
  borderRadius: 0,
  boxShadow: [1, 2]
};

const overlay: ThemeUIStyleObject = {
  position: "absolute",

  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

const modalOverlay: ThemeUIStyleObject = {
  position: "fixed",

  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh"
};

const headerGradient: ThemeUIStyleObject = {
  background: `linear-gradient(90deg, ${colors.background}, ${colors.muted})`
};

const bgColor = Utils.getStyles().background_main;

const windowGradient: ThemeUIStyleObject = {
  //background: bgColor,
}

const transition = {
  transition: "opacity 5.5s",
}

const theme: Theme = {
  breakpoints: ["48em", "52em", "64em"],

  space: [0, 4, 8, 16, 20, 32, 64, 128, 256, 512],

  fonts: {
    heading: "inherit",
    monospace: "SFProDisplay, sans-serif"
  },

  fontSizes: [12, 14, 16, 20, 24, 32, 36, 48, 64, 96],

  fontWeights: {
    body: 400,
    heading: 600,

    light: 200,
    medium: 500,
    bold: 600
  },

  lineHeights: {
    body: 1.5,
    heading: 1.25
  },

  colors,

  borders: [0, "1px solid", "2px solid"],

  shadows: ["0", "0px 4px 8px rgba(41, 49, 71, 0.1)", "0px 8px 16px rgba(41, 49, 71, 0.1)"],

  text: {
    heading: {
      bg: "transparent",
      fontFamily: 'SFProDisplay'
    },

    address: {
      fontFamily: "SFProDisplay",
      fontSize: 1,
    },

    systemStats: {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "24px",
    },
    block: {
      variant: 'paragraph',
      my: 2,
      textAlign: 'justify',
      textAlignLast: 'start',
      textJustify: 'auto',
      fontFamily: 'SFProDisplay'
    },
    header: {
      textAlign: 'center',
      fontFamily: 'SFProDisplay',
      fontSize: 14,
      fontWeight: 700,
      mb: 4,
      mt: '60px',
      letterSpacing: '3.11111px',
      textTransform: 'uppercase',
    },
    panelHeader: {
      fontFamily: 'SFProDisplay',
      color: ' #8DA1AD',
      alignSelf: 'center',
      flex: 2,
    },
    subHeader: {
      color: '#8DA1AD',
      display: 'block'
    },
    subText: {
      fontFamily: 'SFProDisplay',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
    },

    text: {
      fontFamily: 'SFProDisplay',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '17px',
      color: 'rgba(255, 255, 255)',
      display: 'block',
    },

    link: {
      fontFamily: 'SFProDisplay',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '19px',
      color: '#00F6D2',
    }

  },

  buttons: {
    primary: {
      ...button,

      bg: "primary",
      background: "#6DBBB9",
      color: "#0E2126",
    },

    outline: {
      ...button,
      ...buttonOutline("primary", "secondary")
    },

    cancel: {
      ...button,
      bg: "#5e5c5c",
      color: "#fff",
      opacity: 0.8
    },

    danger: {
      ...button,
      bg: "danger",
      borderColor: "danger",
      ":enabled:hover": {
        bg: "dangerHover",
        borderColor: "dangerHover"
      }
    },

    icon: {
      ...iconButton,
      color: "primary",
      ":enabled:hover": { color: "accent" }
    },

    dangerIcon: {
      ...iconButton,
      color: "danger",
      ":enabled:hover": { color: "dangerHover" }
    },

    titleIcon: {
      ...iconButton,
      color: "text",
      ":enabled:hover": { color: "success" }
    }
  },

  grids: {
    bansLayout: {
      gridTemplateColumns: "2fr 1fr",
      gridTemplateRows: "repeat(2, 1fr)",
      gridColumnGap: "20px",
      gridRowGap: "0"
    },
    navigationLayout: {
      gridTemplateColumns: "3fr 1fr",
      gridTemplateRows: "1fr",
      gridColumnGap: "20px",
      gridRowGap: "0"
    },
  },

  cards: {
    primary: {
      ...card,

      padding: 0,

      borderColor: "none",
      bg: "#ffffff0a",

      "> h2": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        height: "56px",

        pl: 3,
        py: 2,
        pr: 2,

        bg: "primary",

        fontSize: cardHeadingFontSize
      }
    },

    info: {
      ...infoCard,

      display: ["none", "block"]
    },

    infoPopup: {
      ...infoCard,

      position: "fixed",
      top: 0,
      right: 3,
      left: 3,
      mt: "72px",
      height: "80%",
      overflowY: "scroll"
    },

    tooltip: {
      padding: 2,

      boxShadow: 2,

      background: "#6ebbb9",

      fontSize: 1,
      color: "#fff",
      fontWeight: "body",
      zIndex: 1
    }
  },

  forms: {
    label: {
      ...formBase
    },

    unit: {
      ...formCell,

      textAlign: "center",
      bg: "muted"
    },

    input: {
      ...formCell,

      flex: 1
    },

  },

  layout: {
    window: {
      ...windowGradient,
      minHeight: "100vh",
      maxWidth: "1200px",
      display: "flex",
      flexDirection: "column",
      p: [20],
    },

    block: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      flex: "100"
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "stretch",

      position: ["fixed", "relative"],
      width: "100vw",
      top: 0,
      zIndex: 1,

      px: [2, "12px", "12px", 5],
      py: [2, "12px", "12px"],

      ...headerGradient,
      boxShadow: [1, "none"]
    },

    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      mt: cardGapY,
      px: 3,
      minHeight: "72px",

      bg: "muted"
    },

    main: {
      width: "100%",
      maxWidth: "912px",
      mx: "auto",
      mt: ["40px", 0],
      mb: ["40px", "40px"],
      px: cardGapX
    },

    columns: {
      display: "flex",
      flexWrap: "wrap",
      justifyItems: "center"
    },

    left: {
      pr: cardGapX,
      width: ["100%", "58%"]
    },

    right: {
      width: ["100%", "42%"]
    },

    actions: {
      justifyContent: "center",
      mt: 2,

      button: {
      }
    },

    disabledOverlay: {
      ...overlay,

      bg: "rgba(255, 255, 255, 0.5)"
    },

    modalOverlay: {
      ...modalOverlay,

      bg: "rgba(0, 0, 0, 0.8)",

      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },

    modal: {
      padding: 3,
      width: ["100%", "40em"]
    },

    infoOverlay: {
      ...modalOverlay,

      display: ["block", "none"],

      bg: "rgba(255, 255, 255, 0.8)"
    },

    infoMessage: {
      display: "flex",
      justifyContent: "center",
      m: 3,
      alignItems: "center",
      minWidth: "128px"
    },

    sidenav: {
      display: ["flex", "none"],
      flexDirection: "column",
      p: 0,
      m: 0,
      borderColor: "muted",
      mr: "25vw",
      height: "100%",
      ...headerGradient
    },

    badge: {
      border: 0,
      borderRadius: 3,
      p: 1,
      px: 2,
      backgroundColor: "muted",
      color: "slate",
      fontSize: 1,
      fontWeight: "body"
    },

    card: {
      flexDirection: 'column',
    },
    containerSearchTransition: {
      ...transition,
      opacity: 1,
    },
    containerSearchTransitionHide: {
      ...transition,
      opacity: 0,
      pointerEvents: "none",
    },
  },

  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",

      height: "100%",

      "#root": {
        height: "100%"
      }
    },

    a: {
      color: "primary",
      ":hover": { color: "accent" },
      textDecoration: "none",
      fontWeight: "bold"
    },

    hr: {
      margin: 0,
    }
  },

  links: {
    nav: {
      px: 2,
      py: 1,
      fontWeight: "medium",
      fontSize: 2,
      textTransform: "uppercase",
      letterSpacing: "2px",
      width: ["100%", "auto"],
      mt: [3, "auto"]
    },

    link: {
      color: '#00F6D2'
    }
  }
};

export default theme;
