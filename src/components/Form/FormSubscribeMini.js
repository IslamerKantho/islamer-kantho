import React from "react";
import { useFormik } from "formik";

export default function FormSubscribeMini() {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={formik.handleChange}
          value={formik.values.email}
        />{" "}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
