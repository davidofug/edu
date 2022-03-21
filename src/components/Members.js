import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "./helpers/supabase";
import { useAuth } from "./hooks/useAuth";

function AddUser() {
  const [members, setMembers] = React.useState([]);
  React.useEffect(async () => {
    const { data, error } = await supabase.from("profiles").select();
    setMembers(data);
    // console.log(data);
  }, []);
  const { user } = useAuth();
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(null);
  const addUserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
    confirm_password: Yup.string()
      .required("Confirm password is required!")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    roles: Yup.array().required("Assign a role to the user!"),
  });

  const signUp = async (values) => {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: values.email,
        password: values.password,
      },
      {
        data: {
          roles: values.roles,
          addedBy: { id: values.addedBy.id, email: values.addedBy.email },
        },
      }
    );

    return { user, session, error };
  };

  return (
    <div className="grid grid-cols-8 gap-3 bg-gray-100 p-4">
      <div className="bg-white col-span-2">
        <div className="bg-white px-8 pt-6 pb-8 mb-4">
          <h1>Add User</h1>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}
          <Formik
            initialValues={{
              email: "",
              password: "",
              roles: ["student"],
              addedBy: { id: user.id, email: user.email },
            }}
            validationSchema={addUserSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              const { error } = await signUp(values);
              if (error) {
                setErrorMsg(error.message);
              } else {
                setErrorMsg(null);
                setSuccessMsg("User added successfully!");
                resetForm();
              }
              // console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="col mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ex: jane@domain.com"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email}
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
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirm_password"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="******************"
                  />
                  {errors.confirm_password && touched.confirm_password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.confirm_password}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  Assign Roles
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="student"
                  >
                    <Field
                      id="student"
                      name="roles"
                      type="checkbox"
                      value="student"
                    />{" "}
                    Student
                  </label>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="admin"
                  >
                    <Field
                      id="admin"
                      name="roles"
                      type="checkbox"
                      value="admin"
                    />{" "}
                    Admin
                  </label>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="intern"
                  >
                    <Field
                      id="intern"
                      name="roles"
                      type="checkbox"
                      value="intern"
                    />{" "}
                    Intern
                  </label>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="apprentice"
                  >
                    <Field
                      id="apprentice"
                      name="roles"
                      type="checkbox"
                      value="apprentice"
                    />{" "}
                    Apprentince
                  </label>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mentor"
                  >
                    <Field
                      id="mentor"
                      name="roles"
                      type="checkbox"
                      value="mentor"
                    />{" "}
                    Mentor
                  </label>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="employee"
                  >
                    <Field
                      id="employee"
                      name="roles"
                      type="checkbox"
                      value="employee"
                    />{" "}
                    Employee
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save User
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="col-span-6 bg-white p-6">
        <h1>List of Users</h1>
        <p>No users to load</p>
        {members.length > 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Roles</th>
                <th className="px-4 py-2">Added By</th>
                <th className="px-4 py-2">Added On</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="border px-4 py-2">{member.email}</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">-</td>
                  <td className="border px-4 py-2">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AddUser;
