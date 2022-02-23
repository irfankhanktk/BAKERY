import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";

const AppFormField = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        autoCapitalize="none"
        autoCorrect={false}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        placeholderTextColor={colors.textGrey}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
