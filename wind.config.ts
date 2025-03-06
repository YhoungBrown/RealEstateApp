import { customize } from "react-native-wind";

customize({
  theme: {
    colors: {
      primary: {
        100: "#0061FF0A",
        200: "#0061FF1A",
        300: "#0061FF2A",
        400: "#006aff",
      },
      accent: {
        100: "#FBFBFD",
      },
      black: {
        DEFAULT: "#000000",
        100: "#8C8E98",
        200: "#666876",
        300: "#191D31",
      },
      danger: "#F75555",
    },
    // fontfamily isnt allowed to be customized in native wind
    // fontFamily: {
    //   sans: "Rubik-Regular",
    //   serif: "Rubik-Regular",
    //   mono: "Rubik-Regular",
    // },
  },
});
