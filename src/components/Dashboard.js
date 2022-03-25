import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "./helpers/supabase";
import { useAuth } from "./hooks/useAuth";

function Dashboard() {
  const checkinSchema = Yup.object.shape({
    backpain: Yup.boolean().required("Required"),
  })
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
  }
  return (
    <section>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main className="grid-col-12">
        <aside>
          <h1 className="text-xl">Start your Day here!</h1>
          <p className="text-sm text-gray-400">
            The information will collect helps discover ways of supporting
            teammates you and help you work effectively. <br /> This information
            will not be shared with anyone.
          </p>
          <Formik
            initialValues={{
              backpain: false,
              chestpain: false,
              cough: false,
              fever: false,
              headache: false,
              sorethroat: false,
              shortnessofbreath: false,
              sneezing: false,
              tiredness: false,
              sleepduration: "",
              morningexerciseduration: "",
              intensityofexercise: "moderate",
              breakfast: false,
              breakfastdetails:"",
            }}
            validationSchema={checkinSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="py-2 border">
                <label htmlFor="backpain">Do you have a backpain?</label>
                <Field
                  type="radio"
                  name="backpain"
                  id="backpain"
                  value="Yes"
                />{" "}
                Yes{" "}
                <Field type="radio" name="backpain" id="backpain" value="No" />{" "}
                No
              </div>
              <div className="py-2">
                <label htmlFor="backpain">Do you have a chestpain?</label>
                <Field
                  type="radio"
                  name="chestpain"
                  id="chestpain-yes"
                  value="Yes"
                />{" "}
                Yes{" "}
                <Field
                  type="radio"
                  name="chestpain"
                  id="chestpain-no"
                  value="No"
                />{" "}
                No
              </div>
              <div className="py-2">
                <label htmlFor="cough">Do you have a cough?</label>
                <Field
                  type="radio"
                  name="cough"
                  id="cough-yes"
                  value="Yes"
                /> Yes <Field type="radio" name="cough" id="cough-no" value="No" />{" "}
                No
              </div>
              <div className="py-2">
                <label htmlFor="fever">Do you have a fever?</label>
                <Field
                  type="radio"
                  name="fever"
                  id="fever-yes"
                  value="Yes"
                /> Yes <Field type="radio" name="fever" id="fever-no" value="No" />{" "}
                No
              </div>
              <div className="py-2">
                <label htmlFor="headache">Do you have a headache?</label>
                <Field
                  type="radio"
                  name="headache"
                  id="headache-yes"
                  value="Yes"
                /> Yes <Field type="radio" name="headache" id="headache-no" value="No" />{" "}
                No
              </div>
              <div className="py-2">
                <label htmlFor="sorethroat">Do you have a sore throat?</label>  <Field type="radio" name="sorethroat" id="sorethroat-yes" value="Yes" /> Yes <Field type="radio" name="sorethroat" id="sorethroat-no" value="No" /> No
              </div>
              <div className="py-2">
                <label htmlFor="shortnessofbreath">Do you have a shortness of breath?</label>
                <Field
                  type="radio"
                  name="shortnessofbreath"
                  id="shortnessofbreath-yes"
                  value="Yes"
                /> Yes <Field type="radio" name="shortnessofbreath" id="shortnessofbreath-no" value="No" /> No
              </div>
              <div className="py-2">
                <label htmlFor="sneezing">Do you have a sneezing?</label>
                <Field
                  type="radio"
                  name="sneezing"
                  id="sneezing-yes"
                  value="Yes"
                /> Yes <Field type="radio" name="sneezing" id="sneezing-no" value="No" /> No
              </div>
              <div className="py-2">
                <label htmlFor="tiredness">Do you have a tiredness?</label>
                <Field
                  type="radio"
                  name="tiredness"
                  id="tiredness-yes"
                  value="Yes"
                /> Yes <Field type="radio" name="tiredness" id="tiredness-no" value="No" /> No
              </div>
              <div className="py-2">
                <label htmlFor="sleepduration">How long did you sleep last night?</label>
                <Field type="text" name="sleepduration" id="sleepduration" />
              </div>
              <div className="py-2">
                <label htmlFor="morningexerciseduration">How long did you exercise in the morning?</label>
                <Field type="text" name="morningexerciseduration" id="morningexerciseduration" />
              </div>
              <div className="py-2">
                <label htmlFor="intensityofexercise">What was the intensity the excercise?</label>
                <Field type="text" name="intensityofexercise" id="intensityofexercise" />
              </div>
              <div className="py-2">
                <label htmlFor="tiredness">Did you have breakfast?</label>
                <Field
                  type="radio"
                  name="breakfast"
                  id="breakfast-yes"
                  value="Yes"
                /> Yes <Field type="radio" name="breakfast" id="breakfast-no" value="No" /> No
              </div>
              <div className="py-2">
                <label htmlFor="breakfastdetails">What did you eat for breakfast?</label>
                <Field type="text" name="breakfastdetails" id="breakfastdetails" />
              </div>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </aside>
        <aside>

        </aside>
      </main>
    </section>
  );
}

export default Dashboard;
