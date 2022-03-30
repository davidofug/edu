import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "../components/helpers/supabase";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../components/hooks/useAuth";
function Login() {
  const { user, setUser } = useAuth();
  const [errorMsg, setErrorMsg] = React.useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("email is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const signIn = async (values) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: values.email,
      password: values.password,
    });

    return { user, session, error };
  };

  return user ? (
    <Navigate to={from} replace />
  ) : (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white border rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center font-semibold text-2xl mb-4">Login</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { user, error } = await signIn(values);
            if (error) {
              setErrorMsg(error.message);
            } else {
              setUser(user);
              navigate(from, { replace: true });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <Field
                  className="p-2 appearance-none leading-tight focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline outline-0 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 w-full rounded-lg"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
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
                  className="p-2 appearance-none leading-tight focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline outline-0 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 w-full rounded-lg"
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
                  className="px-4 py-1 transition bg-white hover:-translate-y-1 hover:bg-orange-100 duration-300 mx-auto max-w-md rounded-full border border-orange-500 dark:border-gray-700"
                  type="submit"
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-semibold text-sm text-orange-500 hover:text-orange-600"
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

export default Login;
