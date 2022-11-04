import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {_id, img, price, title} = service;
    return (
        <div className="card card-compact w-80 px-4 pt-4 bg-white border border-gray-300 shadow-xl">
            <figure><img src={img} className = 'h-36 w-full rounded-md' alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title font-bold my-0">{title}</h2>
                <p className='text-xl text-orange-600 font-semibold my-0'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <Link to={`/services/${_id}`}>
                    <button className='btn btn-primary  btn-sm'>Checkout</button>
                    
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;