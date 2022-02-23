import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors: colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontFamily: "Avenir",
      },
      android: {
        fontFamily: "Roboto",
      },
      default: {
        fontFamily: "sans-serif",
      },
    }),
  },
};
