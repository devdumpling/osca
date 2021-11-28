import { useEffect } from "react";
import { useFormikContext } from "formik";

const getFirstErrorKey = (object, keys = []) => {
  const firstErrorKey = Object.keys(object)[0];
  if (isObject(object[firstErrorKey])) {
    return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
  }
  return [...keys, firstErrorKey].join(".");
};

const FormikOnError = ({ children }) => {
  const formik = useFormikContext();

  useEffect(() => {
    if (!formik.isValid && formik.submitCount > 0) {
      const firstErrorKey = getFirstErrorKey(formik.errors);
      if (global.window.document.getElementsByName(firstErrorKey).length) {
        global.window.document
          .getElementsByName(firstErrorKey)[0]
          .scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [formik.submitCount, formik.isValid, formik.errors]);
  return children;
};

export default FormikOnError;

function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
