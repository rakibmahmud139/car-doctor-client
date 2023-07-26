import { space } from 'postcss/lib/list';
import React from 'react';


const BookingRows = ({ booking, handleDelete, handleBookingConfirm }) => {
    const { _id, date, service, price, img, status } = booking;



    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-accent btn-outline btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>
            <td>

                <div className="avatar">
                    <div className="rounded w-24 h-24">
                        {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
                    </div>
                </div>

            </td>
            <td>
                {service}
            </td>
            <td>{date}</td>
            <td>${price}</td>
            <th>
                {
                    status === 'confirm' ?
                        <span className='text-accent font-bold'>Confirmed</span>
                        :
                        <button onClick={() => handleBookingConfirm(_id)} className="btn btn-outline btn-accent btn-xs">Please Confirm</button>
                }
            </th>
        </tr>
    );
};

export default BookingRows;