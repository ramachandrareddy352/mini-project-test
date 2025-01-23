'use client';
import React, { useState } from 'react'
import "./booking.css";


function Booking() {
    type Seat = {
        type: string;
        count: number;
        price: number;
    };
    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        aadharNumber: "",
        dateOfJourney: "",
    });

    const [filteredSeats, setFilteredSeats] = useState<Seat[]>([]);
    const seatsData: Seat[] = [
        { type: "Sleeper", count: 50, price: 200 },
        { type: "AC Tier 3", count: 30, price: 500 },
        { type: "AC Tier 2", count: 20, price: 700 },
        { type: "First Class AC", count: 10, price: 1200 },
    ];

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearch = () => {
        // Filter logic (basic here, you can expand it)
        if (formData.source && formData.destination && formData.dateOfJourney) {
            setFilteredSeats(seatsData);
        } else {
            alert("Please fill all the fields!");
        }
    };
    const handleBuyTicket = (seat: { type: string; price: number; count: number }) => {
        // Example action: Navigate to payment page or log seat details
        alert(`Buying ticket for ${seat.type} at ₹${seat.price}`);
        // You can navigate to another page like this:
        // router.push(`/payment?type=${seat.type}&price=${seat.price}`);
    };
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex  justify-center">
                <div className="bg-white shadow-md rounded-lg p-6 w-full">
                    <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Train Ticket Booking</h2>

                    {/* Booking Form */}
                    <section className="search-section">
                        <h1>Book Your Train Tickets</h1>
                        <form id="search-form">
                            <input
                                type="text"
                                id="source"
                                name="source"
                                value={formData.source}
                                onChange={handleInputChange}
                                placeholder="Enter source station"
                            />
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                value={formData.destination}
                                onChange={handleInputChange}
                                placeholder="Enter destination station"
                            />
                            <input
                                type="date"
                                id="dateOfJourney"
                                name="dateOfJourney"
                                value={formData.dateOfJourney}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                onClick={handleSearch}
                                className=" bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Search Trains
                            </button>
                        </form>
                    </section>
                   

                    {/* Seats */}
                    {filteredSeats.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Seat Types</h3>
                            <ul className="space-y-2">
                                {filteredSeats.map((seat, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">{seat.type}</p>
                                            <p className=" text-gray-500">{seat.count} seats available</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="font-medium text-blue-600">₹{seat.price}</p>
                                            <button
                                                onClick={() => handleBuyTicket(seat)}
                                                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
                                            >
                                                Buy Ticket
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Booking;
