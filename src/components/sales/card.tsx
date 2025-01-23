import React from 'react'

type Ticket = {
  trainName: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  availability: string;
  date: string;
};

type CardProps = {
  ticket: Ticket;
};

function Card({ ticket }: CardProps, key: number) {
  return (
    <>

      <div key={key} className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Train Information */}
        <div className="train-info">
          <h2 className="text-2xl font-bold text-gray-800">{ticket.trainName}</h2>
          <p className="text-gray-600">{ticket.from} to {ticket.to}</p>
          <p className="text-gray-500">Departure: {ticket.departure}</p>
          <p className="text-gray-500">Arrival: {ticket.arrival}</p>
          <p className="text-gray-500">date: {ticket.date}</p>
          <p className={`text-sm font-semibold ${ticket.availability === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
            Status: {ticket.availability}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Cancel
          </button>
          <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Buy Now
          </button>
        </div>
      </div>
    </>
  )
}

export default Card;
