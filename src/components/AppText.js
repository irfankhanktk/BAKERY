import React from "react";
import { Text } from "react-native";

import defailtStyles from "../services/styles";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[defailtStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
