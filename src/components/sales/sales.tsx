import React from 'react'
import Card from './card';

function Sales() {
  const ticketData = [
    {
      trainName: 'Express 101',
      from: 'New York',
      to: 'Boston',
      departure: '10:00 AM',
      arrival: '12:00 PM',
      availability: 'Available',
       date:'12-01-2025'
    },
    {
      trainName: 'Coastline 202',
      from: 'Los Angeles',
      to: 'San Francisco',
      departure: '1:30 PM',
      arrival: '4:00 PM',
      availability: 'Sold Out',
      date:'12-01-2025'
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center space-x-6 p-8 bg-gray-100">
        {ticketData.map((ticket, index) => (
          <Card ticket={ticket} key={index} />
        ))}
      </div>
    </>
  )
}

export default Sales;
