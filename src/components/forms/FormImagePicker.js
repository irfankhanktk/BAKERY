import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "../ErrorMessage";
import ImageInput from "../ImageInput";

const FormImagePicker = ({ name }) => {
  const { setFieldTouched, setFieldValue, handleChange, errors, touched } =
    useFormikContext();
  const image = name;

  console.log(name);

  const handleAdd = (uri) => {
    setFieldValue(name, [image, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(name.filter((imageUri) => imageUri !== uri));
  };

  return (
    <>
      <ImageInput
        imageUris={name}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormImagePicker;
