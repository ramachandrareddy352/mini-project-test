import React from 'react'
import "./cancel.css";
function Cancel() {

  const ticketData: any = [
    {
      trainName: "Express 101",
      from: "Noida",
      to: "Bengaluru",
      departure: "10:00 AM",
      arrival: "2:00 PM",
      availability: "Available",
    },
    {
      trainName: "Express 102",
      from: "Kolkata",
      to: "Delhi",
      departure: "11:00 AM",
      arrival: "3:00 PM",
      availability: "Waiting List",
    },
  ]
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex  justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Cancel Ticket</h2>
          <div className='text-center mb-4'>
            <label htmlFor="ticketId" className="text-gray-600 mr-4">Ticket ID:</label>
            <input
              type="text"
              id="ticketId"
              name="source"
              value=""
              // onChange={handleInputChange}
              placeholder="Enter Ticket ID"
              className=' p-2 border border-gray-200 rounded-md mb-4'
            />
          </div>
          <ul className="space-y-2">
            {
              ticketData.map((ticket: any, index: any) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
                >
                  <div className="train-info">
                    <h2>{ticket.trainName}</h2>
                    <p>{ticket.from} to {ticket.to}</p>
                    <p>Departure: {ticket.departure}</p>
                    <p>Arrival: {ticket.arrival}</p>
                    <p>Status: {ticket.availability}</p>
                  </div>
                  <button className="book-button">cancel</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Cancel;
