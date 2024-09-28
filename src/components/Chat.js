import React from 'react';

const Chat = () => {
    return (
        <div className="border border-gray-600 rounded-lg p-4 w-80 h-96 overflow-y-auto mt-4 bg-gray-800">
            <h2 className="text-lg font-semibold text-white">Chat</h2>
            <div className="h-4/5 overflow-y-auto mb-2">
                <div className="my-2">
                    <strong className="text-blue-400">Name:</strong> Hi! What genres do you enjoy the most?
                </div>
            </div>
            <input 
                type="text" 
                className="w-full p-2 border border-gray-500 rounded mt-2 bg-gray-700 text-white placeholder-gray-400" 
                placeholder="Type text, or upload, paste, and drag an image here. " 
            />
        </div>
    );
};

export default Chat;
