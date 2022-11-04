import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrdersRow from './OrdersRow';

const Orders = () => {

    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data)
            })
    }, [user?.email])

    const handelDelete = id => {
        const proceed = window.confirm('Are u sure to delete??')
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount) {
                        alert('successfully deleted')
                        const remaining = orders.filter(ord => ord._id !== id)
                        setOrders(remaining)
                    }
                })
        }
    }

    const handelUpdate = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approving = orders.find(odr => odr._id === id);
                    approving.status = 'Approved'

                    const newOrders = [approving, ...remaining];
                    setOrders(newOrders);
                }
            })
    }

    return (
        <div className=''>
            <h2 className="text-4xl font-semibold mt-6 text-center">You have selected {orders.length} orders</h2>
            <div className="overflow-x-auto w-full my-8 rounded bg-red-100 p-8">
                <table className="table w-full ">

                    <thead>
                        <tr>
                            <th>Delete order</th>
                            <th>Product Details</th>
                            <th>Customer Name</th>
                            <th>phone</th>
                            <th>message</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrdersRow
                                key={order._id}
                                order={order}
                                handelDelete={handelDelete}
                                handelUpdate={handelUpdate}
                            ></OrdersRow>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Orders;