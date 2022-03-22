import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "./helpers/supabase";
import { useAuth } from "./hooks/useAuth";

function Member() {
  const [members, setMembers] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const getCompanies = React.useCallback(async () => {
    try {
      const { data, error } = await supabase.from("companies").select();
      if (error) {
        console.log(error);
        return false;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(async () => {
    const { data, error } = await supabase.from("profiles").select();
    setMembers(data);
    setCompanies(await getCompanies());
  }, []);
  const { user } = useAuth();
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(null);
  const addUserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required!"),
    company: Yup.string().required("Company is required!"),
    password: Yup.string().required("Password is required!"),
    confirm_password: Yup.string()
      .required("Confirm password is required!")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    role: Yup.string().required("Assign a role to the user!"),
  });

  const signUp = async (values) => {
    const { id, name } = JSON.parse(values?.company);
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: values.email,
        password: values.password,
      },
      {
        data: {
          role: values.role,
          addedBy: { id: values.addedBy.id, email: values.addedBy.email },
          company: { id, name },
          name: {
            first_name: values.first_name,
            last_name: values.last_name
          },
          gender: values.gender
        },
      }
    );

    return { user, session, error };
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const { error } = await signUp(values);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setErrorMsg(null);
      setSuccessMsg("User added successfully!");
      resetForm();
    }
    alert("Submit clicked!");
    console.log(values);
  };
  return (
    <div className="grid grid-cols-8 gap-2 bg-gray-100 p-4">
      <div className="bg-white col-span-2">
        <div className="bg-white px-3 pb-3">
          <h1 className="my-1">Add User</h1>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirm_password: "",
              first_name: "",
              last_name: "",
              gender:"",
              role: "",
              addedBy: { id: user.id, email: user.email },
              company: { id: "", name: "" },
            }}
            validationSchema={addUserSchema}
            onSubmit={handleSubmit}
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
                <div className="col mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="first_name"
                  >
                    First name
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first_name"
                    name="first_name"
                    type="type"
                    placeholder="First name"
                  />
                  {errors.first_name && touched.first_name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div className="col mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="last_name"
                  >
                    Last name
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="last_name"
                    name="last_name"
                    type="type"
                    placeholder="Last name"
                  />
                  {errors.last_name && touched.last_name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.last_name}
                    </p>
                  )}
                </div>
                <div className="col mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="company"
                  >
                    Company/Organisation
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="company"
                    name="company"
                    as="select"
                  >
                    <option value="">- Select Company -</option>
                    {companies?.map((company) => (
                      <option
                        key={company.id}
                        value={JSON.stringify({
                          id: company.id,
                          name: company.name,
                        })}
                      >
                        {company.name}
                      </option>
                    ))}
                  </Field>
                  {errors.company && touched.company && (
                    <p className="text-red-500 text-xs italic">
                      {errors.company}
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="student"
                  >
                    Assign Role
                  </label>
                  <Field id="role" name="role" as="select">
                    <option value="">- Assign a role -</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="intern">Intern</option>
                    <option value="founder">Founder</option>
                    <option value="apprentice">Apprentice</option>
                    <option value="mentor">Mentor</option>
                    <option value="facilitator">Facilitator</option>
                  </Field>
                  {errors.role && touched.role && (
                    <p className="text-red-500 text-xs italic">
                      {errors.role}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <Field id="gender" name="gender" as="select">
                    <option value="">- Gender -</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </Field>
                  {errors.gender && touched.gender && (
                    <p className="text-red-500 text-xs italic">
                      {errors.gender}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="col-span-6 bg-white p-6">
        <h1>Members</h1>
        {members?.length > 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="border p-1">Email</th>
                <th className="border p-1">Company</th>
                <th className="border p-1">First name</th>
                <th className="border p-1">Last name</th>
                <th className="border p-1">Role</th>
                <th className="border p-1">Gender</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const { id, email, user_meta } = member
                const {company, role, name, gender} = user_meta
                return (<tr key={id}>
                  <td className="border p-1">{email}</td>
                  <td className="border p-1">{company?.name}</td>
                  <td className="border p-1">{name?.first_name}</td>
                  <td className="border p-1">{name?.last_name}</td>
                  <td className="border p-1">{role}</td>
                  <td className="border p-1">{gender}</td>
                </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Member;
