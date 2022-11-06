import React, { useEffect, useState } from 'react';

const OrdersRow = ({ order, handelDelete , handelUpdate}) => {
    const { _id, service, serviceName, customer, price, phone, email, message, status } = order

    const [serviceOrder, setServiceOrder] = useState()

    useEffect(() => {
        fetch(`https://genius-car-server-zeta-six.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setServiceOrder(data))
    }, [service])

    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handelDelete(_id)} className="btn btn-circle btn-outline btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                serviceOrder?.img &&
                                <img src={serviceOrder.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{serviceName}</div>
                        <div className="text-sm opacity-50">Price: {price}</div>
                    </div>
                </div>
            </td>
            <td>
                {customer}
                <br />
                <span className="badge badge-ghost badge-sm">{email}</span>
            </td>
            <td>{phone}</td>
            <td>{message}</td>
            <th>
          <button onClick={() => handelUpdate(_id)} 
          className="btn btn-ghost btn-xs  ">{status?status: 'pending'}</button>
        </th>

        </tr>
    );
};

export default OrdersRow;