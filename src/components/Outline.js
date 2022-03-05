import React from 'react';

function Outline({ id }) {
    const [outline, setOutline] = React.useState([])
    React.useEffect(async () => {
        document.title = "Full stack Web Developer Cohort 2"
        const fetched = await fetchOutline()
        setOutline(fetched)
    }, [])

    const fetchOutline = async () => {
        const response = await fetch('https://theablestate.github.io/edu/fullstack-cohort-2-outline.json')
        const data = await response.json()
        return data[id]
    }

  return (
      <div className="container mx-auto p-4  text-sm">
          <div className="align-center leading-6 mb-4">
              <h1 className="text-md"><b>Full Stack Web Developer - Cohort 2 (March - October, 2022)</b></h1>
                <p>We welcome you to the second of cohort of Full stack Web Development at Ablestate Creatives Limited.</p>
                <p>Check the tentative outline below.</p>
                <p>We wish you good luck!</p>
          </div>
          {
              outline && (
                <table className="table-auto border-collapse border border-slate-400 p-2 align-top">
                  <thead>
                      <tr>
                            <th className="border-collapse border border-slate-400 p-2">No#</th>
                            <th className="border-collapse border border-slate-400 p-2">Details</th>
                            <th className="border-collapse border border-slate-400 p-2">Facilitators</th>
                            <th className="border-collapse border border-slate-400 p-2">Date and Time</th>
                      </tr>
                      </thead>
                      <tbody>
                          {outline.map(({ title, breakdown, facilitator, coFacilitator, date, timeTo, timeFrom }, index) => (
                            <tr key={index.toString()}>
                                <td className="border-collapse border border-slate-400 p-2">{(index = index + 1)}</td>
                                <td className="border-collapse border border-slate-400 p-2">
                                    <p>
                                        <b>{title}</b>
                                    </p>
                                    <ul className="list-decimal pl-4">
                                        {breakdown && breakdown.split(",").map((item, index) => (<li key={index.toString()}>{item}</li>))}
                                    </ul>
                                </td>
                                <td className="border-collapse border border-slate-400 p-2">
                                      <p>{facilitator} - <b>Main</b></p>
                                    {coFacilitator && (<p><b>Co-facilitator</b></p>)}
                                    {coFacilitator && coFacilitator.split(",").map((item, index) => (<p key={index.toString()}>{item}</p>))}
                                </td>
                                <td className="border-collapse border border-slate-400 p-2">
                                    <b >{date}</b><br/>
                                    <span className="text-xs text-slate-500">{timeFrom} - {timeTo}</span>
                                </td>
                            </tr>
                          ))}
                      </tbody>
              </table>
            )}
      </div>
  )
}

export default Outline