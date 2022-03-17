import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "../components/helpers/supabase";

function AddUser() {
  const [errorMsg,setErrorMsg] = React.useState(null);
  const [successMsg,setSuccessMsg] = React.useState(null);
  const addUserSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const signUp = async (values) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: values.username,
      password: values.password,
    }, {
        data: {
            roles: values.roles
        }
    });

    return { user, session, error };
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="bg-white px-8 pt-6 pb-8 mb-4">
        <h1>Add User</h1>
        {errorMsg && <p className="text-red-500" >{errorMsg}</p>}
        {successMsg && <p className="text-green-500" >{successMsg}</p>}
        <Formik
          initialValues={{ username: "", password: "", roles: ["student"] }}
          validationSchema={addUserSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const {error } = await signUp(values);
            if (error) {
              setErrorMsg(error.message);
            } else {
              // console.log("User: ", user);
              setErrorMsg(null)
              setSuccessMsg("User added successfully!");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                {errors.username && touched.username && (
                  <p className="text-red-500 text-xs italic">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-orange-400 hover:text-orange-500"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddUser;
