'use client';
import React, { useState } from 'react';
function Transfer() {
    const [tokenId, setTokenId] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [friendAadhaar, setFriendAadhaar] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate inputs
        if (!tokenId || !walletAddress || !friendAadhaar) {
            setError('All fields are required.');
            return;
        }

        // Example of how to handle the submission, for now just logging
        console.log('Ticket transferred:', { tokenId, walletAddress, friendAadhaar });

        // Clear fields after submit (optional)
        setTokenId('');
        setWalletAddress('');
        setFriendAadhaar('');
        setError('');
    };
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Ticket Transfer</h1>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            {/* First row: Token ID and Wallet Address */}
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700">Token ID:</label>
                                    <input
                                        type="text"
                                        id="tokenId"
                                        value={tokenId}
                                        onChange={(e) => setTokenId(e.target.value)}
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">User Wallet Address:</label>
                                    <input
                                        type="text"
                                        id="walletAddress"
                                        value={walletAddress}
                                        onChange={(e) => setWalletAddress(e.target.value)}
                                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Second row: Friend's Aadhaar Number */}
                            <div>
                                <label htmlFor="friendAadhaar" className="block text-sm font-medium text-gray-700">Friends Aadhaar Number:</label>
                                <input
                                    type="text"
                                    id="friendAadhaar"
                                    value={friendAadhaar}
                                    onChange={(e) => setFriendAadhaar(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                            Transfer Ticket
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Transfer;
