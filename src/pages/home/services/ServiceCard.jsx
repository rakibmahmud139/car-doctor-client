import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const ServiceCard = ({ service }) => {

    const { title, img, price } = service;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl w-80 h-52" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions flex items-center mt-4">
                    <p className='text-accent text-xl font-bold'>Price : ${price}</p>
                    <button className="text-accent"><FaArrowRight /></button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;