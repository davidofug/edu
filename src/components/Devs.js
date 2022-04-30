import React from 'react'

const Devs = () => {

    const [devs, setDevs] = React.useState([]);

    React.useEffect( async () => {
		    document.title = `${document.title} - Dev Community`;
        const fetched = await fetchDevs();
        setDevs(fetched);
    }, []);

    const fetchDevs = async () => {
      const response = await fetch(
        "https://theablestate.github.io/edu/our-community-devs.json"
      );
      const data = await response.json();
      return data.devs;
    };

  if(devs?.length > 0)
    return (<div className="py-5">
  {devs.map( (dev, index) => (
    <div key={index.toString()} className="border border-gray rounded-lg bg-white py-4 px-5 mb-2">
      <h1 className="mb-2">{dev.name} {dev.gender === "Female" ? <span title={dev.gender}>👩🏾‍💻</span> : <span title={dev.gender}>👨🏽‍💻</span>} <span className="ml-3 text-gray-500 uppercase text-xs">Almuni:</span> {dev.almuni === 'yes' ? '👍🏽': null}</h1>
      <p className="text-sm"><span className="text-gray-500 uppercase">Stack(s):</span> {dev.stacks}</p>
      <p className="text-sm mb-3"><span className="text-gray-500 uppercase">Tech skill(s):</span> {dev.techskills}</p>
      <a href={`${dev.cv}`} target="_blank" className="text-xs py-1 px-4 bg-cyan-500 rounded-full mr-2 hover:bg-black hover:text-white transition">CV</a>
      <a href={`${dev.portfolio}`} target="_blank" className="text-xs py-1 px-4 bg-green-500 rounded-full hover:bg-black hover:text-white transition">Portfolio</a>
    </div>))}
    </div>
    );

  return <div>Loading...</div>;


}

export default Devs