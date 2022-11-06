import React, { useContext } from 'react';
import {  useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const CheckOut = () => {
    const { _id, title, price } = useLoaderData()
    const { user } = useContext(AuthContext)

    const handelSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;
        console.log(name, phone, message);

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('https://genius-car-server-zeta-six.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    alert('product successfully added')
                    form.reset()
                }

            })
            .catch(err => console.error(err))

    }

    return (
        <div>
            <div className="flex w-3/4 mx-auto mb-4 lg:w-full min-h-screen items-center justify-start bg-white">
                <div className="mx-auto w-full max-w-lg">
                   
                    <h1 className="text-4xl text-center font-semibold">{title}</h1>
                    <p className="mt-3 text-center">Price: {price}</p>

                    <form onSubmit={handelSubmit} className="mt-10">
                        <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="relative z-0">
                                <input type="text" name="firstName" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" Your first name" />

                            </div>

                            <div className="relative z-0">
                                <input type="text" name="lastName" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder="Your last name " />

                            </div>
                            <div className="relative z-0">
                                <input type="text" name="phone" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder="Your phone number " />

                            </div>
                            <div className="relative z-0">
                                <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" email" defaultValue={user?.email} readOnly />

                            </div>
                            <div className="relative z-0 col-span-2">
                                <textarea name="message" rows="5" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder="Your message"></textarea>

                            </div>
                        </div>
                        <button type="submit" className="mt-5 w-full rounded-md bg-black px-10 py-2 text-white">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;