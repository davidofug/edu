import { Formik } from 'formik'
import React from 'react'

const Apply = () => {
  return (
    <section>
        <header>
            <h1>Apply</h1>
            <p>Instructions</p>
        </header>
        <main>
            <Formik>
                <Form>

                </Form>
            </Formik>
        </main>
        <sidebar>
            <h2>Help</h2>
            <ol>
                <li>Step</li>
                <li>Step</li>
                <li>Step</li>
                <li>Step</li>
                <li>Step</li>
                <li>Step</li>
                <li>Step</li>
                <li>Step</li>
            </ol>
        </sidebar>
    </section>
  )
}

export default Apply