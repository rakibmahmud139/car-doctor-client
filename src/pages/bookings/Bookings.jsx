import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import BookingRows from './BookingRows';
import Swal from 'sweetalert2';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setBookings(data)
                }
                else {
                    // Logout and then navigate
                    navigate('/')
                }
            })
    }, [url, navigate])



    //Delete service
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'Your booking has been deleted.',
                                'success'
                            )
                        }
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                })
        })
    }


    //update send data to server site
    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    //update state
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = "confirm";
                    const newBooking = [updated, ...remaining];
                    setBookings(newBooking);

                }
            })
    }



    return (
        <div>
            <h3 className='text-3xl font-bold text-center'>Your Booking Services{bookings.length}</h3>

            <div className="overflow-x-auto mt-24">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRows
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;