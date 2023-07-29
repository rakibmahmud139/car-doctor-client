import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');


    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&sort=${asc ? 'asc' : 'des'}`)
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error(err))
    }, [asc, search])


    const handleSearch = () => {
        console.log(searchRef.current.value);
        setSearch(searchRef.current.value);
    }


    return (
        <div className='mt-8'>
            <div className='space-y-5 text-center'>
                <h3 className="text-xl text-accent font-bold">Services</h3>
                <h3 className='text-4xl font-bold'>Our Service Area</h3>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>

                <div className="form-control">
                    <div className="input-group">
                        <input type="text" ref={searchRef} placeholder="Search…" className="input input-bordered" />
                        <button onChange={handleSearch} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>

                <button
                    className='btn btn-accent'
                    onClick={() => setAsc(!asc)}
                >{asc ? "Price high to low" : "Price low to high"}</button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    />)
                }
            </div>
        </div>
    );
};

export default Services;